'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const getUniqueIds = require('../utils/idGen.js');
const fileNum = '/temp/num-constraints.json';
const fileDim = '/temp/dim-constraints.json';
const fileScenarioTemplate = '/temp/scenario-templates.json';
const fileScenarioConstraint = '/temp/scenario-constraint.json';
const fileConstraintBundleItems = '/temp/constraint-bundle-items.json';

/**
 * Returns list of DIM constraints
 *
 * returns constraints
 **/
exports.getDimConstraints = function () {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileDim, function (err, obj) {
            if (err) console.error(err);
            if (obj.length > 0) {
                resolve(obj);
            } else {
                resolve([]);
            }
        });
    });
}


/**
 * Returns list of NUM constraints
 *
 * returns constraints
 **/
exports.getNumConstraints = function () {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileNum, function (err, obj) {
            console.log(obj);
            if (err) console.error(err);
            if (obj.length > 0) {
                resolve(obj);
            } else {
                resolve([]);
            }
        });
    });
}


/**
 * Returns array of DIM restriction of particular template
 *
 * scenarioTemplateCd String Scenario template code for DIM constraints receiving
 * returns scenarioTemplateDIMConstraints
 **/
exports.getTemplateDimConstraints = function (scenarioTemplateCd) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioTemplate, function (err, obj) {
            const template = obj.items.find(item => item.SCENARIO_TEMPLATE_CD === scenarioTemplateCd);
            const constraints = template.SCT_CONSTRAINT_DIM_PARAMS;
            if (err) console.error(err);
            if (Object.keys(constraints).length > 0) {
                resolve(constraints);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Returns list of NUM constraints for particular template
 *
 * scenarioTemplateCd String Scenario template code for DIM constraints receiving
 * returns constraints
 **/
exports.getTemplateNumConstraints = function (scenarioTemplateCd) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioTemplate, function (err, obj) {
            const template = obj.items.find(item => item.SCENARIO_TEMPLATE_CD === scenarioTemplateCd);
            const constraints = template.SCT_CONSTRAINT_NUM_PARAMS;
            if (err) console.error(err);
            if (Object.keys(constraints).length > 0) {
                resolve(constraints);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Returns constraints for particular user scenario
 *
 * userScenarioCd String user scenario code
 * returns userScenarioConstraints
 **/
exports.getScenarioConstraints = function (attrlist, userScenarioCd) {
    // console.log(userScenarioCd);
    if (!attrlist) {
        // console.log('receiving');
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                const constraint = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd && item.CONSTRAINT_BUNDLE_CD === 'CBN001');
                // console.log(constraint);
                jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                    if (err) console.error(err);
                    let result = constraint.map(cons => {
                        const bundles = obj.bundles.filter(bundle => bundle.SCENARIO_CONSTRAINT_CD === cons.SCENARIO_CONSTRAINT_CD);

                        if (!bundles.length) {
                            return {...cons, CONSTRAINT_BUNDLE_ITEMS: []};
                        } else {
                            return {...cons, CONSTRAINT_BUNDLE_ITEMS: bundles}
                        }
                    });
                    // console.log(result);
                    result = result.filter(item => item);
                    if (result.length > 0) {
                        resolve(result);
                    } else {
                        resolve([]);
                    }
                });


            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                const attrNamesList = attrlist.split(',');
                const constraint = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd);

                jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                    if (err) console.error(err);
                    let result = constraint.map(cons => {
                        let bundles = obj.bundles.filter(bundle => bundle.SCENARIO_CONSTRAINT_CD === cons.SCENARIO_CONSTRAINT_CD);
                        const bundlesAttrsNames = bundles.map(bundle => bundle.ATTR_NAME);
                        bundles = bundles.map(item => {
                            delete item.SCENARIO_CONSTRAINT_CD;
                            return item;
                        })
                        if (bundlesAttrsNames.sort().toString() === attrNamesList.sort().toString()) {
                            return {...cons, CONSTRAINT_BUNDLE_ITEMS: [...bundles]}
                        } else {
                            console.log(false);
                        }
                    });

                    result = result.filter(item => item);
                    if (result.length > 0) {
                        resolve(result);
                    } else {
                        resolve([]);
                    }
                });
            });
        });
    }
}


/**
 * Posts scenario constraints from user scenario constraints grid
 *
 * body UserScenarioConstraintsCreate New user scenario constraint
 * returns userScenario
 **/
