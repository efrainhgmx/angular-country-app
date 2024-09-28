import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  searchByRegion(region: string): void {
    region = region.trim();
    if(!region) return;
    this.isLoading = true;
    this.countriesService
      .searchRegionCountries(region)
      .subscribe((countriesResponse) => {
        this.countries = countriesResponse
        this.isLoading = false;
      });
  }
}
