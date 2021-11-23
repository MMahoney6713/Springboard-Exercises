
// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

////////////
// Part 1 //
////////////

// Question 1
const numbersURL = "http://numbersapi.com";
const favoriteNum = 3;
const favoriteNumberPromise = axios.get(`${numbersURL}/${favoriteNum}?json`)

favoriteNumberPromise
    .then(data => console.log(data))
    .catch(err => console.log(err));


// Question 2
const range = 2;
const multipleNumberPromise = axios.get(`${numbersURL}/${favoriteNum}..${favoriteNum + range}?json`)

multipleNumberPromise
    .then(data => console.log(data))
    .catch(err => console.log(err));


// Question 3
let numberFactsPromises = [];
const numberFacts = 4;

for (let i = 0; i < numberFacts; i++) {
    numberFactsPromises.push(
        axios.get(`${numbersURL}/${favoriteNum}?json`)
    );
}

Promise.all(numberFactsPromises)
    .then(factsArray => (
        factsArray.forEach(data => console.log(data.data.text))
    ))
    .catch(err => console.log(err));



////////////
// Part 2 //
////////////

// Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.

// Once you have both cards, console.log the values and suits of both cards.

// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.


// Question 1
const deckOfCardsURL = "http://deckofcardsapi.com/api/deck/"
const oneCardPromise = axios.get(`${deckOfCardsURL}/new/draw`)

// oneCardPromise
//     .then(data => console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`))
//     .catch(err => console.log(err));


// Question 2
let twoCardsArray = [];

oneCardPromise
    .then(data => {
        twoCardsArray.push(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`);
        return axios.get(`${deckOfCardsURL}/${data.data.deck_id}/draw`);
    })
    .then(data => {
        twoCardsArray.push(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`);
        twoCardsArray.forEach(card => console.log(card));
    })
    .catch(err => console.log(err));


// Question 3
const newCardButton = $('#draw');
const cardsList = $('#cards-list');

axios.get(`${deckOfCardsURL}/new/shuffle`)
    .then(data => {
        const deckID = data.data.deck_id;

        newCardButton.on('click', function() {
            axios.get(`${deckOfCardsURL}/${deckID}/draw`)
                .then(data => {
                    const card = data.data.cards[0];
                    cardsList.append(`<li>${card.value} of ${card.suit}</li>`);
                })
                .catch(err => {
                    newCardButton.hide();
                })
        })
    })