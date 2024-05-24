function removeUnderscore(string: string) {
    return string.replace(/[-_]/g, ' ');
}

function toSentenceUpper(string: string) {
    const interim = string.replace(/[-_]/g, ' ');
    return interim.toUpperCase();
}

export { removeUnderscore, toSentenceUpper };

// import { isArray, isPlainObject } from '../assertions/assertions';
//
// const toLowerCaseFirstLetter = (string: string) => {
//     return string.charAt(0).toLowerCase() + string.slice(1);
// };

// const toUpperCaseFirstLetter = (string: string) => {
//     return string.charAt(0).toUpperCase() + string.slice(1);
// };
//
// const toCamelCase = (s: string) => {
//     const updated = s.replace(/([-_][a-z])/gi, ($1) => {
//         return $1.toUpperCase().replace('-', '').replace('_', '');
//     });
//
//     return toLowerCaseFirstLetter(updated);
// };

// const keysToCamel = (o: any) => {
//     if (isPlainObject(o)) {
//         const n = {};
//
//         Object.keys(o).forEach((k) => {
//             // @ts-ignore
//             n[toCamelCase(k)] = keysToCamel(o[k]);
//         });
//
//         return n;
//     }
//
//     if (isArray(o))
//         o.map((i: any) => {
//             return keysToCamel(i);
//         });
//
//     return o;
// };

// function toKebab(string: string) {
//     return string
//         .split('')
//         .map((letter) => {
//             if (/[A-Z]/.test(letter)) {
//                 return ` ${letter.toLowerCase()}`;
//             }
//
//             return letter;
//         })
//         .join('')
//         .trim();
// }

// function toSentence(string: string) {
//     const interim = toKebab(string).replace(/[-_]/g, ' ');
//     return interim.slice(0, 1).toUpperCase() + interim.slice(1);
// }

// function toSentenceUpper(string: string) {
//     const interim = toKebab(string).replace(/[-_]/g, '');
//     return interim.toUpperCase();
// }
