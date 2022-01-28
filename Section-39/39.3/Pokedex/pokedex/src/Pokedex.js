import React from 'react';
import Pokecard from './Pokecard';
import './Pokedex.css';

const Pokedex = ({ pokemonArray }) => (
    <>
        <h1 className='Pokedex-header'>Pokedex</h1>
        <div className='Pokedex-card-container'>
            {pokemonArray.map(pkmn => (
                <Pokecard id={pkmn.id} name={pkmn.name} type={pkmn.type} exp={pkmn.exp} />
            ))}
        </div>
    </>
)


export default Pokedex;