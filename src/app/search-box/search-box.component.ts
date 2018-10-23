import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.model';
import * as CONSTVALUE from '../shared/const-value';
import { SearchBoxService } from '../Services/search-box.service';

import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  foundResult = false;
  countries: Country[] = [];
  countries$: Observable<Country[]>;
  maxDisplayAmt = 1;

  @ViewChild('searchBox')
  searchBox: ElementRef;

  constructor(private http: HttpClient, private searchBoxService: SearchBoxService) {}

  ngOnInit() {
    // Register keyup susbcription on the search box input element
    fromEvent(this.searchBox.nativeElement, 'keyup')
    .map( (x: HTMLInputElement) => {
      return x.target.value;
    })
    .debounceTime(500)
    .subscribe(inputText => {
      this.resetSearchResult();
      this.requestAPI(inputText);
    });
  }

  onTypeHeadClicked(country: Country) {
    this.resetSearchResult();

    this.searchBoxService.countryUpdated$.next(country);
    this.searchBoxService.updateSearchHistory(country);
  }
  
  requestAPI(value: string) {
    if (value.length >= CONSTVALUE.SELECT_BOX_MIN_LENGTH) {
      this.countries$ = this.searchBoxService.getCountriesByName(value).merge(
        this.searchBoxService.getCountriesByCode(value)
      );
      this.foundResult = true;
      this.loadCountries();
    }
  }

  loadCountries() {
    this.countries$
    .subscribe(
      (countries: Country[]) => {
        this.sortCountries(countries);
        for (const country of countries) {
          if (this.maxDisplayAmt <= CONSTVALUE.MAX_TYPE_HEAD_DISPLAY_AMOUNT &&
            !this.isDuplicatedCountry(country)) {
            this.countries.push(country);
            this.maxDisplayAmt++;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  isDuplicatedCountry(country: Country) {
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].alpha3Code === country.alpha3Code) {
        return true;
      }
    }
    return false;
  }

  sortCountries(countries: Country[]) {
    countries.sort(
      (a: Country, b: Country) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
    );
  }
  
  resetSearchResult() {
    this.foundResult = false;
    this.countries = [];
    this.maxDisplayAmt = 1;
  }

}
