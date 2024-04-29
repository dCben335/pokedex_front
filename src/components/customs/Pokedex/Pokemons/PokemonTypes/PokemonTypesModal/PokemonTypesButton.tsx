import Button from "@/components/ui/Button/Button"

interface PokemonCategoryButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    name: string
    color: string
    isActive: boolean
    handleClick: (name: string) => void
    disabled?: boolean
}

const PokemonCategoryButton = ({ name, color, isActive, handleClick, disabled }: PokemonCategoryButtonProps) => {
    return (
        <Button 
            style={{
                background: isActive ? color : '',
                border: `1px solid ${color}`,
                filter: isActive ? 'brightness(1.1)' : 'brightness(0.75)',
                cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            onClick={() => handleClick(name)}
        
        >
            {name}
        </Button>
    )
}

export default PokemonCategoryButton