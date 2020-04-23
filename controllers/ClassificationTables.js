'use strict';

var utils = require('../utils/writer.js');
var ClassificationTables = require('../service/ClassificationTablesService');
var file = '/temp/classification-tables.json';
const appRoot = require('app-root-path');

module.exports.getClassificationTableFile = function getClassificationTableFile (req, res, next, tableId) {
  ClassificationTables.getClassificationTableFile(tableId)
    .then(function (response) {
      res.download(appRoot + file);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getClassificationTablesList = function getClassificationTablesList (req, res, next) {
  ClassificationTables.getClassificationTablesList()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postClassificationTableFile = function postClassificationTableFile (req, res, next, file, tableId) {
    ClassificationTables.postClassificationTableFile(file, tableId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
