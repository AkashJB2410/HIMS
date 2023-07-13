import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';

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

  // getFilterData(data:any){
  //   let params = new HttpParams();

  //   // params = params.set('firstName', data.firstNameInput[0]);
  //   // params = params.set('mobileNo', data.mobileNoInput);
  //   // params = params.set('identificationNo', data.identificatioNoInput[0]);

  //   const param = {
  //     "mobileNo": data.mobileNoInput
  //   }

  //  const url = "http://localhost:8082/api/v1/searchPatient";
  //   return this.http.post<any>(url);
  // }

  getFilterData(data: any): Observable<any> {

    let params = new HttpParams();
    params =params.set('patientFirstname', data.firstNameInput);
    params =params.set('patientMobileNumber', data.mobileNoInput);
    params =params.set('patientMrNo', data.mrNoInput);

    const url = "http://localhost:8082/mst_patient/search";
    return this.http.get(url, { params: params });
  }

  getALLDataFromAPIs(): any {
    forkJoin([
      this.GetAllMstPatientData(),
      this.GetAllDemographicsData(),
      this.GetAllMstAddress()
    ]).subscribe(
      ([dataFromAPI1, dataFromAPI2, dataFromAPI3]) => {
        // Handle the data from both APIs
        console.log('Data from API 1:', dataFromAPI1);
        console.log('Data from API 2:', dataFromAPI2);
        console.log('Data from API 2:', dataFromAPI3);
      },
      (error) => {
        // Handle error if any API request fails
        console.error('Error:', error);
      }
    );
  }

  //mst_patient APIs

  GetAllMstPatientData() {
    const url = "http://localhost:8082/mst_patient/list";
    return this.http.get<any>(url);
  }

  savePatientData(data: any): Observable<any> {
    const url = "http://localhost:8080/mst_patient/create";
    return this.PostCall(url, data);
  }

  updateUserData(data: any) {
    const url = "http://localhost:8080/mst_patient/update";
    return this.http.put<any>(url, data);
  }

  deletePatientData(patientId: any) {
    const url = "http://localhost:8080/mst_patient/deleteById/" + patientId;
    return this.http.delete<any>(url);
  }


  //mst_demographics APIs

  GetAllDemographicsData() {
    const url = "http://localhost:8082/mst_demographics/list";
    return this.http.get<any>(url);
  }

  //mst_address APIs

  GetAllMstAddress() {
    const url = "http://localhost:8082/mst_address/list";
    return this.http.get<any>(url);
  }
  //mst_patient_add_info APIs
  GetAllMstPatientAddInfo() {
    const url = "http://localhost:8082/mst_patient_add_info/list";
    return this.http.get<any>(url);
  }
  //mst_privilege APIs
  GetAllMstPrivilege() {
    const url = "http://localhost:8082/mst_privilege/list";
    return this.http.get<any>(url);
  }
  //mst_medicalhistory APIs
  GetAllMedicalHistory() {
    const url = "http://localhost:8082/mst_medicalhistory/list";
    return this.http.get<any>(url);
  }
  //mst_Insurence APIs
  GetAllMstInsurence() {
    const url = "http://localhost:8082/mst_Insurence/list";
    return this.http.get<any>(url);
  }

  //Master Management
  GetAllTitleData() {
    const url = "http://localhost:8083/mstLovList/allTypeData/1";
    return this.http.get<any>(url);
  }
  GetAllBloodGroupData() {
    const url = "http://localhost:8082/api/v1/allBloodGroupData";
    return this.http.get<any>(url);
  }
  GetAllmstGenderData() {
    const url = "http://localhost:8083/mstLovList/allTypeData/2";
    return this.http.get<any>(url);
  }
  GetAllIdentificationTypeData() {
    const url = "http://localhost:8082/api/v1/allIdentificationType";
    return this.http.get<any>(url);
  }
  GetAllMstStateData() {
    const url = "http://localhost:8082/api/v1/allMstState";
    return this.http.get<any>(url);
  }
  GetAllMstDistrictData() {
    const url = "http://localhost:8082/api/v1/allMstDistrict";
    return this.http.get<any>(url);
  }
  GetAllMstTalukaData() {
    const url = "http://localhost:8082/api/v1/allMstTaluka";
    return this.http.get<any>(url);
  }
  GetAllMstDurationData() {
    const url = "http://localhost:8082/api/v1/allDurationData";
    return this.http.get<any>(url);
  }
  GetAllMstDepartment() {
    const url = "http://localhost:8081/api/v1/allMstDepartment";
    return this.http.get<any>(url);
  }
  GetAllSubDepartmentData() {
    const url = "http://localhost:8081/api/v1/allsubDepartmentData";
    return this.http.get<any>(url);
  }
  GetAllDoctorData() {
    const url = "http://localhost:8082/api/v1/alldoctorData";
    return this.http.get<any>(url);
  }
  GetAllWardData() {
    const url = "http://localhost:8082/api/v1/allMstWardDetails";
    return this.http.get<any>(url);
  }
  GetAllVillageData() {
    const url = "http://localhost:8082/api/v1/allvillageData";
    return this.http.get<any>(url);
  }
  GetAllRelativeTitle() {
    const url = "http://localhost:8083/api/v1/allRelativeTitle";
    return this.http.get<any>(url);
  }

  uploadImg(data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", data);
    const url = "http://localhost:8082/api/v1/uploadImage";
    return this.PostWithImageCall(url, formData);
  }

  saveMstRelation(data: any, img: any): Observable<any> {
    const param = {
      "relationName": data,
      "relativeTitleId": {
        "relativeTitleId": data
      }

    };
    const url = "http://localhost:8083/api/v1/addMstRelation";
    return this.PostCall(url, param);
  }



  isActiveData(data: any) {
    const param = {
      "userId": data.userId
    }
    const url = "http://localhost:8082/api/v1/reactiveUser/" + data.userId;
    return this.PostCall(url, param);
  }


}