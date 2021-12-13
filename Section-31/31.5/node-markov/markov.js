/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.markovChains = this.makeChains();
  }

  makeChains() {
    let markovChains = {};
    this.words.forEach(word => {
      let chainForThisWord = [];
      for (let i = 0; i < this.words.length; i++) {
        if (this.words[i] === word && !chainForThisWord.includes(this.words[i+1]) ) {
          chainForThisWord.push(this.words[i+1])
        }
      }
      markovChains[word] = chainForThisWord;
    })
    console.log(markovChains)
    return markovChains;
  }


  makeText(numWords = 50) {
    let textOut = '';
    let startingWord = this.words[Math.floor(Math.random() * this.words.length)]
    textOut += startingWord;

    let previousWord = startingWord;
    let i = 1;
    while (i < numWords && this.markovChains[previousWord] !== undefined) {
      const nextChain = this.markovChains[previousWord];
      const nextWord = nextChain[Math.floor(Math.random() * nextChain.length)]

      if (nextWord === undefined) break

      textOut += ` ${nextWord}`;
      previousWord = nextWord;
      i++;
    }

    return textOut;
  }
}

module.exports = {MarkovMachine};