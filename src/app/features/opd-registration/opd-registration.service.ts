import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpdRegistrationService {
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  getOPDService(){
    const url = "http://localhost:8087/mstSubServices/listByDepartmentId/1";
    return this.http.get<any>(url);
  }
  mobileSerchData(mobileNo: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient/byMobileNumber/" + mobileNo;
    return this.http.get(url);
  }

  getAdditionalServices(varPage:any,varSize:any,varSort:any,varQString:any){
    let url: any=""
    if(varQString != ""){
      url = "http://localhost:8087/mstSubServices/list?page="+varPage+"&size="+varSize+"&sort="+varSort+"&qString="+varQString;
    }else{
      url = "http://localhost:8087/mstSubServices/list?page="+varPage+"&size="+varSize+"&sort="+varSort;
    }
    return this.http.get<any>(url);
  }
  saveTrnVisitServices(serviceArr: any): Observable<any> {
    const url = "http://localhost:8087/trnVisitServices/createlist";
    return this.PostCall(url, serviceArr);
  }
  
}
