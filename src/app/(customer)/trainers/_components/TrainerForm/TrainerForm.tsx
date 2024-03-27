"use client";

import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { useUser } from "@/components/providers/UserContext";
import { createTrainer } from "@/libs/routes/trainer";
import { TrainerRequest, TrainerRequestSchema } from "@/libs/zod/trainer";
import { HTMLAttributes } from "react";
import { toast } from "sonner";

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
    token: string;
    defaultValues?: TrainerRequest;
}

const TrainerForm = ({ token, defaultValues, ...props}: TrainerFormProps) => {

    const onSubmit: GenerateFormProps['onSubmit'] = async (data) => {
        const registerData = data as TrainerRequest;
        const response = await createTrainer(registerData, token);
        
        if ("error" in response) {
            return toast.error(response.error);
        }

        toast.success("Trainer created");
    };

    const finalField = defaultValues ? 
        Object.keys(defaultValues).map((id, index) => {
            const key = id as keyof TrainerRequest;
            if (fields[key]) {
                const fieldDefaultValues = defaultValues[`${key}`];
                (fields as any)[key].defaultValue = (defaultValues[key]); 
            }
        }) : fields as { [key: string]: any };


    return (
        <div>
            <Form 
                {...props}
                fields={fields} 
                onSubmit={onSubmit} 
            />
        </div>
    );
};

export default TrainerForm;