export async function generateStaticParams() {
    const fakePokemons = [
        {
            name: "pikachu",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            description: "This is a pikachu",
            types: ["electric"]
        },
        {
            name: "charmander",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
            description: "This is a charmander",
            types: ["fire"]
        },
        {
            name: "squirtle",
            imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            description: "This is a squirtle",
            types: ["water"]
        }
    ]
    return fakePokemons.map((pokemon) => ({
        name: pokemon.name,
    }));
}


const Page = () => {
    return (
        <main>
            
        </main>
    )
}

export default Page;