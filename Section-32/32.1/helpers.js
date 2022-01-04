const ExpressError = require('./expressError');

function validateAndParseInputString(string) {
    const stringArray = string.split(',');

    for (let i = 0; i < stringArray.length; i++) {
        if (Number.isNaN(parseInt(stringArray[i]))) {
            throw new ExpressError(`${stringArray[i]} is not a number.`, 400);
        }
    }

    return stringArray.map(a => parseInt(a));
}

function mean(array) {
    return array.sort().reduce((a, b) => a + b) / array.length;
}

function median(array) {
    const midIndex = Math.ceil(array.length / 2) - 1;
    return array[midIndex];
}

function mode(array) {
    // From ggorlen on https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
    return Object.values(
        array.reduce((count, e) => {
          if (!(e in count)) {
            count[e] = [0, e];
          }
          
          count[e][0]++;
          return count;
        }, {})
      ).reduce((a, b) => b[0] < a[0] ? a : b, [0, null])[1];
     
}

module.exports = {validateAndParseInputString, mean, median, mode};