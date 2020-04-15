'use strict';


/**
 * Checks if template name exists
 *
 * name String name to be checked
 * returns nameCheckResponse
 **/
exports.checkIfScenarioNameExists = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "NAME_EXISTS" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Checks if template name exists
 *
 * name String name to be checked
 * returns nameCheckResponse
 **/
exports.checkIfTemplateNameExists = function(name) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "NAME_EXISTS" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

