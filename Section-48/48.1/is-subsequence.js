// add whatever parameters you deem necessary
function isSubsequence(str1, str2) {
    let idx = 0;

    for (let char of str1) {
        console.log(char, str2[idx])
        while (str2[idx] !== char) {
            if (idx === str2.length) return false
            idx++
        }
        idx++;
    }
    
    return true;
}

module.exports = isSubsequence;