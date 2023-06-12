import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationServiceService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }
  

  GetAllOrgData() {
    const url = "http://localhost:8081/api/v1/allMstOrgStatus";
    return this.http.get<any>(url);
  }

  updateOrgData(data: any) {
    const param = {
        "orgName": data.orgName,
        "orgEmail": data.orgEmail,
        "orgMobile": data.orgMobile,
        "orgAddress": data.orgAddress,
        "orgContactPerson": data.orgContactPerson,
        "orgPhone": data.orgPhone
    };
    const url = "http://localhost:8081/api/v1/updateMstOrgStatus/"+data.orgId;
    return this.http.put<any>(url, param);
  }

  saveOrgData(data: any): Observable<any> {
    console.log("save data"+ data);
    const param = {     
      "orgName": data.orgName,
      "orgEmail": data.orgEmail,
      "orgMobile": data.orgMobile,
      "orgAddress": data.orgAddress,
      "orgContactPerson": data.orgContactPerson,
      "orgPhone": data.orgPhone
    };
    const url = "http://localhost:8081/api/v1/addMstOrgStatus";
    return this.PostCall(url, param);
  }


  deleteOrgData(orgId: any) {
    const url = "http://localhost:8081/api/v1/deleteMstOrgStatus/" + orgId;
    return this.http.delete<any>(url);
  }

  reactiveOrgData(org:any){
    const url = "http://localhost:8081/api/v1/reactiveMstOrgStatus/"+org.orgId
    ;
    return this.http.post<any>(url, org)
  }

}
