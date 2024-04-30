"use client";

import { navigate, refreshTags } from "@/actions/navigate";
import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { createTrainer, updateTrainer } from "@/libs/routes/entities/trainer";
import { TrainerRequest, trainerRequestSchema } from "@/libs/schemas/trainer";
import { fillObjectWithKey } from "@/utils/reformat";
import { HTMLAttributes } from "react";
import { toast } from "sonner";

const fields: GenerateFormProps['fields'] = {
    trainerName : {
        label: "Trainer Name",
        type: "text",
        schema: trainerRequestSchema.shape.trainerName,
        placeholder: "Sacha",
    },
    imgUrl : {
        label: "Image URL",
        type: "text",
        schema: trainerRequestSchema.shape.imgUrl,
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

    const handleSubmit = (requestFunction: RequestFunction, successMessage: string) => async (data: any) => {
        const registerData = data as TrainerRequest;
        const response = await requestFunction(registerData, token);
        if ("error" in response) {
            return toast.error(response.error);
        }
    
        await refreshTags(`trainer-${username}`);
        await navigate(`/trainers/${username}`);
        return toast.success(successMessage);
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