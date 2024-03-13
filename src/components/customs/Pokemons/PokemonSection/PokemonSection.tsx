interface PokemonSectionProps extends React.PropsWithChildren, React.HTMLAttributes<HTMLElement> {

}

const PokemonSection = ({ children, ...props }: PokemonSectionProps) => {
    return (
        <section {...props}>
            <h1>Listes des Pokémons</h1>
            {children}
        </section>
    );
}

export default PokemonSection;