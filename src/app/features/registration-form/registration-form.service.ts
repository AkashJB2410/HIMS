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

  getFilterData(data: any): Observable<any> {
    let params = new HttpParams();
    params = params.set('patientFirstname', data.firstNameInput);
    params = params.set('patientMobileNumber', data.mobileNoInput);
    params = params.set('patientMrNo', data.mrNoInput);
    const url = "http://localhost:8082/mst_patient/search";
    return this.http.get(url, { params: params });
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


  saveMstRelation(mstPatient: any): Observable<any> {
    const url = "http://localhost:8082/mst_patient/create";
    return this.PostCall(url, mstPatient);
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