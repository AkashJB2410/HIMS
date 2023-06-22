import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LovTypeService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllMstLovData(){
    const url = "http://localhost:8081/api/v1/allMstLovType";
    return this.http.get<any>(url);
  }

  saveMstLovData(data:any): Observable<any> {
    const param = {
      "lovTypeId": data.idInput,
      "code": data.codeInput,
      "name": data.nameInput,
      "description": data.descriptionInput
    };
    
    const url = "http://localhost:8081/api/v1/addMstLovType";
    return this.PostCall(url, param);
  }

  deleteMstLov(idInput:any){
    const url = "http://localhost:8081/api/v1/deleteMstLovType/"+ idInput;
    return this.http.delete<any>(url);
  }

  updateMstLov(data:any){
    const param = {
      "lovTypeId": data.idInput,
      "code": data.codeInput,
      "name": data.nameInput,
      "description": data.descriptionInput
    };
    const url = "http://localhost:8081/api/v1/updateMstLovType/"+data.idInput;
    return this.http.put<any>(url,param);
  }

  isActiveData(data: any) {
    const param={
      "lovTypeId": data.lovTypeId,
    }
    const url = "http://localhost:8081/api/v1/reactiveMstLovType/" + data.lovTypeId;
    console.log(data.abId);
    return this.PostCall(url,param);  
  }

}
