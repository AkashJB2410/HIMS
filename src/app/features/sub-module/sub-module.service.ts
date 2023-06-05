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

  saveSubModuleData(data: any): Observable<any> {
    const param = {
      "mstModules": {
        "module_Id": data.selectInput,
      },
      "icon": data.iconInput,
      "label": data.labelInput,
      "routerLink": data.routerLinkInput,
      // "sequence": data.sequenceInput
      
      // "module_Id":data.selectInput
    };

    const url = "http://localhost:8080/api/v1/addSubModule";
    return this.PostCall(url, param);
  }

  deleteSubModule(idInput: any) {
    const url = "http://localhost:8080/api/v1/subModule/" + idInput;
    return this.http.delete<any>(url);
  }

  updateSubModule(data: any) {
    const param = {
      "submodule_Id": data.idInput,
      "mstModules": {
        "module_Id": data.selectInput,
      },
      "icon": data.iconInput,
      "label": data.labelInput,
      "routerLink": data.routerLinkInput,
      "sequence": data.sequenceInput
    };
    const url = "http://localhost:8080/api/v1/subModule/update";
    return this.http.put<any>(url, param);
  }
}