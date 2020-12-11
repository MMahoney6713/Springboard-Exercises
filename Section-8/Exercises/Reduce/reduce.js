function extractValue(objArray, key) {
    return objArray.reduce(function (keyArray, obj) {
        keyArray.push(obj[key])
        return keyArray
    }, [])
}

function vowelCount(str) {
    return [...str.toLowerCase()].reduce(function (countObj, char) {
        if ('aeiou'.indexOf(char) !== -1) {
            if (countObj[char]) {
                countObj[char]++;
            }
            else {
                countObj[char] = 1;
            }
        }
        return countObj;
    }, {})
}

function addKeyAndValue(objArray, key, val) {
    return objArray.reduce(function (keysAdded, obj) {
        obj[key] = val;
        keysAdded.push(obj);
        return keysAdded;
    }, [])
}

function partition(array, callback) {
    return array.reduce(function (accArray, el) {
        if (callback(el)) {
            accArray[0].push(el);
        }
        else {
            accArray[1].push(el);
        }
        return accArray;
    }, [[], []])
}