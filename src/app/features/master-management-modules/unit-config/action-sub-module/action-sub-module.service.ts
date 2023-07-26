import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionSubModuleService {

  constructor(private http:HttpClient) { }

  getAllActionSubModule(){
    const url="http://localhost:8081/api/v1/allActionSubModuleMst";
    return this.http.get<any>(url);
  }

  PostCall(url:any , param:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, {headers})
  }

  addActionSubModule(sub_Module:any):Observable<any>{
    const param={
      "actionSubModuleName":sub_Module.actionSubModuleName
    };
    const url = "http://localhost:8081/api/v1/addActionSubModuleMst";
    return this.PostCall(url, param)
  }

  updateActionSubModule(sub_Module:any){
    const param={
      "actionSubModuleName":sub_Module.actionSubModuleName
    };
    const url = "http://localhost:8081/api/v1/updateActionSubModuleMst/"+sub_Module.asmId;
    return this.http.put<any>(url, param);
  }

  deleteActionSubModule(sub_Module:any){
    const url = "http://localhost:8081/api/v1/deleteActionSubModuleMst/"+sub_Module;
    return this.http.delete<any>(url);
  }

  reactiveActionSubModule(sub_Module:any){
    const url = "http://localhost:8081/api/v1/reactiveActionSubModuleMst/"+sub_Module.asmId;
    return this.http.post<any>(url, sub_Module)
  }
}
