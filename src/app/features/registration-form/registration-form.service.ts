import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }
  //  
  GetAllRoleData() {
    const url = "http://localhost:8080/api/v1/allRoleData";
    return this.http.get<any>(url);
  }

  saveRoleData(data:any): Observable<any> {
    const param = {
      // "employee_Id": data.idInput,
      "role_Name":data.nameInput,
      "role_Description": data.descriptionInput
      // "employee_Mobile_No": data.mobileNoInput,
      // "employee_address": data.addressInput
    };
    
    const url = "http://localhost:8080/api/v1/addRole";
    return this.PostCall(url, param);
  }

  deleteRoleData(roleId:any){
    const url = "http://localhost:8080/api/v1/deleteRole/"+ roleId;
    return this.http.delete<any>(url);
  }

  updateRoleData(data:any){
    const param = {
      "role_Id": data.idInput,
      // "permissions": [],
      "role_Name":data.nameInput,
      "role_Description": data.descriptionInput
    };
    const url = "http://localhost:8080/api/v1/role/update";
    return this.http.put<any>(url,param);
  }

}