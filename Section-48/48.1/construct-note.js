// add whatever parameters you deem necessary
function constructNote(msg, letters) {
    if (msg.length === 0) return true;
    if (letters.length === 0) return false;

    let msgMap = new Map();
    let lettersMap = new Map();
    for (let char of msg) msgMap.set(char, msgMap.get(char) + 1 || 1);
    for (let char of letters) lettersMap.set(char, lettersMap.get(char) + 1 || 1);

    for (let [key, val] of msgMap) {
        if (lettersMap.get(key) < msgMap.get(key)) return false;
    }
    return true;
}

module.exports = constructNote;