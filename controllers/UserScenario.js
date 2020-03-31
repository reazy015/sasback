'use strict';

var utils = require('../utils/writer.js');
var UserScenario = require('../service/UserScenarioService');

module.exports.deleteUserScenario = function deleteUserScenario (req, res, next) {
  UserScenario.deleteUserScenario()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserScenarios = function getUserScenarios (req, res, next) {
  UserScenario.getUserScenarios()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.patchUserScenario = function patchUserScenario (req, res, next) {
  UserScenario.patchUserScenario()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUserScenario = function postUserScenario (req, res, next) {
  UserScenario.postUserScenario()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
