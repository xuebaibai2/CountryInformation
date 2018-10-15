import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchBoxService } from '../Services/search-box.service';
import { Subscription } from 'rxjs/Subscription';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit, OnDestroy {

  historyUpdateSubscription: Subscription;
  searchedCountries: Country[];

  constructor(private searchBoxService: SearchBoxService) { }
   
  ngOnInit() {
    this.historyUpdateSubscription = this.searchBoxService.historyUpdated
    .subscribe(
      countries => this.searchedCountries = countries
    );
    this.searchedCountries = this.searchBoxService.searchedCountries;
  }

  onHistoryClicked(country: Country) {
    this.searchBoxService.countryUpdated.next(country);
    this.searchBoxService.updateSearchHistory(country);
  }

  ngOnDestroy() {
    this.historyUpdateSubscription.unsubscribe();
  }

}
