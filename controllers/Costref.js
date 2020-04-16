'use strict';

var utils = require('../utils/writer.js');
var Costref = require('../service/CostrefService');

module.exports.createCostrefRecord = function createCostrefRecord (req, res, next, body) {
  Costref.createCostrefRecord(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteCostrefRecord = function deleteCostrefRecord (req, res, next, costrefId) {
  Costref.deleteCostrefRecord(costrefId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getCostrefRecords = function getCostrefRecords (req, res, next) {
  Costref.getCostrefRecords()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
