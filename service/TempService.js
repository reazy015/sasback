'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const fileScenarioTemplate = '/temp/scenario-templates.json';
const fileUserScenarios = '/temp/user-scenarios.json';


/**
 * Checks if template name exists
 *
 * body NameCheckRequest The new scenario template
 * returns nameCheckResponse
 **/
exports.checkIfScenarioNameExistsTemp = function(body) {
    const name = body.NAME.split('_').join(' ').trim();
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + fileUserScenarios, function (err, obj) {
            if (err) return console.log(err);
            const scenario = obj.items.find(item => item.NAME_SCN.toLowerCase() === name.toLowerCase());
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
 * body NameCheckRequest The new scenario template
 * returns nameCheckResponse
 **/
exports.checkIfTemplateNameExistsTemp = function(body) {

    const name = body.NAME.split('_').join(' ').trim();
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

