"use client"

import useGetPokemons from "@/hooks/Pokemons/useGetPokemons";
import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";
import useGetPokemonTypes from "@/hooks/Pokemons/useGetPokemonTypes";
import PokemonSection from "./PokemonSection/PokemonSection";

const pokemonData = [
    {
        name: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        types: ["Electric"],
        backgroundColor: "yellow"
    },
    {
        name: "Charmander",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        types: ["Fire"],
        backgroundColor: "orange"
    },
    {
        name: "Squirtle",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        types: ["Water"],
        backgroundColor: "blue"
    },
    {
        name: "Bulbasaur",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        types: ["Grass"],
        backgroundColor: "green"
    },
    {
        name: "Jigglypuff",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
        types: ["Normal"],
        backgroundColor: "pink"
    },
    {
        name: "Gengar",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
        types: ["Ghost"],
        backgroundColor: "purple"
    }, 
    {
        name: "Gyarados",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
        types: ["Water", "Flying"],
        backgroundColor: "blue"
    },
    {
        name: "Dragonite",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
        types: ["Dragon", "Flying"],
        backgroundColor: "orange"
    },
    {
        name: "Mewtwo",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
        types: ["Psychic"], 
        backgroundColor: "purple"
    },
    {
        name: "Mew",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewthree",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewfour",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/153.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewfive",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewsix",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewseven",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Meweight",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/157.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewnine",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewten",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/159.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Meweleven",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewtwelve",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/161.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewthirteen",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/162.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    },
    {
        name: "Mewfourteen",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/163.png",
        types: ["Psychic"],
        backgroundColor: "pink"
    }
]

const Pokemon = () => {
    const {data, isLoading, isError} = useGetPokemons();
    const {data: types} = useGetPokemonTypes();


    if (isLoading) {
        return (
            <PokemonWrapper skeleton={true}/>
        )
    }

    if (isError) {
        return (
            <p>Error fetching pokemons</p>
        )
    }


    return (
        <PokemonWrapper pokemons={pokemonData}/>
    );
}

export default Pokemon;