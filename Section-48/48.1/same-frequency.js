// add whatever parameters you deem necessary
function sameFrequency(int1, int2) {
    if (!int1 || !int2) return false;

    let str1 = int1.toString();
    let str2 = int2.toString();
    let map1 = freqCounter(str1);
    let map2 = freqCounter(str2);

    if (map1.size !== map2.size) return false;

    for (let [key, val] of map1) {
        if (map1.get(key) !== map2.get(key)) return false;
    }

    return true;
}

function freqCounter(str) {
    let map = new Map()

    for (let char of str) map.set(char, map.get(char) + 1 || 1);

    return map;
}

module.exports = sameFrequency;