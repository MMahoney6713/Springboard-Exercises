////////// Self construction of find and findIndex //////////

// function find(array, callback) {
//     for (let i = 0; i < array.length; i++) {
//         if (callback(array[i], i, array)) {
//             return array[i];
//         }
//     }
// }

// let findEven = find([1, 3, 5, 4, 6], function (el) {
//     return el % 2 === 0;
// })

// function findIndex(array, callback) {
//     for (let i = 0; i < array.length; i++) {
//         if (callback(array[i], i, array)) {
//             return i;
//         }
//     }
//     return -1;
// }

// let findEvenIndex = findIndex([1, 3, 5, 7, 9, 4, 6], function (el) {
//     return el % 2 === 0;
// })

function findUserByUsername(objArray, str) {
    return objArray.find(function (obj) {
        return obj.username === str;
    })
}

function removeUser(objArray, str) {
    let removeIndex = objArray.findIndex(function (obj) {
        return obj.username === str;
    })
    if (removeIndex !== -1) {
        return objArray.splice(removeIndex, 1)[0];
    }
}