const jsonfile = require('jsonfile');
const appRoot = require('app-root-path');


module.exports =  (number, obj, field, prefix) => {
    const resultKeys = [];

    const key = Object.keys(obj)[0];
    const uniqueIdKeys = [...new Set(obj[key].map(key => key[field]))];

    while(resultKeys.length < number) {
        const randomNumber = Math.floor(Math.random() * 100);
        const randomNumberDigitsLength = randomNumber.toString().length;
        const zeroLength = 3 - randomNumberDigitsLength;
        const result = prefix + '0'.repeat(zeroLength) + randomNumber.toString();
        if(!uniqueIdKeys.includes(result)) {
            resultKeys.push(result);
        }
    }

    return resultKeys;
}
