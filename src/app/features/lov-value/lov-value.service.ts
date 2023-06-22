import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LovValueService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllLovValueData() {
    const url = "http://localhost:8081/api/v1/allMstLovList";
    return this.http.get<any>(url);
  }
  GetAllLovTypeData() {
    const url = "http://localhost:8081/api/v1/allMstLovType";
    return this.http.get<any>(url);
  }
  updateLovValueData(data: any) {
    const param = {
      "description": data.description,
      "lovListId": data.lovlistId,
      "mstLovType": {
        "lovTypeId": data.selectlovType,
      },
      "typeOfField": data.typeOfField,
      "value": data.value,
    };
    const url = "http://localhost:8081/api/v1/updateMstLovList/" + data.lovlistId;
    return this.http.put<any>(url, param);
  }

  saveLovValueData(data: any): Observable<any> {
    const param = {
      "description": data.description,
      "lovListId": data.lovlistId,
      "mstLovType": {
        "lovTypeId": data.selectlovType,
      },
      "typeOfField": data.typeOfField,
      "value": data.value,
    };
    const url = "http://localhost:8081/api/v1/addMstLovList";
    return this.PostCall(url, param);
  }

  deleteLovValueData(lovListId: any) {
    const url = "http://localhost:8081/api/v1/deleteMstLovList/" + lovListId;
    return this.http.delete<any>(url);
  }

  isActiveData(data: any) {
    const param = {
      "lovListId": data.lovListId
    }
    const url = "http://localhost:8081/api/v1/reactiveMstLovList/" + data.lovListId;
    return this.PostCall(url, param);
  }
}

