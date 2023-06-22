import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationConfigService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllApplicationData() {
    const url = "http://localhost:8081/api/v1/allAppConfig";
    return this.http.get<any>(url);
  }

  updateApplicationData(data: any) {
    const url = "http://localhost:8081/api/v1/updateAppConfg/" + data.applicationId;
    return this.http.put<any>(url, data);
  }

  saveApplicationData(data: any): Observable<any> {
    const url = "http://localhost:8081/api/v1/addAppConfig";
    return this.PostCall(url, data);
  }

  deleteApplicationData(applicationId: any) {
    const url = "http://localhost:8081/api/v1/deleteAppConfig/" + applicationId;
    return this.http.delete<any>(url);
  }
  
  isActiveData(data: any) {
    const param = {
      "applicationId": data.applicationId
    }
    const url = "http://localhost:8081/api/v1/reactiveAppConfig/" + data.applicationId;
    return this.PostCall(url, param);
  }
}
