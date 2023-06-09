import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeStatusService {

  constructor(private http:HttpClient) { }

  getAllEmp(){
    const url="http://localhost:8081/api/v1/allMstEmployementStatus";
    return this.http.get<any>(url);
  }

  PostCall(url:any , param:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, {headers})
  }

  addEmp(emp:any):Observable<any>{
    const param={
      "esName": emp.esName
    };
    const url = "http://localhost:8081/api/v1/addMstEmployementStatus";
    return this.PostCall(url, param)
  }

  updateEmp(emp:any){
    const param={
      "esName": emp.esName
    };
    const url = "http://localhost:8081/api/v1/updateMstEmployementStatus/"+emp.esId;
    return this.http.put<any>(url, param);
  }

  deleteEmp(empId:any){
    const url = "http://localhost:8081/api/v1/deleteMstEmployementStatus/"+empId;
    return this.http.delete<any>(url);
  }

  reactiveEmp(emp:any){
    const url = "http://localhost:8081/api/v1/reactiveMstEmployementStatus/"+emp.esId;
    return this.http.post<any>(url, emp)
  }

}