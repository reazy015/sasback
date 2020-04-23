'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const file = '/temp/classification-tables.json';
const getUniqueIds = require('../utils/idGen.js');


/**
 * Downloads table file
 *
 * tableId String table id
 * no response value expected for this operation
 **/
exports.getClassificationTableFile = function(tableId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Receives list of classification tables
 *
 * returns classificationTableList
 **/
exports.getClassificationTablesList = function() {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + file, (err, obj) => {
      if (err) return console.log(err);

      if (obj.length > 0) {
        const final = {
          // start: start ? start : 0,
          // limit: limit ? limit : 0,
          totalCount: obj.length,
          items: [...obj]
        }
        resolve(final);
      } else {
        resolve([]);
      }
    });
  });
};


/**
 * Uploads table file
 *
 * file byte[]  (optional)
 * tableId String table id
 * no response value expected for this operation
 **/
exports.postClassificationTableFile = function(file,tableId) {
  console.log(file, tableId);
  return new Promise(function(resolve, reject) {
    resolve();
  });
};
