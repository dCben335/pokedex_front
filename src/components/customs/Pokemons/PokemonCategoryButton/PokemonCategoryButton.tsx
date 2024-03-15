import Button from "@/components/ui/Button/Button"

interface PokemonCategoryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    name: string
    color: string
    isActive: boolean
    handleClick: (name: string) => void
}

const PokemonCategoryButton = ({ name, color, isActive, handleClick }: PokemonCategoryButtonProps) => {
    return (
        <Button 
            style={{
                background: isActive ? color : '',
                border: `1px solid ${color}`
            }}
            onClick={() => handleClick(name)}
        >
            {name}
        </Button>
    )
}

export default PokemonCategoryButton