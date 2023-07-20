import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleManagementService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }
  //  
  GetAllRoleData() {
    const url = "http://localhost:8081/api/v1/allMstRole";
    return this.http.get<any>(url);
  }

  saveRoleData(data:any): Observable<any> {
    const param = {
      "roleName": data.roleName,
      "roleDescription": data.roleDescription
    };
    
    const url = "http://localhost:8081/api/v1/addMstRole";
    return this.PostCall(url, param);
  }

  deleteRoleData(role:any){
    const url = "http://localhost:8081/api/v1/deleteMstRole/"+ role.roleId;
    return this.http.delete<any>(url);
  }

  updateRoleData(data:any){
    const param = {
      "roleName": data.roleName,
      "roleDescription": data.roleDescription
    };
    const url = "http://localhost:8081/api/v1/updateMstRole/"+data.roleId;
    return this.http.put<any>(url,param);
  }

  reactiveRole(data:any){
    const url = "http://localhost:8081/api/v1/reactiveMstRole/"+data.roleId;
    return this.http.post<any>(url, data)
  }

}