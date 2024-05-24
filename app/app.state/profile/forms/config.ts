import type { SelectorOption } from '@components/ui';
import type { ProfileFormFields, LanguageOptionKey } from '../types/User.types';

const GENDER_OPTIONS: SelectorOption<ProfileFormFields['gender']>[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'diverse' },
];

const BLOODTYPE_OPTIONS: SelectorOption<ProfileFormFields['bloodtype']>[] = [
    { label: '', value: null },
    { label: 'A+', value: 'A+' },
    { label: 'B+', value: 'B+' },
    { label: 'A-', value: 'A-' },
    { label: 'B-', value: 'B-' },
    { label: 'AB-', value: 'AB-' },
    { label: 'AB+', value: 'AB+' },
    { label: '0+', value: '0+' },
    { label: '0-', value: '0-' },
];

const START_YEAR = 1910;

const BIRTHDAY_OPTIONS = new Array(new Date().getFullYear() - START_YEAR + 1)
    .fill(0)
    .map((_, i) => ({ value: (START_YEAR + i).toString(), label: `${START_YEAR + i}` }))
    .reverse();

const LANGUAGE_OPTIONS: SelectorOption<LanguageOptionKey>[] = [
    { label: 'English', value: 'english' },
];

const SELECTOR_OPTIONS = {
    GENDER: GENDER_OPTIONS,
    BLOODTYPE: BLOODTYPE_OPTIONS,
    BIRTHDAY: BIRTHDAY_OPTIONS,
    LANGUAGE: LANGUAGE_OPTIONS,
};

export { SELECTOR_OPTIONS };
