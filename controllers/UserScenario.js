'use strict';

var utils = require('../utils/writer.js');
var UserScenario = require('../service/UserScenarioService');

module.exports.createUserScenario = function createUserScenario (req, res, next, body) {
    UserScenario.createUserScenario(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteUserScenario = function deleteUserScenario (req, res, next, userScenarioCd, ifMatch, ifUnmodifiedSince) {
    UserScenario.deleteUserScenario(userScenarioCd, ifMatch, ifUnmodifiedSince)
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

module.exports.patchUserScenario = function patchUserScenario (req, res, next, body, userScenarioCd, ifMatch, ifUnmodifiedSince) {
    UserScenario.patchUserScenario(body, userScenarioCd, ifMatch, ifUnmodifiedSince)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
