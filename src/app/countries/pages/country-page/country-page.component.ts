import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html'
})
export class CountryPageComponent implements OnInit{

  constructor( 
    private acivatedRoute: ActivatedRoute,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.acivatedRoute.params
    .subscribe(({ id }) => {
      this.countriesService.searchCountryByAlphaCode(id)
      .subscribe(console.log)
    })
  }
}
