import TestForm from "../_components/TestForm";

interface PagePops {
    params: {
        username: string;
    };
}


const Page = ({ params }: PagePops) => {
    return (
        <main>
            <TestForm />
        </main>
    );
}

export default Page;
