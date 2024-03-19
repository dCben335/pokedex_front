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


export const firstLetterUppercase = (expression: string) => {
    return expression.charAt(0).toUpperCase() + expression.slice(1);
}

