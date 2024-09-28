import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  
  constructor(private countriesService: CountriesService){}

  searchByCapital( term:string ) :void {
    term = term.trim();
    if(!term) return;
    
    this.isLoading = true
    this.countriesService.searchCapital(term)
    .subscribe( response => {
      this.countries = response;
      this.isLoading = false;
    });
  }

}
