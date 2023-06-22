import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterPageService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllNotifications(){
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
