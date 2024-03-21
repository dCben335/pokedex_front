"use client";
import Button from "@/components/ui/Button/Button";
import { useEffect } from "react";

const Page = () => {

    
    const login = async () => {
        try {
            let username = 'a';
            let password = 'b';
            let auth = btoa(`${username}:${password}`);
            const url = `http://localhost:8080/api/users/login`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${auth}`
                }
            });
            
            if (!response.ok) {
                throw new Error("there is no user with this username and password");
            }

            console.log(response);
    

            return response.ok;
        }
        catch (error: any) {
            console.error(error);
            throw new Error(error);
        }
    }


    const handleClicked = async () => {
        const logged = await login();
        console.log(logged);
    }

    return (
        <main>
            <Button onClick={handleClicked}>
                Login
            </Button>
            <Button renderAs="link" href="/admin/pokemons">
                Access to Pokemons
            </Button>
        </main>
    );
}

export default Page;