
const myForEach = function (array, func) {
    for (let i = 0; i < array.length; i++) {
        console.log(func(array[i]));
    }
}

function square(x) {
    return x ** x;
}


function forEach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}




let colors = ['teal', 'purple', 'green', 'red'];

forEach(colors, function (color, i) {
    console.log(color.toUpperCase());
    console.log(i);
})