import Button from "@/components/ui/Button/Button";

const Page = () => {
    return (
        <main>
            <Button renderAs="link" href="/admin/pokemons">
                Access to Pokemons
            </Button>
        </main>
    );
}

export default Page;