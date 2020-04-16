'use strict';

var utils = require('../utils/writer.js');
var DIMNUMConstraints = require('../service/DIMNUMConstraintsService');

module.exports.deleteScenarioConstraintBundle = function deleteScenarioConstraintBundle (req, res, next, userScenarioCd, constraintBundleCd, ifMatch, attrlist, ifUnmodifiedSince) {
  DIMNUMConstraints.deleteScenarioConstraintBundle(userScenarioCd, constraintBundleCd, ifMatch, attrlist, ifUnmodifiedSince)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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

module.exports.getScenarioConstraints = function getScenarioConstraints (req, res, next, userScenarioCd, attrlist) {
  DIMNUMConstraints.getScenarioConstraints(userScenarioCd, attrlist)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTemplateDimConstraints = function getTemplateDimConstraints (req, res, next, scenarioTemplateCd) {
  DIMNUMConstraints.getTemplateDimConstraints(scenarioTemplateCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTemplateNumConstraints = function getTemplateNumConstraints (req, res, next, scenarioTemplateCd) {
  DIMNUMConstraints.getTemplateNumConstraints(scenarioTemplateCd)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.patchUserScenarioBundles = function patchUserScenarioBundles (req, res, next, body, userScenarioCd, ifMatch, ifUnmodifiedSince) {
  DIMNUMConstraints.patchUserScenarioBundles(body, userScenarioCd, ifMatch, ifUnmodifiedSince)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postScenarioConstraint = function postScenarioConstraint (req, res, next, body) {
  DIMNUMConstraints.postScenarioConstraint(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
