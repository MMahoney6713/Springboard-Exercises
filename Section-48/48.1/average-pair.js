// add whatever parameters you deem necessary
function averagePair(arr, target) {
    if (arr.length === 0) return false;

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        let avg = (arr[left] + arr[right]) / 2;
        if (avg === target) return true;
        if (avg < target) left++;
        if (avg > target) right--;
    }

    return false;
}

module.exports = averagePair;