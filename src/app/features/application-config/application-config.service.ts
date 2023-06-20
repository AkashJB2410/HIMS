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
    const param = {
      "applicationId": data.applicationId,
      "keyname": data.keyname,
      "keyvalue": data.keyvalue,
      "is_Active": data.is_Active,
    };
    console.log(param);

    const url = "http://localhost:8081/api/v1/updateAppConfg/" + data.applicationId;
    return this.http.put<any>(url, param);
  }

  saveApplicationData(data: any): Observable<any> {
    console.log("save data" + data);
    const param = {
      "keyname": data.keyname,
      "keyvalue": data.keyvalue,
    };
    const url = "http://localhost:8081/api/v1/addAppConfig";
    return this.PostCall(url, param);
  }

  deleteApplicationData(applicationId: any) {
    const url = "http://localhost:8081/api/v1/deleteAppConfig/" + applicationId;
    console.log(applicationId);
    return this.http.delete<any>(url);
  }
  
  isActiveData(data: any) {
    const param = {
      "applicationId": data.applicationId
    }
    const url = "http://localhost:8081/api/v1/reactiveAppConfig/" + data.applicationId;
    console.log(data.applicationId);
    return this.PostCall(url, param);
  }
}
