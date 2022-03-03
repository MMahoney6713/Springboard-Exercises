// add whatever parameters you deem necessary
function twoArrayObject(keysArr, valsArr) {
    let returnObj = {};
    let idx = 0;

    for (let key of keysArr) {
        if (valsArr[idx]) {
            returnObj[key] = valsArr[idx];
        } else {
            returnObj[key] = null;
        }
        idx++;
    }

    return returnObj;
}   

module.exports = twoArrayObject;