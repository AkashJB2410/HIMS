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
    const url = "http://localhost:8080/api/v1/allActionRole";
    return this.http.get<any>(url);
  }
  GetAllMstRoleData() {
    const url = "http://localhost:8080/api/v1/allMstRole";
    return this.http.get<any>(url);
  }

  GetAllActionModuleData() {
    const url = "http://localhost:8080/api/v1/allActionModule";
    return this.http.get<any>(url);
  }
  GetAllActionSubModuleData() {
    const url = "http://localhost:8080/api/v1/allActionSubModuleMst";
    return this.http.get<any>(url);
  }

  saveActionRoleData(data: any): Observable<any> {
  //   {
        
  //     "arActionSubModuleMst": {
  //         "asmId": "1"
         
  //     },
  //     "arRoleId": {
  //         "roleId": "1"
  //     },
     
  //     "arAdd": true,
  //     "arView": true,
  //     "arEdit": true,
  //     "arDelete": true,
  //     "arSearch": true,
  //     "arApprove": true
  // }
    // const param = {
    //   // "arId": data.idInput,
    //   "arActionSubModuleMst": {
    //     "asmId": data.selectActionSubModule
    //   },
    //   "arRoleId": {
    //     "roleId": data.selectRole
    //   },
    //   "arAdd": data.addCheckbox[0],
    //   "arView": data.viewCheckbox[0],
    //   "arEdit": data.editCheckbox[0],
    //   "arDelete": data.deleteCheckbox[0],
    //   "arSearch": data.searchCheckbox[0],
    //   "arApprove": data.approveCheckbox[0],
      
     
    // };
    const url = "http://localhost:8080/api/v1/addActionRole";
    return this.PostCall(url, data);
  }

  deleteActionRoleData(idInput: any) {
    const url = "http://localhost:8080/api/v1/deleteActionRole/" + idInput;
    return this.http.delete<any>(url);
  }

  updateActionRoleData(data: any) {
    const param = {
            "arId": data.idInput,
            "arActionSubModuleMst": {
              "asmId": data.selectActionSubModule
            },
            "arRoleId": {
              "roleId": data.selectRole
            },
            "arAdd": data.addCheckbox[0],
            "arView": data.viewCheckbox[0],
            "arEdit": data.editCheckbox[0],
            "arDelete": data.deleteCheckbox[0],
            "arSearch": data.searchCheckbox[0],
            "arApprove": data.approveCheckbox[0],
    }
    const url = "http://localhost:4200/api/v1/updateActionRole/";
    return this.http.put<any>(url, param);
  }
}

