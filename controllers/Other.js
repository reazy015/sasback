'use strict';

var utils = require('../utils/writer.js');
var Other = require('../service/OtherService');

module.exports.checkIfScenarioNameExists = function checkIfScenarioNameExists (req, res, next, name) {
  Other.checkIfScenarioNameExists(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.checkIfTemplateNameExists = function checkIfTemplateNameExists (req, res, next, name) {
  Other.checkIfTemplateNameExists(name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
