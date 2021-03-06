'use strict';
const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');
const file = '/temp/user-scenarios.json';
const optimizations = '/temp/optimizations.json';
const getUniqueIds = require('../utils/idGen.js');


/**
 * Deletes user scenario
 *
 * userScenarioCd String The code of the updatable scenario template
 * ifMatch String The entity tag obtained from the most recent ETag response header. It must match the current entity tag.
 * ifUnmodifiedSince String The value of the lastModified date of the object. If the object has been updated since this time, the update fails. (optional)
 * no response value expected for this operation
 **/
exports.deleteUserScenario = function (userScenarioCd, ifMatch, ifUnmodifiedSince) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            const indexOfItem = obj['items'].findIndex(item => item['SCENARIO_TEMPLATE_CD'] === userScenarioCd);
            obj['items'].splice(indexOfItem, 1);
            jsonfile.writeFile(appRoot + file, obj, function (err) {
                if (err) console.error(err);
                resolve();
            });
        });
    });
}


/**
 * Returns a collections of the user scenarios
 *
 * returns userScenariosCollection
 **/
exports.getUserScenarios = function (filterQuery,filter,sortBy,start,limit) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            if (Object.keys(obj).length > 0) {
                const final = {
                    start: start ? start : 0,
                    limit: limit ? limit : 0,
                    totalCount: Object.keys(obj)[0].length,
                    ...obj
                };
                resolve(final);
            } else {
                resolve();
            }
        });
    });
}


/**
 * Updates user scenarion and specify constraints
 *
 * body UserScenarioPatch The scenario template to patch
 * userScenarioCd String The code of the updatable scenario template
 * ifMatch String The entity tag obtained from the most recent ETag response header. It must match the current entity tag.
 * ifUnmodifiedSince String The value of the lastModified date of the object. If the object has been updated since this time, the update fails. (optional)
 * returns userScenario
 **/
exports.patchUserScenario = function (body, userScenarioCd, ifMatch, ifUnmodifiedSince) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            const indexOfItem = obj['items'].findIndex(item => item['SCENARIO_CD'] === userScenarioCd);
            body.DTTM_UPDATED = new Date();
            obj['items'][indexOfItem] = body;
            jsonfile.writeFile(appRoot + file, obj, function (err) {
                if (err) console.error(err);
                resolve();
            });
        });
    });
}

/**
 * Posts  user scenario
 *
 * body UserScenarioCreate The new scenario template
 * returns userScenarioCreate
 **/
exports.createUserScenario = function (body) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            const scenario = obj.items.find(item => item.NAME_SCN === body.NAME_SCN);
            if (scenario) {
                resolve('Name exists');
            } else {
                body.SCENARIO_CD = getUniqueIds(1, obj.items, 'SCENARIO_CD', 'SCN')[0];
                body.USER_UPDATED = 'Cas'; //temp
                console.log(body);
                obj['items'].push(body);
                jsonfile.writeFile(appRoot + file, obj, function (err) {
                    if (err) console.error(err);
                    resolve();
                })
            }
        });
    });
};

/**
 * Returns list of available dates
 *
 * returns businessDates
 **/
exports.getBusinessDates = function() {
    return new Promise(function(resolve, reject) {
        var examples = [
            {
                BUSINESS_DT: new Date(2020, 3,21)
            },
            {
                BUSINESS_DT: new Date(2020, 3,22)
            },
            {
                BUSINESS_DT: new Date(2020, 3,23)
            },
            {
                BUSINESS_DT: new Date(2020, 3,24)
            },
            {
                BUSINESS_DT: new Date(2020, 3,25)
            },
            {
                BUSINESS_DT: new Date(2020, 4,3)
            },
            {
                BUSINESS_DT: new Date(2020, 4,4)
            },
            {
                BUSINESS_DT: new Date(2020, 4,5)
            },
            {
                BUSINESS_DT: new Date(2020, 4,6)
            },
            {
                BUSINESS_DT: new Date(2020, 3,24)
            }
        ];
        if (examples.length > 0) {
            resolve(examples);
        } else {
            resolve();
        }
    });
};

