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
exports.getDimConstraints = function() {
  return new Promise(function(resolve, reject) {
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
exports.getNumConstraints = function() {
  return new Promise(function(resolve, reject) {
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
exports.getTemplateDimConstraints = function(scenarioTemplateCd) {
  return new Promise(function(resolve, reject) {
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
exports.getTemplateNumConstraints = function(scenarioTemplateCd) {
    return new Promise(function(resolve, reject) {
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
exports.getScenarioConstraints = function(attrlist, userScenarioCd) {
    console.log(attrlist);
    if (!attrlist) {
        console.log('receiving');
        return new Promise(function(resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                const constraint = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd);

                jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                    if (err) console.error(err);
                    let result = constraint.map(cons => {
                        const bundles = obj.bundles.filter(bundle => bundle.CONSTRAINT_BUNDLE_CD === cons.CONSTRAINT_BUNDLE_CD);

                        if (!bundles.length) {
                            return {...cons, CONSTRAINT_BUNDLE_ITEMS: []};
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
    } else {
        return new Promise(function(resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                const attrNamesList = attrlist.split(',');
                const constraint = obj.constraints.filter(item => item.SCENARIO_CD === userScenarioCd);

                jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                    if (err) console.error(err);
                    let result = constraint.map(cons => {
                        const bundles = obj.bundles.filter(bundle => bundle.CONSTRAINT_BUNDLE_CD === cons.CONSTRAINT_BUNDLE_CD);
                        const bundlesAttrsNames = bundles.map(bundle => bundle.ATTR_NAME);

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
exports.postScenarioConstraint = function(body) {
    let bundles = [];
    if (!body[0].CONSTRAINT_BUNDLE_ITEMS.length) {
        return new Promise(function(resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                const idList = getUniqueIds(body.length, obj.constraints, 'CONSTRAINT_BUNDLE_CD', 'CBN');
                idList.forEach((item, index) => {
                    body[index]['CONSTRAINT_BUNDLE_CD'] = item;
                });

                body.forEach(item => {
                    delete item.CONSTRAINT_BUNDLE_ITEMS;
                    obj.constraints.push(item);
                });

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                    if (err) console.error(err);

                    resolve();
                });
            });
        });
    } else {
        return new Promise(function(resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
                console.log('Constraints', obj);
                const idList = getUniqueIds(body.length, obj, 'CONSTRAINT_BUNDLE_CD', 'CBN');
                idList.forEach((item, index) => {
                    body[index]['CONSTRAINT_BUNDLE_CD'] = item;
                    body[index]['CONSTRAINT_BUNDLE_ITEMS'].forEach(bundle => bundle['CONSTRAINT_BUNDLE_CD'] = item);
                });

                bundles = body.map(item => {
                    return item.CONSTRAINT_BUNDLE_ITEMS;
                });
                bundles = [].concat(...bundles);

                body.forEach(item => {
                    delete item.CONSTRAINT_BUNDLE_ITEMS;
                    obj.constraints.push(item);
                });

                jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                    if (err) console.error(err);

                    jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                        obj.bundles = obj.bundles.concat(bundles);

                        jsonfile.writeFile(appRoot + fileConstraintBundleItems, obj, function (err) {
                            if (err) console.error(err);

                            resolve();
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
exports.deleteScenarioConstraintBundle = function(attrlist, userScenarioCd,constraintBundleCd) {
    if (!attrlist) {
        console.log(true);
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, objScn) {
                objScn.constraints = objScn.constraints.filter(item => item.CONSTRAINT_BUNDLE_CD !== constraintBundleCd);

                jsonfile.writeFile(appRoot + fileScenarioConstraint, objScn, function (err) {
                    if (err) console.error(err);

                    resolve();
                });
            });
        })
    } else {
        return new Promise(function(resolve, reject) {
            jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, objScn) {
                const attrNamesList = attrlist.split(',');
                const constraint = objScn.constraints.find(item => item.CONSTRAINT_BUNDLE_CD === constraintBundleCd);

                jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
                    if (err) console.error(err);

                    const bundles = obj.bundles.filter(bundle => bundle.CONSTRAINT_BUNDLE_CD === constraintBundleCd);
                    const bundlesAttrsNames = bundles.map(bundle => bundle.ATTR_NAME);

                    if (bundlesAttrsNames.sort().toString() === attrNamesList.sort().toString()) {

                        obj.bundles = obj.bundles.filter(bundle => bundle.CONSTRAINT_BUNDLE_CD !== constraintBundleCd);
                        objScn.constraints = objScn.constraints.filter(item => item.CONSTRAINT_BUNDLE_CD !== constraintBundleCd);

                        jsonfile.writeFile(appRoot + fileConstraintBundleItems, obj, function (err) {
                            if (err) console.error(err);

                            jsonfile.writeFile(appRoot + fileScenarioConstraint, objScn, function (err) {
                                if (err) console.error(err);

                                resolve();
                            });
                        });
                    } else {
                        console.log(false);
                    }
                });
            });
        });
    }
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
exports.patchUserScenarioBundles = function(body,userScenarioCd,ifMatch,ifUnmodifiedSince) {

    return new Promise(function(resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
            body.forEach(constraint => {
                obj.constraints.find(item => item.SCENARIO_CD === userScenarioCd && item.CONSTRAINT_BUNDLE_CD === constraint.CONSTRAINT_BUNDLE_CD)
                    .ACTIVE_FLG = constraint.ACTIVE_FLG;
            });

            jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                if (err) console.error(err);
            });
        });

        resolve();
    });
}
