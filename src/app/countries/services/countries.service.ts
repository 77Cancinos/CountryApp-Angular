import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1";

  constructor(private httpClient: HttpClient) { }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );

  }

  searchCapital(tern: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${tern}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(error => {
          console.log(error);
          //of crea un observable nuevo, en este caso al haber error en la petición regresa un arreglo vacío
          return of([]);
        })
      );

  }

  searchCountry(tern: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${tern}?fullText=false`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );

  }

  searchRegion(region: string): Observable<Country[]> {

    const url = `${this.apiUrl}/region/${region}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );

  }

}
