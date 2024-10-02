import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region-.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Americas', 'Asia', 'Africa', 'Europe', 'Oceania'];
  public selectRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  searchByRegion(region: Region): void {
    if(!region) return;
    this.isLoading = true;
    this.selectRegion = region;
    this.countriesService
      .searchRegionCountries(region)
      .subscribe((countriesResponse) => {
        this.countries = countriesResponse
        this.isLoading = false;
      });
  }
}
