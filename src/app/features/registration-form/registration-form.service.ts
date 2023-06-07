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
  
  saveUserData(data:any): Observable<any> {
    const param = {
      // "employee_Id": data.idInput,
      "role_Name":data.nameInput,
      "role_Description": data.descriptionInput
      // "employee_Mobile_No": data.mobileNoInput,
      // "employee_address": data.addressInput

      // userId 
// abhaAddress  
// abhaId  
// age int 
// birthDuration  
// created_By  
// created_Date  
// dob 
// emailId  
// firstName  
// identificationNo  
// is_Active 
// is_Deleted 
// lastName  
// middleName  
// mobileNo bigint 
// modified_By  
// modified_Date 
// identificationType_identificationTypeId int 
// mstBloodGroup_bloodgroupId int 
// mstDistrict_districtId int 
// mstDoctor_doctorId int 
// mstGender_id int 
// mstState_stateId int 
// mstTitle_titleId int 
// mstWardDetails_id
    };
    
    const url = "http://localhost:8080/api/v1/addUser";
    return this.PostCall(url, param);
  }

  deleteUserData(roleId:any){
    const url = "http://localhost:8080/api/v1/deleteUser/"+ roleId;
    return this.http.delete<any>(url);
  }

  updateUserData(data:any){
    const param = {
      "role_Id": data.idInput,
      // "permissions": [],
      "role_Name":data.nameInput,
      "role_Description": data.descriptionInput
    };
    const url = "http://localhost:8080/api/v1/role/userUpdate/"+data.idInput;
    return this.http.put<any>(url,param);
  }

}