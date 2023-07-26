import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubModuleService {
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllSubModuleData() {
    const url = "http://localhost:8080/api/v1/allSubModuleData";
    return this.http.get<any>(url);
  }

  GetAllMstModuleData() {
    const url = "http://localhost:8080/api/v1/allModuleData";
    return this.http.get<any>(url);
  }

  GetAllGroupModuleData() {
    const url = "http://localhost:8080/api/v1/allMstGroupData";
    return this.http.get<any>(url);
  }

  saveSubModuleData(data: any): Observable<any> {
    const param = {
      "label": data.labelInput,
      "icon": data.iconInput,      
      "routerLink": data.routerLinkInput,
      "sequence": data.sequenceInput,
      "mstGroup": {
        "groupId": data.selectInput[1],
        "mstModule":{
          "moduleId":data.selectInput[0]
        }
      }      
    };

    const url = "http://localhost:8080/api/v1/addSubModule";
    return this.PostCall(url, param);
  }

  deleteSubModule(idInput: any) {
    const url = "http://localhost:8080/api/v1/deleteSubModule/" + idInput;
    return this.http.delete<any>(url);
  }

  updateSubModule(data: any) {
    const param = {
      "subModuleId": data.idInput,  
      "label": data.labelInput,    
      "icon": data.iconInput,      
      "routerLink": data.routerLinkInput,
      "sequence": data.sequenceInput,
      "mstGroup": {
        "groupId": data.selectInput[1],
        "mstModule":{
          "moduleId":data.selectInput[0]
        }
      } 
    };
    const url = "http://localhost:8080/api/v1/updateSubmodule"+data.idInput;
    return this.http.put<any>(url, param);
  }

  isActiveData(data: any) {
    const param={
      "submodule_Id":data.submoduleId
    }
    const url = "http://localhost:8080/api/v1/reActiveSubModule/" + data.submoduleId;
    return this.PostCall(url,param);  
  }
}