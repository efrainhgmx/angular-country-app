import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  getCountriesInformation(url: string): Observable<Country[]> {
    /** 
     * ? El operador catchError es capaz de atrapar el error
     * ? del oberserver, al usar el operador of, regresamos 
     * ? una nueva instancía del observer con un nuevo valor
     * * En este caso, al haber un error genera un observer que regresa un 
     * * arreglo vacio = []
     */
    return this.http.get<Country[]>(`${this.apiUrl}/${url}`)
    .pipe(
      catchError(error => of([]))
    )
  }

  searchCapital( term: string ): Observable<Country[]> {
    return this.getCountriesInformation(`capital/${term}`);
  }

  searchCountryName( country: string ): Observable<Country[]> {
    return this.getCountriesInformation(`name/${country}`);
  }

  searchRegionCountries( region: string ): Observable<Country[]> {
    return this.getCountriesInformation(`region/${region}`);
  }

  searchCountryByAlphaCode( code: string): Observable<Country[]> {
    return this.getCountriesInformation(`alpha/${code}`);
  }
}
