import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  
  GetAllUserData() {
    const url = "http://localhost:8082/api/v1/allUserData";
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
    const url = "http://localhost:8082/api/v1/allMstDepartment";
    return this.http.get<any>(url);
  }
  GetAllSubDepartmentData() {
    const url = "http://localhost:8082/api/v1/allsubDepartmentData";
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



  saveUserData(data: any): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("firstName", data.firstNameInput);
    formData.append("mobileNo", data.mobileNoInput);
    formData.append("userImage", data.imgUpl);
    formData.append("middleName", data.middleNameInput);
    formData.append("lastName", data.lastNameInput);
    formData.append("dob", data.userBirthdate);
    formData.append("age", data.ageText);
    formData.append("abhaId", data.abhaIdInput);
    formData.append("abhaAddress", data.abhaAddressInput);
    formData.append("emailId", data.emailInput);
    formData.append("pincode", data.pinCodeInput);
    formData.append("address", data.addressInput);
    formData.append("identificationNo", data.identificationNoInput);
    formData.append("titleId", data.selectTitle);
    formData.append("identificationTypeId", data.selectIdentificationType);
    formData.append("mstGenderId", data.selectGender);
    formData.append("bloodgroupId", data.selectBlood);
    formData.append("stateId", data.selectState[0]);
    formData.append("districtId", data.selectState[1]);
    formData.append("doctorId", data.selectDoctor);
    formData.append("durationId", data.selectYear);
    formData.append("mstWardDetailsid", data.selectWard);

    const url = "http://localhost:8082/api/v1/addUser";
    return this.PostWithImageCall(url, formData);
  }

  deleteUserData(roleId: any) {
    const url = "http://localhost:8082/api/v1/deleteUser/" + roleId;
    return this.http.delete<any>(url);
  }

  updateUserData(data: any) {
    const param = {
      "userId": data.nameInput,
      "abhaAddress": data.nameInput,
      "abhaId": data.nameInput,
      "age": data.nameInput,
      "birthDuration": data.nameInput,
      "emailId": data.nameInput,
      "firstName": data.nameInput,
      "identificationNo": data.nameInput,
      "is_Active": data.nameInput,
      "lastName": data.nameInput,
      "middleName": data.nameInput,
      "mobileNo": data.nameInput,
      "identificationType_identificationTypeId": {
        "identificationTypeId": data.nameInput,
      },
      "mstBloodGroup_bloodgroupId": {
        "bloodgroupId": data.nameInput,
      },
      "mstDistrict_districtId": {
        "districtId": data.nameInput,
      },
      "mstDoctor_doctorId": {
        "doctorId": data.nameInput,
      },
      "mstGender_id": {
        "mstGenderId": data.nameInput,
      },
      "mstState_stateId": {
        "stateId": data.nameInput,
      },
      "mstTitle_titleId": {
        "titleId": data.nameInput,
      },
      "mstWardDetails_id": {
        "mstWardDetailsid": data.nameInput,
      }
    };
    const url = "http://localhost:8080/api/v1/role/userUpdate/" + data.idInput;
    return this.http.put<any>(url, param);
  }

}