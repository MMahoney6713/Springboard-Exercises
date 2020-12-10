
const words = [
    'imuunodklajdfjklasdjifajsdklfji',
    'ajilaskdfj',
    'tskstsk',
    'crypt',
    'cysts',
    'unimaineindty'
]

const longWords = words.filter(function (word) {
    return word.length >= 20;
})


const cOrUWords = words.filter(function (w) {
    return w[0] === 'u' || w[0] === 'c'
})

const isVowel = function (char) {
    return 'aeiou'.indexOf(char) !== -1
}
const containsVowel = function (word) {
    for (let char of word) {
        if (isVowel(char)) return true;
    }
    return false;
}

const containVowels = words.filter(containsVowel)
const noVowels = words.filter(function (word) {
    return !containsVowel(word);
})

const allCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));

const checked = allCheckboxes.filter(function (checkbox) {
    return checkbox.checked
})

const mappedChecked = checked.map(function (checkbox) {
    return checkbox.parentElement.innerText; o
})

function extractCompletedTodos() {
    const allCheckboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    return allCheckboxes
        .filter(function (checkbox) {
            return checkbox.checked
        })
        .map(function (checkbox) {
            return checkbox.parentElement.innerText; o
        })
}


// my filter
function myFilter(array, func) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        if (func(array[i]) === true) {
            newArray.push(array[i]);
        }
    }
    return newArray;
}


function coltFilter(arr, callback) {
    const filteredArray = [];
    for (let i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            filteredArray.push(arr[i]);
        }
    }
    return filteredArray;
}

// map Practice
// const numbers = [21, 37, 64, 99, 142];

// const negatives = numbers.map(function (num) {
//     return num * -1;
// })

// const squares = numbers.map(function (num) {
//     return num ** 2;
// })

// const numbersV2 = numbers.map(function (num) { return num });

// const todos = [
//     {
//         id: 1,
//         text: 'walk the dog',
//         priority: 'high',
//     },
//     {
//         id: 2,
//         text: 'walk the chickens',
//         priority: 'medium',
//     }
// ]

// const todoText = todos.map(function (todo) {
//     return todo.text;
// })

// const links = document.querySelectorAll('a');
// const linksArray = Array.from(links);

// const urls = linksArray.map(function (a) {
//     return a.href
// })


// // Self implementation of map function
// function myMap(array, func) {
//     const newArray = Array(array.length)
//     for (let i = 0; i < array.length; i++) {
//         newArray[i] = func(array[i])
//     }
//     return newArray;
// }

// const multiply2 = myMap(numbers, function (num) {
//     return num * 2;
// })


// function coltMap(arr, callback) {
//     const mappedArray = [];
//     for (let i = 0; i < arr.length; i++) {
//         const val = callback(arr[i], i, arr);
//         mappedArray.push(val);
//     }
//     return mappedArray;
// }

// const coltTodos = coltMap(todos, function (todo) {
//     return todo.priority;
// })

// const repeatedStrings = coltMap(['a', 'b', 'c', 'd', 'e'], function (str, idx) {
//     return str.repeat(idx);
// })

// forEach practice
// const myForEach = function (array, func) {
//     for (let i = 0; i < array.length; i++) {
//         console.log(func(array[i]));
//     }
// }

// function square(x) {
//     return x ** x;
// }


// function forEach(arr, callback) {
//     for (let i = 0; i < arr.length; i++) {
//         callback(arr[i], i);
//     }
// }




// let colors = ['teal', 'purple', 'green', 'red'];

// forEach(colors, function (color, i) {
//     console.log(color.toUpperCase());
//     console.log(i);
// })