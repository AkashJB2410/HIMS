import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  getAllSideNavData(){
    const url = "http://localhost:8080/api/v1/allSideNavFormData";
    return this.http.get<any>(url);
  }
  
  getAllNotifications(){
    const url = "http://localhost:8080/api/v1/allNotificationData";
    return this.http.get<any>(url);
  }
  countNotification(){
    const url = "http://localhost:8080/api/v1/countNotification";
    return this.http.get<any>(url);
  }
  
  readMsg(data:any){
    const param = {
      "id": data      
    };
    const url = "http://localhost:8080/api/v1/readNotification/"+data;
    return this.http.put<any>(url,param);
  }
}
