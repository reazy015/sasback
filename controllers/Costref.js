'use strict';

var utils = require('../utils/writer.js');
var Costref = require('../service/CostrefService');

module.exports.createCostrefRecord = function createCostrefRecord (req, res, next, body, userScenarioCd) {
    Costref.createCostrefRecord(body, userScenarioCd)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteCostrefRecord = function deleteCostrefRecord (req, res, next, channelName, userScenarioCd) {
    Costref.deleteCostrefRecord(channelName, userScenarioCd)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getCostrefRecords = function getCostrefRecords (req, res, next, userScenarioCd) {
    Costref.getCostrefRecords(userScenarioCd)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
