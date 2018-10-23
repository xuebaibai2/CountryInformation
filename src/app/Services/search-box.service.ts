import { Country } from '../models/country.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import * as CONSTVALUE from '../shared/const-value';

@Injectable()
export class SearchBoxService {
    searchedCountries: Country[];
    historyUpdated$ = new Subject<Country[]>();
    countryUpdated$ = new Subject<Country>();


    constructor(private http: HttpClient) {
        this.searchedCountries = [];
    }

    getCountriesByName(name: string) {
        return this.http.get<Country[]>(CONSTVALUE.URI_GET_BY_NAME + name).map(
            (countries: Country[]) => {
                const resultCountries: Country[] = [];
                for (let i = 0; i < countries.length; i++) {
                    if (countries[i].name.toLowerCase().startsWith(name.toLowerCase())) {
                        resultCountries.push(countries[i]);
                    }
                }
                return resultCountries;
            }
        )
        .catch(
            (err) => {
                return [];
            }
        );
    }

    getCountriesByCode(code: string) {
        return this.http.get<Country>(CONSTVALUE.URI_GET_BY_CODE + code).map(
            (country: Country) => {
                return [country];
            }
        ).catch(
            (err) => {
                return [];
            }
        );
    }
      
    updateSearchHistory(country: Country) {
        this.searchedCountries.forEach((value, index) => {
            if (value.alpha3Code.toLowerCase() === country.alpha3Code.toLowerCase()) {
                this.searchedCountries.splice(index, 1);
            }
        });
        this.searchedCountries.unshift(country);
        this.historyUpdated$.next(this.searchedCountries);
    }
}
