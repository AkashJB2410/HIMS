import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperSpecialityService {

  constructor(private http:HttpClient) { }

  getAllSuperSpeciality(){
    const url="http://localhost:8083/mstSuperSpeciality/list?page=0&size=10";
    return this.http.get<any>(url);
  }

  PostCall(url:any , param:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, {headers})
  }

  addSuperSpeciality(speciality:any):Observable<any>{
    const param={
      "ssSpecialityId":speciality.ssSpecialityId,
      "ssName": speciality.ssName
    };
    const url="http://localhost:8083/addMstSuperSpeciality/list?page=0&size=10";

    // const url = "http://localhost:8083/api/v1/addMstSuperSpeciality/";
    return this.PostCall(url, param)
  }

  updateSuperSpeciality(speciality:any){
    const param={
      "ssId":speciality.ssId,
      "ssName": speciality.ssName
    };
    const url="http://localhost:8083/updateMstSuperSpeciality/list?page=0&size=10" + speciality.ssId;

    // const url = "http://localhost:8083/api/v1/updateMstSuperSpeciality/"+ speciality.ssId;
    return this.http.put<any>(url, param);
  }

  deleteSuperSpeciality(ssId:any){
    // const url = "http://localhost:8083/api/v1/deleteMstSuperSpeciality/"+ssId;
    const url="http://localhost:8083/deleteMstSuperSpeciality/list?page=0&size=10" +ssId;

    return this.http.delete<any>(url);
  }

  reactiveSuperSpeciality(speciality:any){
    // const url = "http://localhost:8083/api/v1/reactiveMstSuperSpeciality/"+ speciality.ssId;
    const url="http://localhost:8083/reactiveMstSuperSpeciality/list?page=0&size=10" + speciality.ssId ;

    return this.http.post<any>(url,speciality)
  }
}
