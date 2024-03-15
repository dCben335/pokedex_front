"use client"

import useGetPokemons from "@/hooks/Pokemons/useGetPokemons";
import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";
import { toast } from "sonner";

const pokemonData = [
    {
        name: "Pikachu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
        types: ["Electric"],
        backgroundColor: "#F8D030"
    },
    {
        name: "Charmander",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        types: ["Fire"],
        backgroundColor: "#F08030"
    },
    {
        name: "Squirtle",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        types: ["Water"],
        backgroundColor: "#6890F0"
    },
    {
        name: "Bulbasaur",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        types: ["Grass"],
        backgroundColor: "#78C850"
    },
    {
        name: "Jigglypuff",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
        types: ["Normal"],
        backgroundColor: "#A8A878"
    },
    {
        name: "Gengar",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
        types: ["Ghost"],
        backgroundColor: "#705898"
    },
    {
        name: "Gyarados",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
        types: ["Water", "Flying"],
        backgroundColor: "#6890F0"
    },
    {
        name: "Dragonite",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
        types: ["Dragon", "Flying"],
        backgroundColor: "#7038F8"
    },
    {
        name: "Mewtwo",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mew",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewthree",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewfour",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/153.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewfive",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewsix",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewseven",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Meweight",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/157.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewnine",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewten",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/159.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Meweleven",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewtwelve",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/161.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewthirteen",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/162.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewfourteen",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/163.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mewfifteen",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/164.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Venusaur",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
        types: ["Grass", "Poison"],
        backgroundColor: "#78C850"
    },
    {
        name: "Blastoise",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
        types: ["Water"],
        backgroundColor: "#6890F0"
    },
    {
        name: "Butterfree",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
        types: ["Bug", "Flying"],
        backgroundColor: "#A8B820"
    },
    {
        name: "Beedrill",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
        types: ["Bug", "Poison"],
        backgroundColor: "#A8B820"
    },
    {
        name: "Pidgeot",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
        types: ["Normal", "Flying"],
        backgroundColor: "#A8A878"
    },
    {
        name: "Raichu",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
        types: ["Electric"],
        backgroundColor: "#F8D030"
    },
    {
        name: "Nidoqueen",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
        types: ["Poison", "Ground"],
        backgroundColor: "#A040A0"
    },
    {
        name: "Arcanine",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
        types: ["Fire"],
        backgroundColor: "#F08030"
    },
    {
        name: "Poliwrath",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png",
        types: ["Water", "Fighting"],
        backgroundColor: "#6890F0"
    },
    {
        name: "Alakazam",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Machamp",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png",
        types: ["Fighting"],
        backgroundColor: "#C03028"
    },
    {
        name: "Golem",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/76.png",
        types: ["Rock", "Ground"],
        backgroundColor: "#B8A038"
    },
    {
        name: "Slowbro",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png",
        types: ["Water", "Psychic"],
        backgroundColor: "#6890F0"
    },
    {
        name: "Gengar",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
        types: ["Ghost", "Poison"],
        backgroundColor: "#705898"
    },
    {
        name: "Kangaskhan",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png",
        types: ["Normal"],
        backgroundColor: "#A8A878"
    },
    {
        name: "Gyarados",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
        types: ["Water", "Flying"],
        backgroundColor: "#6890F0"
    },
    {
        name: "Lapras",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
        types: ["Water", "Ice"],
        backgroundColor: "#6890F0"
    },
    {
        name: "Snorlax",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
        types: ["Normal"],
        backgroundColor: "#A8A878"
    },
    {
        name: "Articuno",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png",
        types: ["Ice", "Flying"],
        backgroundColor: "#98D8D8"
    },
    {
        name: "Zapdos",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png",
        types: ["Electric", "Flying"],
        backgroundColor: "#F8D030"
    },
    {
        name: "Moltres",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png",
        types: ["Fire", "Flying"],
        backgroundColor: "#F08030"
    },
    {
        name: "Dragonite",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
        types: ["Dragon", "Flying"],
        backgroundColor: "#7038F8"
    },
    {
        name: "Mewtwo",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Mew",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
        types: ["Psychic"],
        backgroundColor: "#F85888"
    },
    {
        name: "Meltan",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/808.png",
        types: ["Steel"],
        backgroundColor: "#B8B8D0"
    }
];


const Pokemons = () => {
    const {data, isLoading, isError} = useGetPokemons();

    if (isLoading) {
        return (
            <>
                <PokemonWrapper skeleton={true}/>
            </>
        )
    }

    if (isError) {
        toast.error("Error fetching pokemons");
        return (
            <></>
        )
    }

    return (
        <>
            <PokemonWrapper pokemons={pokemonData}/>
        </>
    );
}

export default Pokemons;