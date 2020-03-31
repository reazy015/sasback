'use strict';

var utils = require('../utils/writer.js');
var DIMNUMConstraints = require('../service/DIMNUMConstraintsService');

module.exports.getDimConstraints = function getDimConstraints (req, res, next) {
  DIMNUMConstraints.getDimConstraints()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNumConstraints = function getNumConstraints (req, res, next) {
  DIMNUMConstraints.getNumConstraints()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
