import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionModuleService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }


  GetAllActionModuleData() {
    const url = "http://localhost:8081/api/v1/allActionModule";
    return this.http.get<any>(url);
  }

  updateActionModuleData(data: any) {
    const param = {      
      "actionId":data.actionModuleIdInput,
      "actionModuleName":data.actionModuleNameInput,
    };
    console.log(param);
    
    const url = "http://localhost:8081/api/v1/updateActionModule/"+data.actionModuleIdInput;
    return this.http.put<any>(url, param);
  }

  saveActionModuleData(data: any): Observable<any> {
    console.log("save data"+ data);
    const param = {
      "actionModuleName":data.actionModuleNameInput,     
    };
    const url = "http://localhost:8081/api/v1/addActionModule";
    return this.PostCall(url, param);
  }

  deleteActionModuleData(actionId: any) {
    const url = "http://localhost:8081/api/v1/deleteActionModule/" + actionId;
    console.log(actionId);
    return this.http.delete<any>(url);    
  }

  isActiveData(data: any) {
    const param={
      "actionModuleId":data.actionModuleId
    }
    const url = "http://localhost:8081/api/v1/reactiveActionModule/" + data.actionModuleId;
    console.log(data.actionModuleId);
    return this.PostCall(url,param);  
  }
}
