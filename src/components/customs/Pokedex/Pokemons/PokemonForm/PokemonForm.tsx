"use client"

import { HTMLAttributes } from 'react';
import { PokemonPostRequest, pokemonPostRequestSchema, PokemonPutRequest, pokemonPutRequestSchema } from '@/libs/schemas/entities/pokemon';
import Form, { GenerateFormProps } from '@/components/customs/Form/Form';
import { toast } from 'sonner';
import { fillObjectWithKey, slugify } from '@/utils/reformat';
import { createPokemon, updatePokemon } from '@/libs/routes/entities/pokemon';
import styles from './PokemonForm.module.scss';
import { usePokemonTypesContext } from '@/components/providers/PokemonTypesContext';

const fields: GenerateFormProps['fields'] = {
    name : {
        label: "Name",
        type: "text",
        schema: pokemonPostRequestSchema.shape.name,
        placeholder: "Pikachu",
    },
    imgUrl : {
        label: "Image URL",
        type: "text",
        schema: pokemonPostRequestSchema.shape.imgUrl,
        placeholder: "https://example.com/image.jpg",
    },
    description: {
        label: "Description",
        type: "textarea",
        schema: pokemonPostRequestSchema.shape.description,
        placeholder: "Pikachu is an Electric-type Pokémon known for its yellow fur with brown stripes on its back. It has large, pointed ears with black tips and a small, lightning bolt-shaped tail. Pikachu's cheeks store electrical energy, which it uses to unleash powerful electric attacks such as Thunderbolt and Thunder. Despite its small size, Pikachu is courageous and fiercely loyal to its Trainer. It is often seen as the mascot of the Pokémon franchise and is beloved by trainers and fans alike",
    },
}


interface PokemonFormProps extends HTMLAttributes<HTMLDivElement> {
    token: string;
    pokemonId?: string;
    editMode?: boolean;
    defaultValues?: Omit<PokemonPutRequest, "id">;
};

const PokemonForm = ({ editMode, token, defaultValues, pokemonId, ...props }: PokemonFormProps) => {
    const { types } = usePokemonTypesContext();
    const typeOptions = types.map(({ name }) => ({ value: name, label: name }));

    const typeField = {
        type: "select",
        schema: pokemonPutRequestSchema.shape.typeOne,
        options: [...typeOptions, { value: "", label: "" }],
    } ;

    const fieldsWithTypes = {
        ...fields,
        typeOne: {
            label: "Type One",
            ...typeField
        },
        typeTwo: {
            label: "Type Two",
            ...typeField
        }
    };

    const handleSubmit = (requestFunction: any, successMessage: string) => async (data: any) => {
        const pokemonData = data as Omit<PokemonPutRequest, "id">;
        if (!pokemonData.typeOne) return toast.error("You must select a type");
        if (pokemonData.typeOne === pokemonData.typeTwo) return toast.error("The two types must be different");


        const pokemonRequestData = editMode ? {
            id: pokemonId,
            ...pokemonData,
        } : {
            name: pokemonData.name,
            imgUrl: pokemonData.imgUrl,
            description: pokemonData.description,
            types: [pokemonData.typeOne, pokemonData.typeTwo].filter(Boolean)
        }


        const response = await requestFunction(pokemonRequestData, token);
        if ("error" in response) {
            return toast.error(response.error);
        }

        const sluggifiedName = slugify(pokemonData.name);
        return toast.success(successMessage);
    };

    const onSubmitPOST: GenerateFormProps['onSubmit'] = handleSubmit(createPokemon, "Trainer created");
    const onSubmitPUT: GenerateFormProps['onSubmit'] = handleSubmit(updatePokemon, "Trainer updated");

    const finalFields = defaultValues !== undefined
        ? fillObjectWithKey(fieldsWithTypes, defaultValues, "defaultValue") as GenerateFormProps['fields']
        : fieldsWithTypes as GenerateFormProps['fields'];
    

    return (
        <div className={styles.container}>
            <h1 className={`${styles.title} h2`}>{editMode ? "Edit the Pokemon" : "Create the Pokemon"}</h1>
            <Form 
                {...props}
                fields={finalFields}
                onSubmit={editMode ? onSubmitPUT : onSubmitPOST}
            />
        </div>
    );
};

export default PokemonForm;