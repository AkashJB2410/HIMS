import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestServiceService {
  // baseApiPath: any = webapi;

  constructor(private http: HttpClient, private router: Router) { }

  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return headers;
  }

  get(url: string, urlParams?: HttpParams): Observable<any> {
    return this.http.get(url, { headers: this.getHeaders(), params: urlParams });
  }

  post(url: string, body: object): Observable<any> {
    return this.http.post( url, JSON.stringify(body), { headers: this.getHeaders() });
  }


}
