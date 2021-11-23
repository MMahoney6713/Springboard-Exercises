
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

////////////
// Part 1 //
////////////

// Question 1

const numbersURL = "http://numbersapi.com";
const favoriteNum = 3;

async function getFavNumFact(favNum) {
    const numInfo = await axios.get(`${numbersURL}/${favNum}?json`)
    console.log(numInfo.data.text);
}
getFavNumFact(favoriteNum);


// Question 2

async function getMultiNums(startRange, endRange) {
    const numInfo = await axios.get(`${numbersURL}/${startRange}..${endRange}?json`)
    for (const key in numInfo.data) {
        console.log(numInfo.data[key])
    }
}
getMultiNums(2,5);


// Question 3

async function getFourFacts(num) {
    let fourFactsPromises = [];
    for (let i = 0; i < 4; i++) {
        fourFactsPromises.push(axios.get(`${numbersURL}/${num}?json`))
    }
    const fourFacts = await Promise.all(fourFactsPromises)
    for (let i = 0; i < 4; i++) {
        console.log(fourFacts[i].data.text)
    }
}
getFourFacts(favoriteNum);



////////////
// Part 2 //
////////////

// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.


// Question 1
const deckOfCardsURL = "http://deckofcardsapi.com/api/deck/"

async function getOneCard() {
    const response = await axios.get(`${deckOfCardsURL}/new/draw`);
    const card = response.data.cards[0];
    console.log(`${card.value} of ${card.suit}`)
}
getOneCard();


// Question 2
let twoCardsArray = [];

async function getTwoCards() {
    const response1 = await axios.get(`${deckOfCardsURL}/new/draw`)
    const response2 = await axios.get(`${deckOfCardsURL}/${response1.data.deck_id}/draw`)

    const card1 = response1.data.cards[0];
    const card2 = response2.data.cards[0];
    console.log(`${card1.value} of ${card1.suit}`);
    console.log(`${card2.value} of ${card2.suit}`);
}
getTwoCards();


// Question 3
const newCardButton = $('#draw');
const cardsList = $('#cards-list');

async function setUpDeck() {
    const newDeckResponse = await axios.get(`${deckOfCardsURL}/new/shuffle`);
    const newDeckID = newDeckResponse.data.deck_id;

    newCardButton.on('click', async function() {
        const newCardResponse = await axios.get(`${deckOfCardsURL}/${newDeckID}/draw`);
        const card = newCardResponse.data.cards[0];
        cardsList.append(`<li>${card.value} of ${card.suit}</li>`);
        if (newCardResponse.data.remaining === 0) {
            newCardButton.hide();
        }
    })
}
setUpDeck();