/**
 * Returns list of optimization ids for particular scenario
 *
 * userScenarioId String user scenario code
 * returns optimizationsIdList
 **/
exports.getUserScenarioOptimizationIdList = function(userScenarioId) {
    return new Promise(function(resolve, reject) {
        console.log(userScenarioId);
        jsonfile.readFile(appRoot + optimizations, function (err, obj) {
            if (err) return console.log(err);
            console.log(obj);
            const opts = obj.filter(item => item.SCENARIO_CD === userScenarioId);

            if (opts.length) {
                console.log(true);
                const result = opts.map(item => {
                    return {
                        OPTIMIZATION_ID: item.OPTIMIZATION_ID,
                        PROCESSED_DTTM: item.PROCESSED_DTTM
                    }
                });
                resolve(result);
            } else {
                console.log(false);
                resolve([]);
            }
        });
    });
};

/**
 * Start new optimization calculation
 *
 * body UserScenarioOptimizationStart data for scenario optimization init
 * returns userScenarioOptimizationRes
 **/
exports.startOptimization = function(body) {
    return new Promise(function(resolve, reject) {
        jsonfile.readFile(appRoot + optimizations, function (err, objOpt) {
            if (err) console.error(err);

            body.OPTIMIZATION_ID = Math.floor(Math.random() * 1000000);
            body.USER_CREATED = 'Cas'; //temp
            body.OPTIMIZATION_STATUS = 'В процессе запуска';
            body.OPTIMIZATION_PUBLICATION_STATUS = 'Не опубликовано';
            body.PROCESSED_DTTM = new Date();

            jsonfile.readFile(appRoot + file, function (err, obj) {
                const scenario = obj.items.find(item => item.SCENARIO_CD === body.SCENARIO_CD);
                body.SCENARIO_TEMPLATE_NAME = scenario.NAME_SCT;
                // console.log(body);
                objOpt.push(body);

                jsonfile.writeFile(appRoot + optimizations, objOpt, function (err) {
                    if (err) console.error(err);
                    resolve({
                        START_AVAILABLE: true,
                        OPTIMIZATION_ID: body.OPTIMIZATION_ID
                    });
                })
            });
        });
    });
};

/**
 * Posts  user scenario
 *
 * userScenarioCd String user scenario code
 * returns inline_response_201
 **/
exports.copyUserScenario = function(body,userScenarioCd) {
    console.log(userScenarioCd);
    return new Promise(function(resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            if (err) console.error(err);
            const scenario = obj.items.find(item => item.NAME_SCN === body.NAME_SCN);
            if (scenario) {
                resolve('Name exists');
            } else {

                body.SCENARIO_CD = getUniqueIds(1, obj.items, 'SCENARIO_CD', 'SCN')[0];
                body.USER_UPDATED = 'Cas'; //temp
                // console.log(body);
                obj['items'].push(body);
                jsonfile.writeFile(appRoot + file, obj, function (err) {
                    if (err) console.error(err);
                    resolve();
                })
            }
        });
    });
}

/**
 * post user scenario on schedule
 *
 * userScenarioCd String user scenario code
 * no response value expected for this operation
 **/
exports.putScenarioOnSchedule = function(userScenarioCd) {
    return new Promise(function (resolve, reject) {
        jsonfile.readFile(appRoot + file, function (err, obj) {
            const indexOfItem = obj['items'].findIndex(item => item['SCENARIO_CD'] === userScenarioCd);
            obj.items.forEach(item => item.SCHEDULED_FLG = 'N');
            obj['items'][indexOfItem].SCHEDULED_FLG = 'Y';
            jsonfile.writeFile(appRoot + file, obj, function (err) {
                if (err) console.error(err);
                resolve();
            });
        });
    });
}