exports.postScenarioConstraint = function (body) {
    let bundles = [];

    if (!body[0].CONSTRAINT_BUNDLE_ITEMS.length) {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {

                const idList = getUniqueIds(body.length, obj.constraints, 'SCENARIO_CONSTRAINT_CD', 'SCC');
                idList.forEach((item, index) => {
                    body[index]['SCENARIO_CONSTRAINT_CD'] = item;
                    body[index]['CONSTRAINT_BUNDLE_CD'] = 'CBN001';
                });
                const response = [...body];
                body.forEach(item => {
                    delete item.CONSTRAINT_BUNDLE_ITEMS;
                    obj.constraints.push(item);
                });

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                    if (err) console.error(err);

                    resolve(response);
                });
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                // console.log('Constraints', obj);

                const idList = getUniqueIds(body.length, obj, 'SCENARIO_CONSTRAINT_CD', 'SCC');
                idList.forEach((item, index) => {
                    body[index]['SCENARIO_CONSTRAINT_CD'] = item;
                    body[index]['CONSTRAINT_BUNDLE_ITEMS'].forEach(bundle => bundle['SCENARIO_CONSTRAINT_CD'] = item);
                });
                const response = [...body];
                bundles = body.map(item => {
                    return item.CONSTRAINT_BUNDLE_ITEMS;
                });
                // bundles = [].concat(bundles);

                body.forEach(item => {
                    delete item.CONSTRAINT_BUNDLE_ITEMS;
                    obj.constraints.push(item);
                });

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                    if (err) console.error(err);

                    jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                        obj.bundles = obj.bundles.concat(...bundles);

                        jsonfile.writeFile(appRoot + fileConstraintBundleItems, obj, function (err) {
                            if (err) console.error(err);

                            resolve(idList);
                        });
                    });
                });
            });
        });
    }
}

/**
 * Deletes constraint bundle of particuler scenario
 *
 * userScenarioCd String user scenario code
 * constraintBundleCd String array of constraint bundles
 * attrlist List list if of constraint attrs
 * no response value expected for this operation
 **/
exports.deleteScenarioConstraintBundle = function (userScenarioCd, scenarioConstraintCd, ifMatch, ifUnmodifiedSince) {
    console.log(userScenarioCd, ifMatch, ifUnmodifiedSince);
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, objScn) {
            objScn.constraints = objScn.constraints.filter(item => item.SCENARIO_CONSTRAINT_CD !== scenarioConstraintCd);

            jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                if (err) console.log(err);
                obj.bundles = obj.bundles.filter(bundle => bundle.SCENARIO_CONSTRAINT_CD !== scenarioConstraintCd);

                jsonfile.writeFile(appRoot + fileScenarioConstraint, objScn, function (err) {
                    if (err) console.error(err);

                    jsonfile.writeFile(appRoot + fileConstraintBundleItems, obj, function (err) {
                        if (err) console.error(err);

                        resolve();
                    });
                });
            });
        });
    })
};

/**
 * Updates user scenario constraints bundles ACTIVE_FLG status
 *
 * body List The new scenario template
 * userScenarioCd String user scenario code
 * ifMatch String The entity tag obtained from the most recent ETag response header. It must match the current entity tag.
 * ifUnmodifiedSince String The value of the lastModified date of the object. If the object has been updated since this time, the update fails. (optional)
 * no response value expected for this operation
 **/
exports.patchUserScenarioBundles = function (body, userScenarioCd, ifMatch, ifUnmodifiedSince) {
    console.log(body);
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
            body.forEach(constraint => {
                obj.constraints.find(item => item.SCENARIO_CD === userScenarioCd && item.SCENARIO_CONSTRAINT_CD === constraint.SCENARIO_CONSTRAINT_CD)
                    .ACTIVE_FLG = constraint.ACTIVE_FLG;
            });

            jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                if (err) console.error(err);
            });
        });

        resolve();
    });
}


/**
 * Clear scenario dim constraint
 *
 * userScenarioCd String user scenario code
 * constraintName String user scenario constraint name
 * no response value expected for this operation
 **/
