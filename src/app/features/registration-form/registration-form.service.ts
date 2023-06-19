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
  GetAllUserData() {
    const url = "http://localhost:8080/api/v1/allUserData";
    return this.http.get<any>(url);
  }
  GetAllTitleData() {
    const url = "http://localhost:8080/api/v1/allTitleData";
    return this.http.get<any>(url);
  }
  GetAllBloodGroupData() {
    const url = "http://localhost:8080/api/v1/allBloodGroupData";
    return this.http.get<any>(url);
  }
  GetAllmstGenderData() {
    const url = "http://localhost:8080/api/v1/allMstGender";
    return this.http.get<any>(url);
  }
  GetAllIdentificationTypeData() {
    const url = "http://localhost:8080/api/v1/allIdentificationType";
    return this.http.get<any>(url);
  }
  GetAllMstStateData() {
    const url = "http://localhost:8080/api/v1/allMstState";
    return this.http.get<any>(url);
  }
  GetAllMstDistrictData() {
    const url = "http://localhost:8080/api/v1/allMstDistrict";
    return this.http.get<any>(url);
  }
  GetAllMstTalukaData() {
    const url = "http://localhost:8080/api/v1/allMstTaluka";
    return this.http.get<any>(url);
  }
  GetAllMstDurationData() {
    const url = "http://localhost:8080/api/v1/allDurationData";
    return this.http.get<any>(url);
  }
  GetAllMstDepartment() {
    const url = "http://localhost:8080/api/v1/allMstDepartment";
    return this.http.get<any>(url);
  }
  GetAllSubDepartmentData() {
    const url = "http://localhost:8080/api/v1/allsubDepartmentData";
    return this.http.get<any>(url);
  }
  GetAllDoctorData() {
    const url = "http://localhost:8080/api/v1/alldoctorData";
    return this.http.get<any>(url);
  }
  GetAllWardData() {
    const url = "http://localhost:8080/api/v1/allMstWardDetails";
    return this.http.get<any>(url);
  }
  GetAllVillageData() {
    const url = "http://localhost:8080/api/v1/allvillageData";
    return this.http.get<any>(url);
  }

  

  saveUserData(data: any): Observable<any> {
    const param = {
      "userId": data.PatientUID,
          "abhaAddress": data.abhaAddressInput,
          "abhaId": data.abhaIdInput,
          "address": data.addressInput,
          "age": data.ageText,
          "birthDuration_Id": data.selectYear.durationId,
          "birthDuration_Type": data.selectYear.durationType,
          "dob": data.userBirthdate,
          "emailId": data.emailInput,
          "firstName": data.firstNameInput,
          "identificationNo": data.identificationNoInput,
          // "imagedata": data.,
          // "imageType": data.,

          "lastName": data.lastNameInput,
          "middleName": data.middleNameInput,
          "mobileNo": data.mobileNoInput,

          "pincode": data.pinCodeInput,
          "userImage": data.userImage,
          
      "identificationType_identificationTypeId": {
        "identificationTypeId": data.selectIdentificationType,
      },
      "mstBloodGroup_bloodgroupId": {
        "bloodgroupId": data.selectBlood,
      },
      "mstDistrict_districtId": {
        "districtId": data.selectState[1],
      },
      "mstDoctor_doctorId": {
        "doctorId": data.selectDoctor,
      },
      "mstGender_id": {
        "mstGenderId": data.selectGender,
      },
      "mstState_stateId": {
        "stateId": data.selectState[0],
      },
      "mstTitle_titleId": {
        "titleId": data.selectTitle,
      },
      "mstWardDetails_id": {
        "mstWardDetailsid": data.selectWard,
      }
    };

    const url = "http://localhost:8080/api/v1/addUser";
    return this.PostCall(url, param);
  }

  deleteUserData(roleId: any) {
    const url = "http://localhost:8080/api/v1/deleteUser/" + roleId;
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