'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const fileNum = '/temp/num-constraints.json';
const fileDim = '/temp/dim-constraints.json';
const fileScenarioTemplate = '/temp/scenario-templates.json';


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

