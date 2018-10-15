import { Currency } from './currency.model';
import { Language } from './language.model';
import { Translation } from './translation.model';
import { RegionalBloc } from './RegionalBloc.model';

export class Country {
        public name: string;
        public topLevelDomain: string[];
        public alpha2Code: string;
        public alpha3Code: string;
        public callingCodes: string[];
        public capital: string;
        public altSpellings: string[];
        public region: string;
        public subregion: string;
        public population: number;
        public latlng: number[];
        public demonym: string;
        public area: number;
        public gini: number;
        public timezones: string[];
        public borders: string[];
        public nativeName: string;
        public numericCode: string;
        public currencies: Currency[];
        public languages: Language[];
        public translations: Translation;
        public flag: string;
        public regionalBlocs: RegionalBloc[];
        public cioc: string;
    constructor(
        name: string,
        topLevelDomain: string[],
        alpha2Code: string,
        alpha3Code: string,
        callingCodes: string[],
        capital: string,
        altSpellings: string[],
        region: string,
        subregion: string,
        population: number,
        latlng: number[],
        demonym: string,
        area: number,
        gini: number,
        timezones: string[],
        borders: string[],
        nativeName: string,
        numericCode: string,
        currencies: Currency[],
        languages: Language[],
        translations: Translation,
        flag: string,
        regionalBlocs: RegionalBloc[],
        cioc: string
    ) {}
}
