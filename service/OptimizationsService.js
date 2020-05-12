'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const optimizations = '/temp/optimizations.json';


/**
 * Returns list of all scenario optimizations
 *
 * returns optimizationStartCollection
 **/
exports.getOptimizationsList = function(filterQuery,filter,sortBy,start,limit) {
  return new Promise(function(resolve, reject) {
    jsonfile.readFile(appRoot + optimizations, function (err, obj) {
      if (err) return console.log(err);

      if (obj.length > 0) {
        const final = {
          start: start ? start : 0,
          limit: limit ? limit : 0,
          totalCount: obj.length,
          items: [...obj]
        };
        resolve(final);
      } else {
        resolve({
          start: start ? start : 0,
          limit: limit ? limit : 0,
          totalCount: obj.length,
          items: []
        });
      }
    });
  });
};



/**
 * publishes optimization
 *
 * body Body_1  (optional)
 * no response value expected for this operation
 **/
exports.publishOptimization = function(body) {
  return new Promise(function(resolve, reject) {
    resolve(body);
  });
}
