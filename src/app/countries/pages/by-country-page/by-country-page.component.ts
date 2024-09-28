import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean =  false;

  constructor(private countriesService: CountriesService) {}

  searchByCountry(country: string): void {
    country = country.trim();
    if(!country) return;
    this.isLoading = true;
    this.countriesService
      .searchCountryName(country)
      .subscribe((countriesResponse) => {
        this.countries = countriesResponse;
        this.isLoading = false;
      });
  }
}
