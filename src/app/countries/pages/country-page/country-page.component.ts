import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit{

  constructor( 
    private acivatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.acivatedRoute.params
    .pipe(
      switchMap( ({ id }) =>  this.countriesService.searchCountryByAlphaCode(id)),
      map( countries => countries.length > 0 ? countries[0] : null)
    )
    .subscribe( country => {
      if(!country) {
        return this.router.navigateByUrl('');
      } else {
        return;
      }
    })
  }
}
