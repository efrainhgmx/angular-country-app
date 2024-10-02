import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit{
  public countries: Country[] = [];
  public isLoading: boolean =  false;
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term; 
  }

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
