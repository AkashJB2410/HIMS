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
    const url = "http://localhost:8080/api/v1/allOrganizationData";
    return this.http.get<any>(url);
  }

  updateOrgData(data: any) {
    const param = {      
      "organizationType":data.orgNameInput,
      "organization_Id":data.orgIdInput
    };
    const url = "http://localhost:8080/api/v1/organization/"+data.orgIdInput;
    return this.http.put<any>(url, param);
  }

  saveOrgData(data: any): Observable<any> {
    console.log("save data"+ data);
    const param = {      
      "organizationType":data.orgNameInput,
      
    };
    const url = "http://localhost:8080/api/v1/addOrganization";
    return this.PostCall(url, param);
  }


  deleteOrgData(organization_Id: any) {
    const url = "http://localhost:8080/api/v1/deleteOrganization/" + organization_Id;
    // http://localhost:8080/api/v1/deletecOrganization/
    return this.http.delete<any>(url);
  }

}
