import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchBoxComponent } from './search-box/search-box.component';
import { CountryInformationComponent } from './country-information/country-information.component';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchBoxService } from './Services/search-box.service';


@NgModule({
  declarations: [
    AppComponent,
    SearchBoxComponent,
    CountryInformationComponent,
    SearchHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [SearchBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
