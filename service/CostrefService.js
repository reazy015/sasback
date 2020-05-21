'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const file = '/temp/channel-cost-ref-items.json';
const getUniqueIds = require('../utils/idGen.js');

/**
 * create new channel cost ref record
 *
 * costrefId String id of channel cost ref
 * returns costRefRecord
 **/
exports.createCostrefRecord = function (body,userScenarioCd) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            body.CHANNEL_ID = getUniqueIds(1, obj, 'CHANNEL_ID', 'CCR')[0];
            body.SCENARIO_CD = userScenarioCd;
            obj.push(body);
            jsonfile.writeFile(appRoot + file, obj, function (err) {
                if (err) console.error(err);
                resolve(body);
            })
        });
    });
}


/**
 * create new channel cost ref record
 *
 * costrefId String id of channel cost ref
 * returns costRefRecord
 **/
exports.deleteCostrefRecord = function (channelName,userScenarioCd) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            const indexOfItem = obj.findIndex(item => item['CHANNEL_NAME'] === channelName && item['SCENARIO_CD'] === userScenarioCd);
            const deletedItem = obj.splice(indexOfItem, 1);
            jsonfile.writeFile(appRoot + file, obj, function (err) {
                if (err) console.error(err);
                resolve(deletedItem);
            });
        });
    });
};


/**
 * get all items
 *
 * returns costRefRecord
 **/
exports.getCostrefRecords = function (userScenarioCd) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            const result = obj.filter(item => item.SCENARIO_CD === userScenarioCd);
            if (result.length > 0) {
                resolve(result);
            } else {
                resolve([]);
            }
        });
    });
}
