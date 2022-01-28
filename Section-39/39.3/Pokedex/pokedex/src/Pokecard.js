import React from 'react';
import './Pokecard.css'

const Pokecard = ({ id, name, type, exp }) => (
    <>
        <h2 className='Pokecard-title'>{name}</h2>
        <img className='Pokecard-img' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
        <h5 className='Pokecard-type'>Type: {type}</h5>
        <h5 className='Pokecard-exp'>EXP: {exp}</h5>
    </>
)


export default Pokecard;