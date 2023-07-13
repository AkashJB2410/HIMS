import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    const param = {
      "userId": "",
      "firstName": data.firstNameInput[0],
      "middleName": "",
      "dob": "",
      "age": "",
      "emailId": "",
      "address": "",
      "mobileNo":data.mobileNoInput,
      "identificationNo":data.identificatioNoInput[0]
    };
    const url = "http://localhost:8082/api/v1/searchPatient";
    return this.PostCall(url, param);
  }

  GetAllPatientData() {
    const url = "http://localhost:8082/mst_patient/list";
    return this.http.get<any>(url);
  }
  GetAllTitleData() {
    const url = "http://localhost:8082/api/v1/allTitleData";
    return this.http.get<any>(url);
  }
  GetAllBloodGroupData() {
    const url = "http://localhost:8082/api/v1/allBloodGroupData";
    return this.http.get<any>(url);
  }
  GetAllmstGenderData() {
    const url = "http://localhost:8082/api/v1/allMstGender";
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

  savePatientData(data: any): Observable<any> {
    // const param = {
            
    //     "patientIdentificationTypeId": data.selectIdentificationType,
    //     "patientIdentificationTypeName": "Aadhar Card",
    //     "patientTitleId": "1",
    //     "patientTitleName": "Mrs",
    //     "patientFirstname": data.firstNameInput,
    //     "patientMiddlename": "B",
    //     "patientLastname": "Patil",
    //     "patientDob": data.userBirthdate,
    //     "patientAge": "23",
    //     "patientMaritalStatusId": "1",
    //     "patientMaritalStatusName": "Unmarried",
    //     "profileImage": "null",
    //     "patientMobileNumber": data.mobileNoInput,
    //     "patientAddressLine1": data.addressLine1Input,
    //     "patientAddressLine2": data.addressLine2Input,
    //     "patientCityId": "10",
    //     "patientCityName": "Pune",
    //     "patientStateId": "5",
    //     "patientStateName": "Maharashtra",
    //     "patientCountryId": "2",
    //     "patientCountryName": "India",
    //     "patientBloodGroupId": "1",
    //     "patientBloodGroupName": "A+ve",
    //     "patientEthinicityId": "",
    //     "patientEthinicityName": "",
    //     "patientReligion": "",
    //     "patientBlock": "",
    //     "patientPrnNumber": "",
    //     "patientPrivilageId": "",
    //     "patientPrivilageName": "",
    //     "patientInsuranceNumber": "",
    //     "patientInsurancePolicyNumber": "",
    //     "patientInsuranceCompanyNumber": "",
    //     "patientInsuranceCompanyName": "",
    //     "patientIsTobacoConsume": false,
    //     "patientIsTobacoConsumeYear": "",
    //     "patientIsAlcoholConsume": false,
    //     "patientIsAlcoholConsumeYear": "",
    //     "patientIsHaveSugar": false,
    //     "patientIsHaveSugarYear": "",
    //     "patientIsHaveDiabeties": false,
    //     "patientIsHaveDiabetiesYear": "",
    //     "patientOccupation": "Unemployed",
    //     "patientReferredBy": "",
    //     "patientLanguages": "",
    //     "patientPhoneNumber": "",
    //     "patientUploadImage": "",
    //     "patientRegistrationSource": "",
    //     "patientSocialStatusId": "",
    //     "patientSocialStatusName": "",
    //     "patientHealthId": "",
    //     "patientHealthNumber": "",
    //     "patientEmail": "seema123@gmail.com"

    // };
    const url = "http://localhost:8082/mst_patient/create";
    return this.PostCall(url, data);
  }

  deletePatientData(patientId: any) {
    const url = "http://localhost:8082/mst_patient/deleteById/" + patientId;
    return this.http.delete<any>(url);
  }

  updateUserData(data:any) {

    const url = "http://localhost:8082/mst_patient/update" ;
    return this.http.put<any>(url, data);
  }

  isActiveData(data: any) {
    const param = {
      "userId": data.userId
    }
    const url = "http://localhost:8082/api/v1/reactiveUser/" + data.userId;
    return this.PostCall(url, param);
  }


}