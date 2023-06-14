import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }


  GetAllUnitData() {
    const url = "http://localhost:8081/api/v1/allMstUnit";
    return this.http.get<any>(url);
  }

  GetAllCountryData() {
    const url = "http://localhost:8081/api/v1/allMstCountry";
    return this.http.get<any>(url);
  }
  updateUnitData(data: any) {
    const param = {      
      "actionId":data.actionModuleIdInput,
      "actionModuleName":data.actionModuleNameInput,
    };
    console.log(param);
    
    const url = "http://localhost:8081/api/v1/updateMstUnit/"+data.actionModuleIdInput;
    return this.http.put<any>(url, param);
  }

  saveUnitData(data: any): Observable<any> {
    console.log("save data"+ data);
    const param = {
      "actionModuleName":data.actionModuleNameInput,     
    };
    const url = "http://localhost:8081/api/v1/addMstUnit";
    return this.PostCall(url, param);
  }

  deleteUnitData(actionId: any) {
    const url = "http://localhost:8081/api/v1/deleteMstUnit/" + actionId;
    console.log(actionId);
    return this.http.delete<any>(url);    
  }

  isActiveData(data: any) {
    const param={
      "actionModuleId":data.actionModuleId
    }
    const url = "http://localhost:8081/api/v1/reactiveMstUnit/" + data.actionModuleId;
    console.log(data.actionModuleId);
    return this.PostCall(url,param);  
  }
}
