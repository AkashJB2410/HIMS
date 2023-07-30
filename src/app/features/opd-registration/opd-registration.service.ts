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
  saveMstPatient(mstPatient: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient/create";
    return this.PostCall(url, mstPatient);
  }
  saveMstAddress(mstAddress: any): Observable<any> {
    const url = "http://localhost:8082/mst_address/create";
    return this.PostCall(url, mstAddress);
  }
  saveMstPrivilege(mstPrivilege: any): Observable<any> {
    const url = "http://localhost:8082/mst_privilege/create";
    return this.PostCall(url, mstPrivilege);
  }
  saveMstInsurance(mstInsurance: any): Observable<any> {
    const url = "http://localhost:8082/mst_insurance/create";
    return this.PostCall(url, mstInsurance);
  }
  saveMstMedicalHistory(mstMedicalHistory: any): Observable<any> {
    const url = "http://localhost:8082/mst_medical_history/create";
    return this.PostCall(url, mstMedicalHistory);
  }
  saveMstPatientAddInfo(mstPatientAddInfo: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient_add_info/create";
    return this.PostCall(url, mstPatientAddInfo);
  }
  saveMstMedicalLegalCase(mstMedicalLegalCaseSave: any): Observable<any> {
    const url = "http://localhost:8082/mst_medical_legal_case/create";
    return this.PostCall(url, mstMedicalLegalCaseSave);
  }

  saveMstEmergencyContact(mstEmergencyContact: any): Observable<any> {
    const url = "http://localhost:8082/mst_emergency_contact/create";
    return this.PostCall(url, mstEmergencyContact);
  }
}
