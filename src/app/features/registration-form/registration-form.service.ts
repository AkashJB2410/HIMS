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

  saveUserData(data: any, img: any): Observable<any> {
    const param = {
      "mobileNo": data.mobileNoInput,
      "firstName": data.firstNameInput,
      "middleName": data.middleNameInput,
      "lastName": data.lastNameInput,
      "dob": data.userBirthdate,
      "age": data.ageText,
      "emailId": data.emailInput,
      "pincode": data.pinCodeInput,
      "address": data.addressInput,
      "identificationNo": data.identificationNoInput,
      "userImage": img,
      "departmentId": "1",
      "departmentName": "Orthopedics",
      "subDepartmentId": "1",
      "subDepartment": "Administrator",
      "relationId": "1",
      "relationName": "Sagar",
      "mstTitle": {
          "titleId": data.selectTitle,
          
      },
      "identificationType": {
          "identificationTypeId": data.selectIdentificationType
        
      },
      "mstGender": {
          "mstGenderId": data.selectGender,
         
      },
      "mstBloodGroup": {
          "bloodgroupId": data.selectBlood,
          
      },
      "mstState": {
          "stateId": data.selectState[0],
          
         
      },
      "mstDistrict": {
          "districtId": data.selectState[1],
        
      },
      "mstDoctor": {
          "doctorId": data.selectDoctor,
         
      },
      "mstDuration": {
          "durationId": data.selectYear,
          
      },
      "mstWardDetails": {
          "mstWardDetailsid": data.selectWard,
        
  
      }
    };
    const url = "http://localhost:8082/api/v1/addUser";
    return this.PostCall(url, param);
  }

  deleteUserData(roleId: any) {
    const url = "http://localhost:8082/api/v1/deleteUser/" + roleId;
    return this.http.delete<any>(url);
  }

  updateUserData(data: any) {
    const param = {
      "userId": data.PatientUID,
      "mobileNo": data.mobileNoInput,
      "firstName": data.firstNameInput,
      "middleName": data.middleNameInput,
      "lastName": data.lastNameInput,
      "dob": data.userBirthdate,
      "age": data.ageText,
      "emailId": data.emailInput,
      "pincode": data.pinCodeInput,
      "address": data.addressInput,
      "identificationNo": data.identificationNoInput,
      "userImage": data.imgUpl,
      "departmentId": "1",
      "departmentName": "Orthopedics",
      "subDepartmentId": "1",
      "subDepartment": "Administrator",
      "relationId": "1",
      "relationName": "Sagar",
      "mstTitle": {
          "titleId": data.selectTitle,
          
      },
      "identificationType": {
          "identificationTypeId": data.selectIdentificationType
        
      },
      "mstGender": {
          "mstGenderId": data.selectGender,
         
      },
      "mstBloodGroup": {
          "bloodgroupId": data.selectBlood,
          
      },
      "mstState": {
          "stateId": data.selectState[0],
          
         
      },
      "mstDistrict": {
          "districtId": data.selectState[1],
        
      },
      "mstDoctor": {
          "doctorId": data.selectDoctor,
         
      },
      "mstDuration": {
          "durationId": data.selectYear,
          
      },
      "mstWardDetails": {
          "mstWardDetailsid": data.selectWard,
        
  
      }
    };
    const url = "http://localhost:8080/api/v1/role/userUpdate/" + data.idInput;
    return this.http.put<any>(url, param);
  }

  isActiveData(data: any) {
    const param = {
      "userId": data.userId
    }
    const url = "http://localhost:8082/api/v1/reactiveUser/" + data.userId;
    return this.PostCall(url, param);
  }


}