import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LovValueService  {

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
      "groupId":data.groupId,
      "icon": data.icon,
      "lable": data.lable,
      "routerLink": data.routerLink,
      "sequence": data.sequence   ,
      "mstModule": {
        "moduleId": data.selectmstModule,
      },
    };
    console.log(param);

    const url = "http://localhost:8081/api/v1/updatedMstGroup/" + data.groupId;
    return this.http.put<any>(url, param);
  }

  saveLovValueData(data: any): Observable<any> {
    console.log("save data" + data);
    const param = {
      "icon": data.icon,
      "mstModule": {
        "moduleId": data.selectmstModule,
      },
      "lable": data.lable,
      "routerLink": data.routerLink,
      "sequence": data.sequence
    };
    const url = "http://localhost:8081/api/v1/addMstGroup";
    return this.PostCall(url, param);
  }

  deleteLovValueData(groupId: any) {
    const url = "http://localhost:8081/api/v1/deletedMstGroup/" + groupId;
    console.log(groupId);
    return this.http.delete<any>(url);
  }
  
  isActiveData(data: any) {
    const param = {
      "groupId": data.groupId
    }
    const url = "http://localhost:8081/api/v1/reActive/" + data.groupId;
    console.log(data.groupId);
    return this.PostCall(url, param);
  }
}

