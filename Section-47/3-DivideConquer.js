function countZeroes(array) {
    let arrLength = array.length;
    let rightIndex = arrLength - 1;
    let leftIndex = 0;
    
    while (leftIndex <= rightIndex) {
        let midIndex = Math.floor((rightIndex + leftIndex)/2)
        if (array[midIndex] === 1) {
            leftIndex = midIndex + 1;
        } else {
            rightIndex = midIndex - 1;
        }
    }
    return arrLength - leftIndex;
}

console.log("Count Zeroes:", countZeroes([1,1,1,1,0,0]), // 2
countZeroes([1,0,0,0,0]), // 4
countZeroes([0,0,0]), // 3
countZeroes([1,1,1,1])) // 0






function sortedFrequency(array, target) {
    let leftIndex = findFirst(array, target);
    if (leftIndex === -1) {
        return -1;
    } 
    return findLast(array, target) - leftIndex + 1;
}

function findFirst(array, target) {
    let leftIndex = 0
    let rightIndex = array.length - 1
    let midIndex = Math.floor((leftIndex + rightIndex) / 2)
    while (leftIndex <= rightIndex) {
        let midIndex = Math.floor((leftIndex + rightIndex) / 2)
        if (array[midIndex] >= target) {
            rightIndex = midIndex - 1
        } else {
            leftIndex = midIndex + 1
        }
    }
    if (array[leftIndex] != target) {
        return -1
    }
    return leftIndex
}
function findLast(array, target) {
    let leftIndex = 0
    let rightIndex = array.length - 1
    
    while (leftIndex <= rightIndex) {
        let midIndex = Math.floor((leftIndex + rightIndex) / 2)
        if (array[midIndex] > target) {
            rightIndex = midIndex - 1
        } else {
            leftIndex = midIndex + 1
        }
    }
    return rightIndex
}

console.log("SortedFrequency:", sortedFrequency([1,1,2,2,2,2,3],2), // 4
sortedFrequency([1,1,2,2,2,2,3],3), // 1
sortedFrequency([1,1,2,2,2,2,3],1), // 2
sortedFrequency([1,1,2,2,2,2,3],4)) // -1)






function findRotatedIndex(array, target) {
    let leftIndex = 0
    let rightIndex = array.length -1

    // while (leftIndex <= rightIndex) {
    //     let midIndex = Math.floor((leftIndex + rightIndex) / 2)
    //     if (array[midIndex] === target) {
    //         return midIndex
    //     } 
    // }
    return -1
}

console.log("FindRotatedIndex:", findRotatedIndex([3,4,1,2],4), // 1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 8), // 2
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 3), // 6
findRotatedIndex([37,44,66,102,10,22],14), // -1
findRotatedIndex([6, 7, 8, 9, 1, 2, 3, 4], 12)) // -1)







function findRotationCount(array) {
    let leftIndex = 0
    let rightIndex = array.length -1 

    while (leftIndex <= rightIndex) {
        let midIndex = Math.floor((leftIndex + rightIndex) / 2)
        if (array[midIndex-1] > array[midIndex]) {
            return midIndex
        } else if (array[midIndex] > array[0]) {
            leftIndex = midIndex + 1
        } else {
            rightIndex = midIndex - 1
        }
    }
    return 0
}

console.log("Find Rotation Count:", findRotationCount([15, 18, 2, 3, 6, 12]), // 2
findRotationCount([7, 9, 11, 12, 5]), // 4
findRotationCount([7, 9, 11, 12, 15])) // 0