/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  httpConfiguration: object = {};
  constructor(private http: HttpClient) {}

  get<T>(url: string, config = this.httpConfiguration): Observable<T> {
    return this.http.get<T>(url, config).pipe(
      tap((data) => this.handleResponse(data)),
      map((data) => {
        // console.log('http get information: ', data);
        return data;
      })
    );
  }

  post<T>(
    url: string,
    data: any,
    config = this.httpConfiguration
  ): Observable<T> {
    return this.http.post<T>(url, data, config).pipe(
      tap((data) => this.handleResponse(data)),
      map((data) => {
        // console.log('http get information: ', data);
        return data;
      })
    );
  }

  delete(url: string, config = this.httpConfiguration): Observable<object> {
    return this.http
      .delete(url, config)
      .pipe(tap((data) => this.handleResponse(data)));
  }

  put<T>(
    url: string,
    data: any,
    config = this.httpConfiguration
  ): Observable<T> {
    return this.http.put<T>(url, data, config).pipe(
      tap((data) => this.handleResponse(data)),
      map((data) => {
        // console.log('http get information: ', data);
        return data;
      })
    );
  }

  handleResponse(response: any) {
    if (response.Status === 500) {
      alert('Something happened while trying to access the api!');
    }
  }
}
