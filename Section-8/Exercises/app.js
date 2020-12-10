
//////////// ForEach /////////////

function doubleValues(array) {
    const tempArray = [];
    array.forEach(function (val) {
        tempArray.push(val * 2);
    })
    return tempArray;
}

function onlyEvenValues(array) {
    const tempArray = [];
    array.forEach(function (val) {
        if (val % 2 === 0) {
            tempArray.push(val);
        }
    })
    return tempArray;
}

function showFirstAndLast(strArray) {
    const tempArray = [];
    strArray.forEach(function (word) {
        tempArray.push(word[0] + word[word.length - 1]);
    })
    return tempArray;
}

const objTestArray = [
    { name: 'Elie' },
    { name: 'Tim' },
    { name: 'Matt' },
    { name: 'Colt' }
];

function addKeyAndValue(objArray, key, val) {
    objArray.forEach(function (obj) {
        obj[key] = val;
    })
    return objArray;
}

function vowelCount(str) {
    const tempArray = [...str];
    const tempObj = {};
    tempArray.forEach(function (char) {
        let lowerChar = char.toLowerCase();
        if ('aeiou'.includes(lowerChar)) {
            tempObj[lowerChar] = str.toLowerCase().split(lowerChar).length - 1
        }
    })
    return tempObj;
}


//////////// Map /////////////

function doubleValuesWithMap(arr) {
    return arr.map(function (val) {
        return val * 2;
    })
}

function valTimesIndex(arr) {
    return arr.map(function (val, i) {
        return val * i;
    })
}

function extractKey(objArray, key) {
    return objArray.map(function (obj) {
        return obj[key];
    })
}

function extractFullName(objArray) {
    return objArray.map(function (obj) {
        return obj.first + ' ' + obj.last;
    })
}


//////////// Filter /////////////

function filterByValue(objArray, key) {
    return objArray.filter(function (obj) {
        let keys = Object.keys(obj);
        return keys.includes(key);
    })
}

function find(array, val) {
    let found = false;
    const findArray = array.filter(function (el) {
        if (!found) {
            if (el === val) {
                return el === val;
                found = true;
            }
        }
    })
    if (findArray.length === 0) {
        return undefined;
    }
    return findArray;
}

function findInObj(objArray, key, val) {
    let found = false;
    return objArray.filter(function (obj) {
        if (!found) {
            if (obj.hasOwnProperty(key) && obj[key] === val) {
                return true;
                found = true;
            }
        }
    })
}

function removeVowels(str) {
    return [...str].filter(function (char) {
        return (!'aeiou'.includes(char.toLowerCase()))
    }).join('').toLowerCase();
}

function doubleOddNumbers(array) {
    return array
        .filter(function (el) {
            return el % 2 === 1;
        })
        .map(function (el) {
            return el * 2;
        })
}