'use strict';

var utils = require('../utils/writer.js');
var Optimizations = require('../service/OptimizationsService');

module.exports.getOptimizationsList = function getOptimizationsList (req, res, next, filterQuery, filter, sortBy, start, limit) {
  Optimizations.getOptimizationsList(filterQuery, filter, sortBy, start, limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};


module.exports.publishOptimization = function publishOptimization (req, res, next, body) {
    Optimizations.publishOptimization(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

