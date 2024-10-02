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

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
   }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorage() {
    if(!localStorage.getItem('cacheStore')) return;
    const cacheStore: CacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
    this.cacheStore = cacheStore;
  }

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
      tap( countries => this.cacheStore.byCapital = { term, countries } ),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchCountryName( country: string ): Observable<Country[]> {
    return this.getCountriesInformation(`name/${country}`)
    .pipe(
      tap(countries => this.cacheStore.byCountry = { term: country, countries }),
      tap( () => this.saveToLocalStorage())
    );
  }

  searchRegionCountries( region: Region ): Observable<Country[]> {
    return this.getCountriesInformation(`region/${region}`)
    .pipe(
      tap(countries => this.cacheStore.byRegion = { term: region, countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountryByAlphaCode( code: string): Observable<Country[]> {
    return this.getCountriesInformation(`alpha/${code}`);
  }
}
