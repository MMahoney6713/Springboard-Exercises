const fs = require('fs');
const axios = require('axios');

let readPath = process.argv[2];
let writePath = '';
if (readPath === '--out') {
    readPath = process.argv[4];
    writePath = process.argv[3];
}

function cat(readPath, writePath = '') {
    fs.readFile(readPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        if (writePath) {
            writeCat(data, writePath);
        } else {
            console.log(data);
        }
    })
}

function webCat(readPath, writePath = '') {
    axios.get(readPath)
        .then(response => {
            const data = response.data;
            if (writePath) {
                writeCat(data, writePath);
            } else {
                console.log(data)
            }
        })
        .catch(err => console.log(err));
    
}

function writeCat(data, writePath) {
    fs.writeFile(writePath, data, 'utf8', err => console.log(err));
}



if (readPath.slice(0,4).toLowerCase() === 'http') {
    webCat(readPath, writePath);
} else {
    cat(readPath, writePath);
}