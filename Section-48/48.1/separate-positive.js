// add whatever parameters you deem necessary
function separatePositive(arr) {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        if (arr[left] < 0) {
            let temp = arr[right];
            arr[right] = arr[left];
            arr[left] = temp;
            right--;
        } else {
            left++;
        }
    }

    return arr;
}

module.exports = separatePositive;