'use strict';


/**
 * Returns a collection of DIM constraints
 *
 * returns dimConstraints
 **/
exports.getDimConstraints = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "constraints" : [ {
    "DIM_TABLE_NAME" : "DIM_TABLE_NAME",
    "ATTR_NAME" : "ATTR_NAME",
    "ATTR_LABEL" : "ATTR_LABEL"
  }, {
    "DIM_TABLE_NAME" : "DIM_TABLE_NAME",
    "ATTR_NAME" : "ATTR_NAME",
    "ATTR_LABEL" : "ATTR_LABEL"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Returns a collection of NUM constraints
 *
 * returns numConstraints
 **/
exports.getNumConstraints = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "constraints" : [ {
    "ATTR_NAME" : "ATTR_NAME",
    "ATTR_LABEL" : "ATTR_LABEL"
  }, {
    "ATTR_NAME" : "ATTR_NAME",
    "ATTR_LABEL" : "ATTR_LABEL"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