exports.clearScenarioDimConstraint = function (userScenarioCd, constraintName) {
    return new Promise(function (resolve, reject) {
        if (constraintName === 'CBN001') {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                if (err) console.log(err);
                obj.constraints = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd && item.CONSTRAINT_BUNDLE_CD !== constraintName);

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function(err, obj) {
                    if (err) console.log(err);

                    resolve();
                })
            })
        } else {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                if (err) console.log(err);
                const constraintCdList = [];
                const currentScenarioConstraints = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd);
                const scenarioConstraintCds = currentScenarioConstraints.map(item => item.SCENARIO_CONSTRAINT_CD);

                jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, bundle) {
                    if (err) console.log(err);

                    for (let i = 0; i < scenarioConstraintCds.length; i++) {
                        const foundItem = bundle.bundles.filter(bundleItem => bundleItem.SCENARIO_CONSTRAINT_CD !== scenarioConstraintCds[i] && bundleItem.ATTR_NAME !== constraintName);
                        if (foundItem) {
                            constraintCdList.push(scenarioConstraintCds[i]);
                        }
                    }

                    constraintCdList.forEach(item => {
                        bundle.bundles = bundle.bundles.filter(bundleItem => bundleItem.SCENARIO_CONSTRAINT_CD !== item);
                        obj.constraint = obj.constraints.filter(constraintItem => constraintItem.SCENARIO_CONSTRAINT_CD !== item);
                    });

                    jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function(err, obj) {
                        if (err) console.log(err);

                        jsonfile.writeFile(appRoot + fileConstraintBundleItems, bundle, function(err, obj) {
                            if (err) console.log(err);

                            resolve();
                        })
                    })
                })
            })
        }
    });
}

/**
 * Updates user scenario constraints item
 *
 * body List The new scenario template
 * no response value expected for this operation
 **/
exports.patchUserScenarioConstraint = function(body, userScenarioCd) {
    console.log(body, userScenarioCd);

    return new Promise(function(resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioConstraint, function(err, obj) {
            if (err) console.log(err);

            ///// to be improved
            const scenarioCdHACK = obj.constraints.find(item => {
                return item.SCENARIO_CONSTRAINT_CD === body[0].SCENARIO_CONSTRAINT_CD;
            });
            body[0].SCENARIO_CD = scenarioCdHACK.SCENARIO_CD;
            ///// to be improved

            obj.constraints = obj.constraints.filter(item => {
                return item.SCENARIO_CONSTRAINT_CD !== body[0].SCENARIO_CONSTRAINT_CD;
            });


            // console.log(obj.constraints);

            if (body[0].CONSTRAINT_BUNDLE_ITEMS.length) {
                jsonfile.readFile(appRoot + fileConstraintBundleItems, function(err, objBundles) {
                    if (err) console.log(err);

                    objBundles.bundles = objBundles.bundles.filter(item => item.SCENARIO_CONSTRAINT_CD !== body[0].SCENARIO_CONSTRAINT_CD);

                    body[0].CONSTRAINT_BUNDLE_ITEMS.forEach(item => {
                        objBundles.bundles.push(item);
                    });

                    delete body.CONSTRAINT_BUNDLE_ITEMS;
                    obj.constraints.push(body[0]);

                    jsonfile.writeFile(appRoot + fileConstraintBundleItems, objBundles, function (err, resultB) {
                        if(err) console.log(err);

                        jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function(err, resultC) {
                            if(err) console.log(err);

                            resolve(body);
                        })
                    })
                })

            } else {
                delete body.CONSTRAINT_BUNDLE_ITEMS;
                obj.constraints.push(body[0]);

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                    if (err) console.error(err);

                    resolve(body);
                });
            }
        });
    });
}


/**
 * Put scenario constraints from user scenario constraints grid
 *
 * body List New user scenario constraint
 * userScenarioCd String user scenario code
 * returns userScenarioConstraintsCreateResponse
 **/
