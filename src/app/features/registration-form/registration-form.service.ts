import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  PostWithImageCall(url: any, param: any): Observable<any> {
    // const headers = new HttpHeaders().set('Content-type', 'multipart/mixed');
    return this.http.post<any>(url, param)
  }

  getFilterData(data: any,startDate:any,endDate:any): Observable<any> {
    let params = new HttpParams();
    params = params.set('patientFirstname', data.firstNameInput);
    params = params.set('patientMobileNumber', data.mobileNoInput);
    params = params.set('patientMrNo', data.mrNoInput);
    params = params.set('endDate', endDate);
    params = params.set('startDate', startDate);
    params = params.set('patientHealthNumber', data.patientHealthNoInput);
    params = params.set('patientHealthId', data.patientHealthIdInput);
    params = params.set('patientFullname', data.patientFullnameInput);
    const url = "http://localhost:8082/mst_patient/search";
    return this.http.get(url, { params: params });
  }
  mobileSerchData(mobileNo: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient/byMobileNumber/" + mobileNo;
    return this.http.get(url);
  }

  getOPDService(){
    const url = "http://localhost:8087/mstSubServices/listByDepartmentId/1";
    return this.http.get<any>(url);
  }
  readonly mst_patient = 'http://localhost:8082/mst_patient/list';
  readonly mst_address = 'http://localhost:8082/mst_address/list';
  readonly mst_privilege = 'http://localhost:8082/mst_privilege/list';
  readonly mst_insurance = 'http://localhost:8082/mst_insurance/list';
  readonly mst_medical_history = 'http://localhost:8082/mst_medical_history/list';
  readonly mst_patient_add_info = 'http://localhost:8082/mst_patient_add_info/list';
  readonly mst_medical_legal_case = 'http://localhost:8082/mst_medical_legal_case/list';
  readonly mst_emergency_contact = 'http://localhost:8082/mst_emergency_contact/list';

  getDataFromApis(): Observable<any[]> {
    const api1Request = this.http.get(this.mst_patient);
    const api2Request = this.http.get(this.mst_address);
    const api3Request = this.http.get(this.mst_privilege);
    const api4Request = this.http.get(this.mst_insurance);
    const api5Request = this.http.get(this.mst_medical_history);
    const api6Request = this.http.get(this.mst_patient_add_info);
    const api7Request = this.http.get(this.mst_medical_legal_case);
    const api8Request = this.http.get(this.mst_emergency_contact);

    return forkJoin([api1Request, api2Request, api3Request, api4Request, api5Request, api6Request, api7Request,api8Request]);
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

  updateMstPatient(mstPatient: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient/update";
    return this.http.put<any>(url, mstPatient);
  }
  updateMstAddress(mstAddress: any): Observable<any> {
    const url = "http://localhost:8082/mst_address/update";
    return this.http.put<any>(url, mstAddress);
  }
  updateMstPrivilege(mstPrivilege: any): Observable<any> {
    const url = "http://localhost:8082/mst_privilege/update";
    return this.http.put<any>(url, mstPrivilege);
  }
  updateMstInsurance(mstInsurance: any): Observable<any> {
    const url = "http://localhost:8082/mst_insurance/update";
    return this.http.put<any>(url, mstInsurance);
  }
  updateMstMedicalHistory(mstMedicalHistory: any): Observable<any> {
    const url = "http://localhost:8082/mst_medical_history/update";
    return this.http.put<any>(url, mstMedicalHistory);
  }
  updateMstPatientAddInfo(mstPatientAddInfo: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient_add_info/update";
    return this.http.put<any>(url, mstPatientAddInfo);
  }
  updateMstMedicalLegalCaseSave(mstMedicalLegalCaseSave: any): Observable<any> {
    const url = "http://localhost:8082/mst_medical_legal_case/update";
    return this.http.put<any>(url, mstMedicalLegalCaseSave);
  }

  updateMstEmergencyContact(mstEmergencyContact: any): Observable<any> {
    const url = "http://localhost:8082/mst_emergency_contact/update";
    return this.http.put<any>(url, mstEmergencyContact);
  }


  //mst_patient APIs

  updateUserData(data: any) {
    const url = "http://localhost:8080/mst_patient/update";
    return this.http.put<any>(url, data);
  }

  deletePatientData(patientId: any) {
    const url = "http://localhost:8080/mst_patient/deleteById/" + patientId;
    return this.http.delete<any>(url);
  }

  uploadImg(data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", data);
    const url = "http://localhost:8082/api/v1/uploadImage";
    return this.PostWithImageCall(url, formData);
  }

  // saveMstRelation(data: any, img: any): Observable<any> {
  //   const param = {
  //     "relationName": data,
  //     "relativeTitleId": {
  //       "relativeTitleId": data
  //     }
  //   };
  //   const url = "http://localhost:8083/api/v1/addMstRelation";
  //   return this.PostCall(url, param);
  // }

  isActiveData(data: any) {
    const param = {
      "userId": data.userId
    }
    const url = "http://localhost:8082/api/v1/reactiveUser/" + data.userId;
    return this.PostCall(url, param);
  }


}