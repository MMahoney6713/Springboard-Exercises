const filterOutOdds = (...args) => {
    return args.filter((num) => num % 2 === 0);
}

const findMin = (...args) => Math.min(...args);

const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

const doubleAndReturnArgs = (array, ...args) => {
    const doubleArgs = args.map((el) => el * 2);
    return [...array, ...doubleArgs];
}


/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (array) => {
    const indexToRemove = Math.floor(Math.random() * array.length);
    array.splice(indexToRemove, 1);
    return array;
}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {
    const objCopy = { ...obj };
    objCopy[key] = val;
    return objCopy;
}


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    const objCopy = { ...obj };
    delete objCopy[key];
    return objCopy;
}


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });


/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
    const objCopy = { ...obj };
    objCopy[key] = val;
    return objCopy;
}