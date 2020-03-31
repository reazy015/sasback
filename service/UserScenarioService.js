'use strict';


/**
 * Deletes user scenario
 *
 * no response value expected for this operation
 **/
exports.deleteUserScenario = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Returns a collections of the user scenarios
 *
 * returns userScenariosCollections
 **/
exports.getUserScenarios = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "NAME_SCN" : "NAME_SCN",
  "SCENARIO_CD" : "SCENARIO_CD",
  "DTIME_LAST_OPTIMIZATION" : "DTIME_LAST_OPTIMIZATION",
  "USER_UPDATED" : "USER_UPDATED",
  "NAME_SCT" : "NAME_SCT",
  "DTTM_UPDATED" : "DTTM_UPDATED",
  "TEXT_COMMENT" : "TEXT_COMMENT"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Updates user scenarion and specify constraints
 *
 * returns userScenario
 **/
exports.patchUserScenario = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "NAME_SCN" : "NAME_SCN",
  "NAME_SCT" : "NAME_SCT",
  "TEXT_COMMENT" : "TEXT_COMMENT"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Posts  user scenario
 *
 * returns userScenarioCreate
 **/
exports.postUserScenario = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "NAME_SCN" : "NAME_SCN",
  "NAME_SCT" : "NAME_SCT",
  "TEXT_COMMENT" : "TEXT_COMMENT"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

