'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const fileScenarioTemplate = '/temp/scenario-templates.json';
const fileUserScenarios = '/temp/user-scenarios.json';

/**
 * Checks if template name exists
 *
 * name String name to be checked
 * returns nameCheckResponse
 **/
exports.checkIfScenarioNameExists = function (name) {
    name = name.split('_').join(' ').trim();
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileUserScenarios, function (err, obj) {
            if (err) return console.log(err);
            const scenario = obj.items.find(item => item.NAME_SCN === name);
            if (scenario) {
                resolve({NAME_EXISTS: true});
            } else {
                resolve({NAME_EXISTS: false});
            }
        });
    });
}


/**
 * Checks if template name exists
 *
 * name String name to be checked
 * returns nameCheckResponse
 **/
exports.checkIfTemplateNameExists = function (name) {
    name = name.split('_').join(' ').trim();
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileScenarioTemplate, function (err, obj) {
            if (err) return console.log(err);
            const scenario = obj.items.find(item => item.NAME.toLowerCase() === name.toLowerCase());
            if (scenario) {
                resolve({NAME_EXISTS: true});
            } else {
                resolve({NAME_EXISTS: false});
            }
        });
    });
}
