'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const file = '/temp/scenario-templates.json';


/**
 * Creates a new scenario template
 *
 * body ScenarioTemplateCreate The new scenario template
 * returns scenarioTemplate
 **/
exports.createScenarioTemplate = function(body) {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + file, function (err, obj) {
      if (err) console.error(err);
      body.USER_CREATED = 'Cas'; //temp
      obj['items'].push(body);
      jsonfile.writeFile(appRoot + file, obj, function (err) {
        if (err) console.error(err);
        resolve();
      })
    });
  });
}


/**
 * Delete selected scenario template
 *
 * scenarioTemplateCd String The code of the deleting scenario
 * ifMatch String The entity tag obtained from the most recent ETag response header. It must match the current entity tag.
 * ifUnmodifiedSince String The value of the lastModified date of the object. If the object has been updated since this time, the update fails. (optional)
 * no response value expected for this operation
 **/
exports.deleteScenarioTemplate = function(scenarioTemplateCd,ifMatch,ifUnmodifiedSince) {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + file, function (err, obj) {
      const indexOfItem = obj['items'].findIndex(item => item['SCENARIO_TEMPLATE_CD'] === scenarioTemplateCd);
      obj['items'].splice(indexOfItem, 1);
      jsonfile.writeFile(appRoot + file, obj, function (err) {
        if (err) console.error(err);
        resolve();
      });
    });
  });
}


/**
 * Returns a collection of the scenario templates
 *
 * filterQuery Map Basic filtering criteria in exploded form. See [Basic Filtering](https://developer.sas.com/apis/rest/Topics/#basic-filtering)  (optional)
 * filter String Filter criteria for selecting objects to return. See [Filtering in SAS Viya REST APIs](https://developer.sas.com/apis/rest/Topics/#filters)  (optional)
 * sortBy String Sort criteria for the collection (optional)
 * start Integer Offset of the first object to return. Defaults to 0. (optional)
 * limit Integer Maximum number of objecs to return. Defaults to 10. (optional)
 * returns scenarioTemplateCollection
 **/
exports.getScenarioTemplates = function(filterQuery,filter,sortBy,start,limit) {
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
 * Make a partial update of a scenario template
 * Updates the provided fields of a scenario template. The client can provide a sparsely populated object, and only the non-null fields contribute to the updates. A body such as { \"name\": \"NewScenarioTemplateName\" } causes the scenario template to have its name changed, but no other field is affected. The full resulting object is returned in the response. 
 *
 * body ScenarioTemplatePatch The scenario template to patch
 * scenarioTemplateCd String The code of the updatable scenario template
 * ifMatch String The entity tag obtained from the most recent ETag response header. It must match the current entity tag.
 * ifUnmodifiedSince String The value of the lastModified date of the object. If the object has been updated since this time, the update fails. (optional)
 * returns scenarioTemplate
 **/
exports.patchScenarioTemplate = function(body,scenarioTemplateCd,ifMatch,ifUnmodifiedSince) {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + file, function (err, obj) {
      const indexOfItem = obj['items'].findIndex(item => item['SCENARIO_TEMPLATE_CD'] === scenarioTemplateCd);
      body.USER_UPDATED = 'Cas'; //temp
      obj['items'][indexOfItem] = body;
      jsonfile.writeFile(appRoot + file, obj, function (err) {
        if (err) console.error(err);
        resolve();
      });
    });
  });
}

