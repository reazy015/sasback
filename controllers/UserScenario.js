'use strict';

var utils = require('../utils/writer.js');
var UserScenario = require('../service/UserScenarioService');

module.exports.createUserScenario = function createUserScenario (req, res, next, body) {
  UserScenario.createUserScenario(body)
    .then(function (response) {
        if (response === 'Name exists') {
            utils.writeJson(res, response, 409);
        } else {
            utils.writeJson(res, response);
        }
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

module.exports.getBusinessDates = function getBusinessDates (req, res, next) {
  UserScenario.getBusinessDates()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserScenarioOptimizationIdList = function getUserScenarioOptimizationIdList (req, res, next, userScenarioId) {
  UserScenario.getUserScenarioOptimizationIdList(userScenarioId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUserScenarios = function getUserScenarios (req, res, next, filterQuery, filter, sortBy, start, limit) {
  UserScenario.getUserScenarios(filterQuery, filter, sortBy, start, limit)
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

module.exports.startOptimization = function startOptimization (req, res, next, body) {
  UserScenario.startOptimization(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.copyUserScenario = function copyUserScenario (req, res, next, body, userScenarioCd) {
    UserScenario.copyUserScenario(body, userScenarioCd)
        .then(function (response) {
            if (response === 'Name exists') {
                utils.writeJson(res, response, 409);
            } else {
                utils.writeJson(res, response);
            }
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.putScenarioOnSchedule = function putScenarioOnSchedule (req, res, next, userScenarioCd) {
    UserScenario.putScenarioOnSchedule(userScenarioCd)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
