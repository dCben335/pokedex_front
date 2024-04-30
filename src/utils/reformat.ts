interface NonAsciiMap {
    [key: string]: string | RegExp;
}

const non_asciis: NonAsciiMap = {
    'a': '[àáâãäå]',
    'ae': 'æ',
    'c': 'ç',
    'e': '[èéêë]',
    'i': '[ìíîï]',
    'n': 'ñ',
    'o': '[òóôõö]',
    'oe': 'œ',
    'u': '[ùúûűü]',
    'y': '[ýÿ]'
};

export const accentsTidy = (expression: string) => {
    let lower = expression.toLowerCase();

    for (let i in non_asciis) {
        lower = lower.replace(new RegExp(non_asciis[i], 'g'), i)
    }
    
    return lower;
};

export const slugify = (expression: string) => {
    return accentsTidy(expression).replace(/[^a-z0-9-]+/g, '_').replace(/^-+|-+$/g, '');

}

export const unslugify = (expression: string) => {
    return expression.replace(/_/g, ' ');
}

export const firstLetterUppercase = (expression: string) => {
    return expression.charAt(0).toUpperCase() + expression.slice(1);
}

export const firstLetterOfEachWordUppercase = (expression: string) => {
    return expression
        .split("-").map(word => firstLetterUppercase(word)).join('-')
        .split(' ').map(word => firstLetterUppercase(word)).join(' ');
}


export interface DynamicObject {
    [key: string]: any;
}


export function createArrayOfObjects(data: DynamicObject) {
    const results: DynamicObject = {};

    for (const key in data) {
        const [prefix, indexStr, propertyType] = key.split('-');

        if (prefix && indexStr && propertyType) {
            const index = parseInt(indexStr); 
            if (isNaN(index)) continue;
            if (!results[prefix]) results[prefix] = [];
            if (!results[prefix][index]) results[prefix][index] = {};
            

            if (!results[prefix][index].hasOwnProperty(propertyType)) {
                results[prefix][index][propertyType] = data[key];
                continue;
            }  

            if (!Array.isArray(results[prefix][index][propertyType])) {
                results[prefix][index][propertyType] = [results[prefix][index][propertyType]];
            }
            results[prefix][index][propertyType].push(data[key]);
        } else {
            results[key] = data[key];
        }
    }

    return results;
}

export interface ObjectsInObject {
    [key: string]: {
        [key: string]: any;
    };
}

interface ObjectsInObjectDefaults {
    [key: keyof ObjectsInObject]: any;
}


export const fillObjectWithKey = (fields: ObjectsInObject, defaultValues: ObjectsInObjectDefaults, key: string) => {
    for (const id in defaultValues) {
        if (defaultValues.hasOwnProperty(id) && fields.hasOwnProperty(id)) {
            fields[id][key] = defaultValues[id];
        }
    }
    return fields;
}
