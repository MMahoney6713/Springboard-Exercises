// Quick Question #1
// Set {1, 2, 3, 4}

// Quick Question #2
// "ref"

// Quick Question #3
//  0: {[1,2,3]:true},
//  1: {[1,2,3]: false}

function hasDuplicate(array) {
    const newSet = new Set(array);
    return array.length !== newSet.size;
}

function vowelCount(str) {
    const vowelMap = new Map();
    for (let char of str) {
        lowerChar = char.toLowerCase();
        if (vowelMap.has(lowerChar)) {
            vowelMap.set(lowerChar, vowelMap.get(lowerChar) + 1);
        }
        else {
            if ('aeiou'.includes(lowerChar)) {
                vowelMap.set(lowerChar, 1);
            }
        }
    }
    return vowelMap;
}