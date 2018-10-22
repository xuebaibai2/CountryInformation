import { Country } from '../models/country.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import * as CONSTVALUE from '../shared/const-value';

@Injectable()
export class SearchBoxService {
    searchedCountries: Country[];
    historyUpdated = new Subject<Country[]>();
    countryUpdated = new Subject<Country>();
    allCountriesLoaded = new Subject<Country[]>();

    constructor(private http: HttpClient) {
        this.searchedCountries = [];
        this.loadAllCountries();
    }

    loadAllCountries() {
        return this.http.get<Country[]>(CONSTVALUE.URI_GET_ALL_COUNTIRES)
        .subscribe(
            countries => this.allCountriesLoaded.next(countries)
        );
    }
      
    updateSearchHistory(country: Country) {
        this.searchedCountries.forEach((value, index) => {
            if (value.alpha3Code.toLowerCase() === country.alpha3Code.toLowerCase()) {
                this.searchedCountries.splice(index, 1);
            }
        });
        this.searchedCountries.unshift(country);
        this.historyUpdated.next(this.searchedCountries);
    }
}
