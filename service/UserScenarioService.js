'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const file = '/temp/user-scenarios.json';


/**
 * Deletes user scenario
 *
 * userScenarioCd String The code of the updatable scenario template
 * ifMatch String The entity tag obtained from the most recent ETag response header. It must match the current entity tag.
 * ifUnmodifiedSince String The value of the lastModified date of the object. If the object has been updated since this time, the update fails. (optional)
 * no response value expected for this operation
 **/
exports.deleteUserScenario = function(userScenarioCd,ifMatch,ifUnmodifiedSince) {
  return new Promise(function(resolve, reject) {
      jsonfile.readFile(appRoot + file, function (err, obj) {
          const indexOfItem = obj['items'].findIndex(item => item['SCENARIO_TEMPLATE_CD'] === userScenarioCd);
          obj['items'].splice(indexOfItem, 1);
          jsonfile.writeFile(appRoot + file, obj, function (err) {
              if (err) console.error(err);
              resolve();
          });
      });
  });
}


/**
 * Returns a collections of the user scenarios
 *
 * returns userScenariosCollection
 **/
exports.getUserScenarios = function() {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + file, function (err, obj) {
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
 * Updates user scenarion and specify constraints
 *
 * body UserScenarioPatch The scenario template to patch
 * userScenarioCd String The code of the updatable scenario template
 * ifMatch String The entity tag obtained from the most recent ETag response header. It must match the current entity tag.
 * ifUnmodifiedSince String The value of the lastModified date of the object. If the object has been updated since this time, the update fails. (optional)
 * returns userScenario
 **/
exports.patchUserScenario = function(body,userScenarioCd,ifMatch,ifUnmodifiedSince) {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + file, function (err, obj) {
          const indexOfItem = obj['items'].findIndex(item => item['SCENARIO_CD'] === userScenarioCd);
          obj['items'][indexOfItem] = body;
          jsonfile.writeFile(appRoot + file, obj, function (err) {
              if (err) console.error(err);
              resolve();
          });
  });
  });
}

/**
 * Posts  user scenario
 *
 * body UserScenarioCreate The new scenario template
 * returns userScenarioCreate
 **/
exports.createUserScenario = function(body) {
    return new Promise(function(resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            obj['items'].push(body);
            jsonfile.writeFile(appRoot + file, obj, function (err) {
                if (err) console.error(err);
                resolve();
            })
        });
    });
}
