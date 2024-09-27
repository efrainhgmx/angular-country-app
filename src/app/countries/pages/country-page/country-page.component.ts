import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { map, switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit{

  public country!: Country;
   
  constructor( 
    private acivatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.acivatedRoute.params
    .pipe(
      //*switchMap recibe el valor anterior y regresa un nuevo observable
      switchMap( ({ id }) =>  this.countriesService.searchCountryByAlphaCode(id)),
      map( countries => countries.length > 0 ? countries[0] : null)
    )
    .subscribe( country => {
      if(!country) return this.router.navigateByUrl('');
      return this.country = country;
    })
  }
}
