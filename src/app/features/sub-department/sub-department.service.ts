import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubDepartmentService {

  constructor(private http:HttpClient) { }

  getAllSubDepartment(){
    const url="http://localhost:8081/api/v1/allsubDepartmentData";
    return this.http.get<any>(url);
  }

  
  getAllDepartment(){
    const url="http://localhost:8081/api/v1/allMstDepartment";
    return this.http.get<any>(url);
  }

  getAllMstSubDepartment() {
    const url = "http://localhost:8081/api/v1/MstSubDepartment";
    return this.http.get<any>(url);
  }

  PostCall(url:any , param:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, {headers})
  }

  addSubDepartment(department:any):Observable<any>{
    const param={
      "departmentName": department.departmentName
    };
    const url = "http://localhost:8081/api/v1/addsubDepartment";
    return this.PostCall(url, param)
  }

  updateSubDepartment(department:any){
    const param={
      "department": department.departmentName
    };
    const url = "http://localhost:8081/api/v1/subDepartment"+department.departmentId;
    return this.http.put<any>(url, param);
  }

  deleteSubDepartment(departmentId:any){
    const url = "http://localhost:8081/api/v1/subDepartment/"+departmentId;
    return this.http.delete<any>(url);
  }

  reactiveSubDepartment(department:any){
    const url = "http://localhost:8081/api/v1/reActive/"+department.departmentId;
    return this.http.post<any>(url, department)
  }
}