import { ReadonlyURLSearchParams } from "next/navigation";

export type urlParams = {
    [key: string]: string | number | boolean | undefined;
}


export const getUrlParams = (urlParams: urlParams) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(urlParams)) {
        if (value) {
            params.append(key, value.toString());
        }
    }

    return params.toString();
}


export const createQueryString = (searchParams: ReadonlyURLSearchParams, name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
}


export const removeQueryString = (searchParams: ReadonlyURLSearchParams, name: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(name)

    return params.toString()
}
