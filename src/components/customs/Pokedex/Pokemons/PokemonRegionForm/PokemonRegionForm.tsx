"use client";

import Form, { GenerateFormProps } from '@/components/customs/Form/Form';
import { PokemonRegionRequest, pokemonRegionRequestSchema, pokemonRegionSchema, PokemonType } from '@/libs/schemas/entities/pokemon';
import styles from './PokemonRegionForm.module.scss';
import { createPokemonRegion } from '@/libs/routes/entities/pokemon';
import { toast } from 'sonner';
import { slugify } from '@/utils/reformat';

type PokemonRegionFormProps = {
    pokemonName: string,
    token: string,
    currentRegionName: string[],
}

const fields: GenerateFormProps['fields'] = {
    regionName: {
        label: 'Region Name',
        type: 'select',
        options: [
            { label: 'Kanto', value: 'Kanto' },
            { label: 'Johto', value: 'Johto' },
            { label: 'Hoenn', value: 'Hoenn' },
            { label: 'Sinnoh', value: 'Sinnoh' },
            { label: 'Unova', value: 'Unova' },
            { label: 'Kalos', value: 'Kalos' },
            { label: 'Alola', value: 'Alola' },
            { label: 'Galar', value: 'Galar' },
        ],
        schema: pokemonRegionRequestSchema.shape.region.shape.regionName
    },
    regionPokedexNumber: {
        label: 'Region Pokedex Number',
        type: 'number',
        schema: pokemonRegionRequestSchema.shape.region.shape.regionPokedexNumber,
        placeholder: "5",
    },
}

const options = [
    { label: 'Kanto', value: 'Kanto' },
    { label: 'Johto', value: 'Johto' },
    { label: 'Hoenn', value: 'Hoenn' },
    { label: 'Sinnoh', value: 'Sinnoh' },
    { label: 'Unova', value: 'Unova' },
    { label: 'Kalos', value: 'Kalos' },
    { label: 'Alola', value: 'Alola' },
    { label: 'Galar', value: 'Galar' },
]

const PokemonRegionForm = ({ token, pokemonName, currentRegionName } : PokemonRegionFormProps) => {

    const finalFields = {
        regionName: {
            ...fields.regionName,
            options: options.filter((option) => !currentRegionName.includes(option.value)),
        },
        regionPokedexNumber: fields.regionPokedexNumber,
    }

    const handleSubmit: GenerateFormProps["onSubmit"] = async(data) => {
        const regionData = {
            name: pokemonName,
            region : {
                regionName: data.regionName,
                regionPokedexNumber: data.regionPokedexNumber
            }
        } as PokemonRegionRequest;
        
        

        const response = await createPokemonRegion(regionData, token);
        if ("error" in response) {
            return toast.error(response.error);
        }
        
        toast.success(`Region ${data.regionName} is successfully added to ${pokemonName}`);
    }

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} h2`}>Add Region</h1>
            <Form fields={finalFields} onSubmit={handleSubmit} /> 
        </div>
    );
};

export default PokemonRegionForm;