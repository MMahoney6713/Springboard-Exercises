import React from 'react';
import { choice, remove } from './helpers';
import fruits from './foods';

// Randomly draw a fruit from the array
// Log the message “I’d like one RANDOMFRUIT, please.”
// Log the message “Here you go: RANDOMFRUIT”
// Log the message “Delicious! May I have another?”
// Remove the fruit from the array of fruits
// Log the message “I’m sorry, we’re all out. We have FRUITSLEFT left.”

const fruitList = fruits()
let randomFruit = choice(fruitList);
console.log(`I'd like one ${randomFruit}, please.`);
let removedFruit = remove(fruitList, randomFruit);
if (removedFruit) {
    console.log(`Here you go: ${randomFruit}`);
    console.log('Delicious! May I have another?');
}
console.log(`I'm sorry, we're all out. We have ${fruitList.length} left`)