exports.putScenarioConstraint = function(body,userScenarioCd) {
    if (!body[0].CONSTRAINT_BUNDLE_ITEMS.length) {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {

                const idList = getUniqueIds(body.length, obj.constraints, 'SCENARIO_CONSTRAINT_CD', 'SCC');
                idList.forEach((item, index) => {
                    body[index]['SCENARIO_CONSTRAINT_CD'] = item;
                    body[index]['SCENARIO_CD'] = userScenarioCd;
                    body[index]['CONSTRAINT_BUNDLE_CD'] = 'CBN001';
                });
                const response = [...body];
                body.forEach(item => {
                    delete item.CONSTRAINT_BUNDLE_ITEMS;
                    obj.constraints.push(item);
                });

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                    if (err) console.error(err);

                    resolve(response);
                });
            });
        });
    } else {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                // console.log('Constraints', obj);

                const idList = getUniqueIds(body.length, obj, 'SCENARIO_CONSTRAINT_CD', 'SCC');
                idList.forEach((item, index) => {
                    body[index]['SCENARIO_CONSTRAINT_CD'] = item;
                    body[index]['CONSTRAINT_BUNDLE_ITEMS'].forEach(bundle => bundle['SCENARIO_CONSTRAINT_CD'] = item);
                });

                const bundles = body.map(item => {
                    return item.CONSTRAINT_BUNDLE_ITEMS;
                });
                // bundles = [].concat(bundles);

                body.forEach(item => {
                    delete item.CONSTRAINT_BUNDLE_ITEMS;
                    item['SCENARIO_CD'] = userScenarioCd;
                    obj.constraints.push(item);
                });

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                    if (err) console.error(err);

                    jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                        obj.bundles = obj.bundles.concat(...bundles);

                        jsonfile.writeFile(appRoot + fileConstraintBundleItems, obj, function (err) {
                            if (err) console.error(err);

                            resolve(idList);
                        });
                    });
                });
            });
        });
    }
}


/**
 * Put scenario dim constraint
 *
 * userScenarioCd String user scenario code
 * attrName String user scenario constraint name or CBN001 id for common constraint
 * no response value expected for this operation
 **/
exports.putScenarioDimConstraint = function(body,userScenarioCd,attrName) {
    console.log(body, userScenarioCd, attrName);
    return new Promise(function(resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
            if (err) console.log(err);
            const constraintCdList = [];
            const currentScenarioConstraints = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd);
            const scenarioConstraintCds = currentScenarioConstraints.map(item => item.SCENARIO_CONSTRAINT_CD);

            jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, bundle) {
                if (err) console.log(err);

                for (let i = 0; i < scenarioConstraintCds.length; i++) {
                    const foundItem = bundle.bundles.filter(bundleItem => bundleItem.SCENARIO_CONSTRAINT_CD !== scenarioConstraintCds[i] && bundleItem.ATTR_NAME !== attrName);
                    if (foundItem) {
                        constraintCdList.push(scenarioConstraintCds[i]);
                    }
                }

                constraintCdList.forEach(item => {
                    bundle.bundles = bundle.bundles.filter(bundleItem => bundleItem.SCENARIO_CONSTRAINT_CD !== item);
                    obj.constraint = obj.constraints.filter(constraintItem => constraintItem.SCENARIO_CONSTRAINT_CD !== item);
                });


                const idList = getUniqueIds(body.length, obj, 'SCENARIO_CONSTRAINT_CD', 'SCC');
                idList.forEach((item, index) => {
                    body[index]['SCENARIO_CONSTRAINT_CD'] = item;
                    body[index]['CONSTRAINT_BUNDLE_ITEMS'].forEach(bundle => bundle['SCENARIO_CONSTRAINT_CD'] = item);
                });

                const bundles = body.map(item => {
                    return item.CONSTRAINT_BUNDLE_ITEMS;
                });
                // bundles = [].concat(bundles);

                body.forEach(item => {
                    delete item.CONSTRAINT_BUNDLE_ITEMS;
                    item['SCENARIO_CD'] = userScenarioCd;
                    obj.constraints.push(item);
                });

                bundle.bundles = bundle.bundles.concat(...bundles);

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function(err, obj) {
                    if (err) console.log(err);

                    jsonfile.writeFile(appRoot + fileConstraintBundleItems, bundle, function(err, obj) {
                        if (err) console.log(err);

                        resolve();
                    })
                })
            })
        })
    });
}


/**
 * Put scenario general dim constraint
 *
 * userScenarioCd String user scenario code
 * no response value expected for this operation
 **/
exports.putScenarioDimConstraintGeneral = function(body,userScenarioCd) {
    // console.log(body, userScenarioCd);
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
            if (err) console.log(err);
            obj.constraints = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd && item.CONSTRAINT_BUNDLE_CD === 'CBN001');

            const idList = getUniqueIds(body.length, obj, 'SCENARIO_CONSTRAINT_CD', 'SCC');

            idList.forEach((item, index) => {
                body[index]['SCENARIO_CONSTRAINT_CD'] = item;
                body[index]['SCENARIO_CD'] = userScenarioCd;
            });

            body.forEach(item => obj.constraints.push(item));

            jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                if (err) console.error(err);

                resolve(idList);
            });
        })
    });
};
