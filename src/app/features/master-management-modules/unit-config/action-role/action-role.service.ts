import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionRoleService {
 
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }
  GetAllActionRoleData() {
    const url = "http://localhost:8081/api/v1/allActionRole";
    return this.http.get<any>(url);
  }
  GetAllMstRoleData() {
    const url = "http://localhost:8081/api/v1/allMstRole";
    return this.http.get<any>(url);
  }

  GetAllActionModuleData() {
    const url = "http://localhost:8081/api/v1/allActionModule";
    return this.http.get<any>(url);
  }
  GetAllActionSubModuleData() {
    const url = "http://localhost:8081/api/v1/allActionSubModuleMst";
    return this.http.get<any>(url);
  }

  saveActionRoleData(data: any): Observable<any> {
    const url = "http://localhost:8081/api/v1/addActionRole";
    return this.PostCall(url, data);
  }

  deleteActionRoleData(idInput: any) {
    const url = "http://localhost:8081/api/v1/deleteActionRole/" + idInput;
    return this.http.delete<any>(url);
  }

  updateActionRoleData(data: any) {
    const param = {
            "arId": data.idInput,
            "arRoleId": {
              "roleId": data.selectRole,
          "arRoleId_Name": data.arRoleId.roleName,

            },
            "arActionSubModuleMst": {
              "asmId": data.selectActionSubModule
            },
            "arAdd": data.addCheckbox[0],
            "arView": data.viewCheckbox[0],
            "arEdit": data.editCheckbox[0],
            "arDelete": data.deleteCheckbox[0],
            "arSearch": data.searchCheckbox[0],
            "arApprove": data.approveCheckbox[0],
    }
    const url = "http://localhost:8081/api/v1/updateActionRole/" + data.arId;
    return this.http.put<any>(url, param);
  }

  reactiveActionRole(data: any) {
    const url = "http://localhost:8081/api/v1/reactiveActionRole/" + data.arId;
    return this.http.post<any>(url, data);
  }
}

