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

  getDataFromApis(): Observable<any[]> {
    const api1Request = this.http.get(this.mst_patient);
    const api2Request = this.http.get(this.mst_address);
    const api3Request = this.http.get(this.mst_privilege);
    const api4Request = this.http.get(this.mst_insurance);
    const api5Request = this.http.get(this.mst_medical_history);
    const api6Request = this.http.get(this.mst_patient_add_info);
    const api7Request = this.http.get(this.mst_medical_legal_case);

    return forkJoin([api1Request, api2Request, api3Request, api4Request, api5Request, api6Request, api7Request]);
  }

  readonly mst_patient_save = 'http://localhost:8082/mst_patient/create';
  readonly mst_address_save = 'http://localhost:8082/mst_address/create';
  readonly mst_privilege_save = 'http://localhost:8082/mst_privilege/create';
  readonly mst_insurance_save = 'http://localhost:8082/mst_insurance/create';
  readonly mst_medical_history_save = 'http://localhost:8082/mst_medical_history/create';
  readonly mst_patient_add_info_save = 'http://localhost:8082/mst_patient_add_info/create';
  readonly mst_medical_legal_case_save = 'http://localhost:8082/mst_medical_legal_case/create';


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

  saveDataFromApis(mstAddress: any, mstPrivilege: any, mstInsurance: any, mstMedicalHistory: any, mstAdditionalInfo: any, mstMLC: any): Observable<any[]> {
    let postRequest1$, postRequest2$, postRequest3$, postRequest4$, postRequest5$, postRequest6$, postRequest7$;
    // if (mstPatient != undefined) {
    //   postRequest1$ = this.http.post(this.mst_patient_save, mstPatient);
    //   // return forkJoin([postRequest1$]);
    // }

    // setTimeout(() => {                           // <<<---using ()=> syntax
    if (mstAddress != undefined) {
      postRequest2$ = this.http.post(this.mst_address_save, mstAddress);
      // return forkJoin([postRequest2$]);
    }
    if (mstPrivilege != undefined) {
      postRequest3$ = this.http.post(this.mst_privilege_save, mstPrivilege);
    }
    if (mstInsurance != undefined) {
      postRequest4$ = this.http.post(this.mst_insurance_save, mstInsurance);
    }
    if (mstMedicalHistory != undefined) {
      postRequest5$ = this.http.post(this.mst_medical_history_save, mstMedicalHistory);
    }
    if (mstAdditionalInfo != undefined) {
      postRequest6$ = this.http.post(this.mst_patient_add_info_save, mstAdditionalInfo);
    }
    if (mstMLC != undefined) {
      postRequest7$ = this.http.post(this.mst_medical_legal_case_save, mstMLC);
    }
    // }, 3000);


    return forkJoin([postRequest2$, postRequest3$, postRequest4$, postRequest5$, postRequest6$, postRequest7$]);
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