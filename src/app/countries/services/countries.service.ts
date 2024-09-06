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

  searcCapital( term: string ): Observable<Country[]> {
    /** 
     * ? El operador catchError es capaz de atrapar el error
     * ? del oberserver, al usar el operador of, regresamos 
     * ? una nueva instancía del observer con un nuevo valor
     * * En este caso, al haber un error genera un observer que regresa un 
     * * arreglo vacio = []
     */
    return this.http.get<Country[]>(`${this.apiUrl}/capital/${term}`)
    .pipe(
      catchError( error => of([]))
    );
  }

  searchCountryName( country: string ): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/name/${country}`)
    .pipe(
      catchError(error => of([]))
    )
  }

  searchRegionCountries( region: string ): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/region/${region}`)
    .pipe(
      catchError(error => of([]))
    )
  }
}
