/** Command-line tool to generate Markov text. */
const fs = require('fs/promises');
const axios = require('axios');
const {MarkovMachine} = require("./markov.js");

const readType = process.argv[2];
const readPath = process.argv[3];

makeText(readType, readPath);

async function makeText(readType, readPath) {
    const text = await getMarkovText(readType, readPath)
    console.log(text)
    const mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

async function getMarkovText(readType, readPath) {

    if (readType.toLowerCase() === 'url') {
        axios.get(readPath)
            .then(response => {
                return response.data
            })
            .catch(err => console.log(err));
    } else {
        fs.readFile(readPath, 'utf8')
            .then(data => {
                return data
            })
            .catch(err => console.log(err));
    }

}   

