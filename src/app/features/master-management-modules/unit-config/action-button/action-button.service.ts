import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionButtonService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }


  GetAllActionButtonData() {
    const url = "http://localhost:8081/api/v1/allActionButtonMst";
    return this.http.get<any>(url);
  }

  updateActionButtonData(data: any) {
    const param = {      
      "abName":data.actionButtonNameInput,
      "abId":data.actionButtonIdInput,
      "is_Active":data.isActive
    };
    const url = "http://localhost:8081/api/v1/updateActionButtonMst/"+data.actionButtonIdInput;
    return this.http.put<any>(url, param);
  }

  saveActionButtonData(data: any): Observable<any> {
    console.log("save data"+ data);
    const param = {
      "abName":data.actionButtonNameInput,     
    };
    const url = "http://localhost:8081/api/v1/addActionButtonMst";
    return this.PostCall(url, param);
  }

  deleteActionButtonData(actionIdInput: any) {
    const url = "http://localhost:8081/api/v1/deleteActionButtonMst/" + actionIdInput;
    return this.http.delete<any>(url);
  }

  isActiveData(data: any) {
    const param={
      "abId":data.abId
    }
    const url = "http://localhost:8081/api/v1/reactiveActionButtonMst/" + data.abId;
    console.log(data.abId);
    return this.PostCall(url,param);  
  }
}
