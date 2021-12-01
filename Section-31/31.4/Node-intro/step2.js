const fs = require('fs');
const axios = require('axios');
const path = process.argv[2];

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(data);
    })
}

function webCat(path) {
    axios.get(path)
        .then(data => console.log(data.data))
        .catch(err => console.log(err));
}

if (path.slice(0,4).toLowerCase() === 'http') {
    webCat(path);
} else {
    cat(path);
}