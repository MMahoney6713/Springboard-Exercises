////////// Self construction of some and every //////////

// function some(array, callback) {
//     for (let i = 0; i < array.length; i++) {
//         if (callback(array[i], i, array)) {
//             return true;
//         }
//     }
//     return false;
// }

// function every(array, callback) {
//     for (let i = 0; i < array.length; i++) {
//         if (!callback(array[i], i, array)) {
//             return false;
//         }
//     }
//     return true;
// }

function hasOddNumber(array) {
    return array.some(function (el) {
        return el % 2 === 1;
    })
}

function hasAZero(num) {
    return num.toString().split('').some(function (el) {
        return el === '0';
    })
}

function hasOnlyOddNumbers(array) {
    return array.every(function (el) {
        return el % 2 === 1;
    })
}

function hasNoDuplicates(array) {
    return array.every(function (el) {
        return array.indexOf(el) === array.lastIndexOf(el);
    })
}

function hasCertainKey(objArray, key) {
    return objArray.every(function (obj) {
        return obj.hasOwnProperty(key)
    })
}

function hasCertainValue(objArray, key, val) {
    return objArray.every(function (obj) {
        return obj[key] === val;
    })
}