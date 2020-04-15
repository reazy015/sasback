'use strict';

var utils = require('../utils/writer.js');
var Temp = require('../service/TempService');

module.exports.checkIfScenarioNameExistsTemp = function checkIfScenarioNameExistsTemp (req, res, next, body) {
  Temp.checkIfScenarioNameExistsTemp(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.checkIfTemplateNameExistsTemp = function checkIfTemplateNameExistsTemp (req, res, next, body) {
  Temp.checkIfTemplateNameExistsTemp(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
