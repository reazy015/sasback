'use strict';

var utils = require('../utils/writer.js');
var ScenarioTemplate = require('../service/ScenarioTemplateService');

module.exports.createScenarioTemplate = function createScenarioTemplate (req, res, next, body) {
    ScenarioTemplate.createScenarioTemplate(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteScenarioTemplate = function deleteScenarioTemplate (req, res, next, scenarioTemplateCd, ifMatch, ifUnmodifiedSince) {
    ScenarioTemplate.deleteScenarioTemplate(scenarioTemplateCd, ifMatch, ifUnmodifiedSince)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getScenarioTemplates = function getScenarioTemplates (req, res, next, filterQuery, filter, sortBy, start, limit) {
    ScenarioTemplate.getScenarioTemplates(filterQuery, filter, sortBy, start, limit)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.patchScenarioTemplate = function patchScenarioTemplate (req, res, next, body, scenarioTemplateCd, ifMatch, ifUnmodifiedSince) {
    ScenarioTemplate.patchScenarioTemplate(body, scenarioTemplateCd, ifMatch, ifUnmodifiedSince)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
