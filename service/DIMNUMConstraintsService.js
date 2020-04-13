'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
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
          if (Object.keys(obj).length > 0) {
              resolve(obj[Object.keys(obj)[0]]);
          } else {
              resolve();
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
          if (err) console.error(err);
          if (Object.keys(obj).length > 0) {
              resolve(obj[Object.keys(obj)[0]]);
          } else {
              resolve();
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
 * Returns constraints for particular user scenario
 *
 * userScenarioCd String user scenario code
 * returns userScenarioConstraints
 **/
exports.getScenarioConstraints = function(attrlist, userScenarioCd) {
    console.log(userScenarioCd);
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


/**
 * Posts scenario constraints from user scenario constraints grid
 *
 * body UserScenarioConstraintsCreate New user scenario constraint
 * returns userScenario
 **/
exports.postScenarioConstraint = function(body) {
    console.log(body);
    const bundles = body.CONSTRAINT_BUNDLE_ITEMS.slice();
    // console.log(bundles);
    return new Promise(function(resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioConstraint, function (err, obj) {
            delete body.CONSTRAINT_BUNDLE_ITEMS;
            console.log(body);
            obj.constraints.push(body);
            console.log(obj.constraints);

            jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                if (err) console.error(err);
            });
        });

        jsonfile.readFile(appRoot + fileConstraintBundleItems, function (err, obj) {
            obj.bundles = obj.bundles.concat(bundles);
            jsonfile.writeFile(appRoot + fileConstraintBundleItems, obj, function (err) {
                if (err) console.error(err);
            });
        });

        resolve();
    });
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
    console.log(userScenarioCd, constraintBundleCd, attrlist);
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
                    });

                    jsonfile.writeFile(appRoot + fileScenarioConstraint, objScn, function (err) {
                        if (err) console.error(err);
                    });
                } else {
                    console.log(false);
                }

                resolve();
            });
        });

    });
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
                console.log(constraint.ACTIVE_FLG);
                console.log(obj.constraints);
            });

            jsonfile.writeFile(appRoot + fileScenarioConstraint, obj, function (err) {
                if (err) console.error(err);
            });
        });

        resolve();
    });
}
