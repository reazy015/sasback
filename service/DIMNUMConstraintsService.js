'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const fileNum = '/temp/num-constraints.json';
const fileDim = '/temp/dim-constraints.json';


/**
 * Returns a collection of DIM constraints
 *
 * returns dimConstraints
 **/
exports.getDimConstraints = function() {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + fileNum, function (err, obj) {
      console.log(obj);
      if (err) console.error(err);
      if (Object.keys(obj).length > 0) {
        resolve(obj[Object.keys(obj)[0]]);
      } else {
        resolve();
      }
    });
  });
}


/**
 * Returns a collection of NUM constraints
 *
 * returns numConstraints
 **/
exports.getNumConstraints = function() {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + fileDim, function (err, obj) {
      if (err) console.error(err);
      if (Object.keys(obj).length > 0) {
        resolve(obj[Object.keys(obj)[0]]);
      } else {
        resolve();
      }
    });
  });
}

