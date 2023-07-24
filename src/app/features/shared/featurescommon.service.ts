import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import URL from './URL.json'

@Injectable({
  providedIn: 'root'
})
export class FeaturescommonService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  getData(API: any) {
    const url = URL.LOCALHOST + API + URL.PAGELIST;
    return this.http.get<any>(url);
  }

  addData(DATA: any, API: any) {
    const url = URL.LOCALHOST + API;
    return this.PostCall(url, DATA);
  }

  updateData(DATA: any, API: any) {
    const url = URL.LOCALHOST + API;
    return this.http.put<any>(url, DATA);
  }

  deleteData(API: any, MASTERID: any) {
    const url = URL.LOCALHOST + API + "/" + MASTERID;
    return this.http.delete<any>(url);
  }

  reactiveData(API: any, DATA: any, MASTERID: any) {
    const url = URL.LOCALHOST + API + "/" + MASTERID;
    return this.http.post<any>(url, DATA)
  }
}
