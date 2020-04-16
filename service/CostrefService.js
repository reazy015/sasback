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
exports.createCostrefRecord = function (body) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            body.CHANNEL_ID = getUniqueIds(1, obj, 'CHANNEL_ID', 'CCR')[0];
            obj.push(body);
            jsonfile.writeFile(appRoot + file, obj, function (err) {
                if (err) console.error(err);
                resolve();
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
exports.deleteCostrefRecord = function (costrefId) {
    return new Promise(function (resolve, reject) {
        return new Promise(function (resolve, reject) {
            jsonfile.readFile(appRoot + file, function (err, obj) {
                const indexOfItem = obj.findIndex(item => item['CHANNEL_ID'] === costrefId);
                const deletedItem = obj.splice(indexOfItem, 1);
                jsonfile.writeFile(appRoot + file, obj, function (err) {
                    if (err) console.error(err);
                    resolve(deletedItem);
                });
            });
        });

    });
}


/**
 * get all items
 *
 * returns costRefRecord
 **/
exports.getCostrefRecords = function () {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            if (Object.keys(obj).length > 0) {
                resolve(obj);
            } else {
                resolve([]);
            }
        });
    });
}

