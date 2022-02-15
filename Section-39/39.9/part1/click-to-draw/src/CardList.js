import React, { useState, useEffect, useRef} from 'react';
import Card from './Card';
import axios from 'axios';

const CardList = () => {

    const BASE_URL = 'http://deckofcardsapi.com/api/deck';

    const [cardArray, setCardArray] = useState([]);
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        async function getDeck() {
            let response = await axios.get(`${BASE_URL}/new/shuffle`);
            console.log(response.data)
            setDeck(response.data);
        }
        getDeck();
    }, []);

    useEffect(async () => {
        try {
            const response = await axios.get(`${BASE_URL}/${deck.deck_id}/draw`)

            if (response.data.remaining === 0) {
                setDeck(null)
                throw new Error("end of deck")
            }

            const newCard = response.data.cards[0]

            setCardArray(cards => [
                ...cards, 
                newCard.code
            ])
        } catch (err) {
            console.log(err);
        }
    }, [deck])


    const drawCard = () => {
        setDeck(deck => {
            return {
                deck_id: deck.deck_id,
                remaining: deck.remaining - 1
            }
        })
    }

    const cards = cardArray.map(card => (
        <Card info={card} key={card}/>
    ))

    return (
        <>
            {deck ? <button onClick={drawCard}>Draw card</button> : null}
            <div className='CardList'>
                {cards}
            </div>
        </>
        
    )
}

export default CardList