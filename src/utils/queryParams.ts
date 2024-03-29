import { ReadonlyURLSearchParams } from "next/navigation";

export type UrlParams = {
    [key: string]: string | number | boolean | undefined;
}

type SearchParams = ReadonlyURLSearchParams | string;

export const getUrlParams = (urlParams: UrlParams) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(urlParams)) {
        if (value) {
            params.append(key, value.toString());
        }
    }

    return params.toString();
}


export const createQueryString = (searchParams: SearchParams, name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(name, value)

    return params.toString()
}


export const removeQueryString = (searchParams: SearchParams, name: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(name)

    return params.toString()
}

export const getUrlTypes = (searchParams: URLSearchParams) => {
    const typeOne = searchParams.get('typeOne')
    const typeTwo = searchParams.get('typeTwo')

    return {
        typeOne,
        typeTwo
    }
}
