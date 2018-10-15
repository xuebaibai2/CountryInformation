import { Component, OnInit } from '@angular/core';
import { SearchBoxService } from '../Services/search-box.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-information',
  templateUrl: './country-information.component.html',
  styleUrls: ['./country-information.component.css']
})
export class CountryInformationComponent implements OnInit {

  selectedCountry: Country;
  
  constructor(private searchBoxService: SearchBoxService) {
    this.searchBoxService.countryUpdated
      .subscribe(
      country => this.selectedCountry = country
    );
  }

  ngOnInit() {
  }

}
