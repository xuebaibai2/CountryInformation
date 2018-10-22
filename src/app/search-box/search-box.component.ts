import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../models/country.model';
import * as CONSTVALUE from '../shared/const-value';
import { SearchBoxService } from '../Services/search-box.service';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  foundResult = false;
  countries: Country[] = [];
  maxDisplayAmt = 1;
  allCountryList: Country[] = [];

  constructor(private http: HttpClient, private searchBoxService: SearchBoxService) {}

  ngOnInit() {
    this.searchBoxService.allCountriesLoaded
    .subscribe(
      countries => this.allCountryList = countries
    );
  }

  onKeyUp(value: string) {
    this.resetSearchResult();

    if (value.length >= CONSTVALUE.SELECT_BOX_MIN_LENGTH) {
      this.allCountryList.map(
        (country) => {
          if (this.maxDisplayAmt <= CONSTVALUE.MAX_TYPE_HEAD_DISPLAY_AMOUNT &&
            (country.name.toLowerCase().startsWith(value.toLowerCase()) ||
            country.alpha3Code.toLowerCase() === value.toLowerCase())) {
            this.maxDisplayAmt++;
            this.foundResult = true;
            this.countries.push(country);
          }
        }
      );
    }
  }

  onTypeHeadClicked(country: Country) {
    this.resetSearchResult();

    this.searchBoxService.countryUpdated.next(country);
    this.searchBoxService.updateSearchHistory(country);
  }

  resetSearchResult() {
    this.foundResult = false;
    this.countries = [];
    this.maxDisplayAmt = 1;
  }

}
