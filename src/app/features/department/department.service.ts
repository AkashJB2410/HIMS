import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }

  getAllDepartment(){
    const url="http://localhost:8080/api/v1/allMstDepartment";
    return this.http.get<any>(url);
  }

  PostCall(url:any , param:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, {headers})
  }

  addDepartment(department:any):Observable<any>{
    const param={
      "departmentName": department.departmentName
    };
    const url = "http://localhost:8080/api/v1/addMstDepartment";
    return this.PostCall(url, param)
  }

  updateDepartment(department:any){
    const param={
      "departmentName": department.departmentName
    };
    const url = "http://localhost:8080/api/v1/updateMstDepartment"+department.departmentId;
    return this.http.put<any>(url, param);
  }

  deleteDepartment(department:any){
    const url = "http://localhost:8080/api/v1/deleteMstDepartment"+department;
    return this.http.delete<any>(url);
  }

  reactiveDepartment(department:any){
    const url = "http://localhost:8080/api/v1/reactiveMstDepartment"+department.departmentId;
    return this.http.post<any>(url, department)
  }
}

