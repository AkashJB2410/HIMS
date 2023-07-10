import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelfRegistrationService {

  
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllSelfRegData() {
    const url = "http://localhost:8081/api/v1/allAppConfig";
    return this.http.get<any>(url);
  }

  saveSelfRegData(data: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient/create";
    return this.PostCall(url, data);
  }

}
