"use client";

import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { handleResponse } from "@/libs/routes";
import { createTrainer, updateTrainer } from "@/libs/routes/trainer";
import { TrainerRequest, TrainerRequestSchema } from "@/libs/zod/trainer";
import { fillObjectWithKey } from "@/utils/reformat";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

const fields: GenerateFormProps['fields'] = {
    trainerName : {
        label: "Trainer Name",
        type: "text",
        schema: TrainerRequestSchema.shape.trainerName,
        placeholder: "Sacha",
    },
    imgUrl : {
        label: "Image URL",
        type: "text",
        schema: TrainerRequestSchema.shape.imgUrl,
        placeholder: "https://example.com/image.jpg",
    }
}


interface TrainerFormProps extends HTMLAttributes<HTMLFormElement> {
    username: string;
    editMode?: boolean;
    token: string;
    defaultValues?: TrainerRequest;
}

type RequestFunction = (data: TrainerRequest, token: string) => Promise<any>;

const TrainerForm = ({ username, editMode, token, defaultValues, ...props }: TrainerFormProps) => {

    const router = useRouter();

    const handleSubmit = (requestFunction: RequestFunction, successMessage: string) => async (data: any) => {
        const registerData = data as TrainerRequest;
        const response = await requestFunction(registerData, token);
        const isSuccessful = handleResponse(response, successMessage);
    
        if (isSuccessful) {
            router.push(`/trainers/${username}`);
        }
    };

    const onSubmitPOST: GenerateFormProps['onSubmit'] = handleSubmit(createTrainer, "Trainer created");
    const onSubmitPUT: GenerateFormProps['onSubmit'] = handleSubmit(updateTrainer, "Trainer updated");

    const finalFields = defaultValues 
        ? fillObjectWithKey(fields, defaultValues, "defaultValue") as GenerateFormProps['fields']
        : fields;

    return (
        <div>
            <Form 
                {...props}
                fields={finalFields} 
                onSubmit={editMode ? onSubmitPUT : onSubmitPOST} 
            />
        </div>
    );
};

export default TrainerForm;