'use strict';


/**
 * return user information
 *
 * returns user
 **/
exports.getUser = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "USER_ID" : "UID001",
  "USER_NAME" : "Cas",
  "USER_ROLE" : "admin"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

