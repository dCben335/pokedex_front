"use client";

import { navigate, refreshTag } from "@/actions/navigate";
import Form, { GenerateFormProps } from "@/components/customs/Form/Form";
import { createTrainer, updateTrainer } from "@/libs/routes/entities/trainer";
import { TrainerRequest, trainerRequestSchema } from "@/libs/schemas/entities/trainer";
import { fillObjectWithKey } from "@/utils/reformat";
import { HTMLAttributes } from "react";
import { toast } from "sonner";
import styles from "./TrainerForm.module.scss";

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
        
        await refreshTag(`trainer-${username}`);
        await navigate(`/trainers/${username}`);
        return toast.success(successMessage);
    };

    const onSubmitPOST: GenerateFormProps['onSubmit'] = handleSubmit(createTrainer, "Trainer created");
    const onSubmitPUT: GenerateFormProps['onSubmit'] = handleSubmit(updateTrainer, "Trainer updated");

    const finalFields = defaultValues 
        ? fillObjectWithKey(fields, defaultValues, "defaultValue") as GenerateFormProps['fields']
        : fields;

    return (
        <div className={styles.form}>
            <h1 className={`${styles.title} h2`}>{editMode ? "Edit your Trainer" : "Create your Trainer"}</h1>
            <Form 
                {...props}
                fields={finalFields} 
                onSubmit={editMode ? onSubmitPUT : onSubmitPOST} 
            />
        </div>
    );
};

export default TrainerForm;