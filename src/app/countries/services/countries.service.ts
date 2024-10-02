import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region-.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion:  { term: '', countries: [] }
  }

  constructor(private http: HttpClient) { }

  private getCountriesInformation(url: string): Observable<Country[]> {
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
    return this.getCountriesInformation(`capital/${term}`)
    .pipe(
      tap( countries => this.cacheStore.byCapital = { term, countries } )
    );
  }

  searchCountryName( country: string ): Observable<Country[]> {
    return this.getCountriesInformation(`name/${country}`)
    .pipe(
      tap(countries => this.cacheStore.byCountry = { term: country, countries })
    );
  }

  searchRegionCountries( region: Region ): Observable<Country[]> {
    return this.getCountriesInformation(`region/${region}`)
    .pipe(
      tap(countries => this.cacheStore.byRegion = { term: region, countries})
    );
  }

  searchCountryByAlphaCode( code: string): Observable<Country[]> {
    return this.getCountriesInformation(`alpha/${code}`);
  }
}
