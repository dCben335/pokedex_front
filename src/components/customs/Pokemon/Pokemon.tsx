import PokemonWrapper from "./PokemonWrapper/PokemonWrapper";


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
    }
]

const Pokemon = () => {
    return (
        <section>
            <h1>Pokemon</h1>
            <PokemonWrapper 
                pokemons={pokemonData}
            />
        </section>
    );
}

export default Pokemon;