"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation"

export const navigate = async(path: string) => {
    redirect(path)
}

export const refreshTag = async(tag: string) => {
    revalidateTag(tag)
}