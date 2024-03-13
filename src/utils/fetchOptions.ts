export type urlParams = {
    [key: string]: string | number | boolean | undefined;
}

export const setUrlParams = (params: urlParams) => {
    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
        if (value) {
            urlParams.append(key, value.toString());
        }
    }

    return urlParams.toString();
}

