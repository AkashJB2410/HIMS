import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as myConstants from "../objects/constants";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  email="raghvendrapala839@gmail.com";
  constructor(private http: HttpClient) { }

  orgData(){
    this.email
    const url=myConstants.LOCALHOSTURL +"api/v1/organizationData?emailId="+this.email;
    return this.http.get<any>(url);
  }
  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  Logincheck(obj: any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + "api/v1/login";
    return this.PostCall(url, obj);
  }

  GetAllCollectionData() {
    const url = myConstants.LOCALHOSTURL + "api/v1/AllCOllectionData";
    return this.http.get<any>(url);
  }

  verifyEmailId(emailId: any): Observable<any> {
    if (emailId.charAt(0) == '+') {
      const param = {
        "mobileNo": emailId
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/verify";
      return this.PostCall(url, param);
    }
    else {
      const param = {
        "emailId": emailId
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/verify";
      return this.PostCall(url, param);
    }
  }

  sendOTP(emailId: any): Observable<any> {
    if (emailId.charAt(0) == '+') {
      const param = {
        "mobileNo": emailId
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/sendOTP";
      return this.PostCall(url, param);
    }
    else {
      const param = {
        "emailId": emailId
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/sendOTP";
      return this.PostCall(url, param);
    }
  }

  verifyOTP(otp: any, emailId: any): Observable<any> {
    if (emailId.charAt(0) == '+') {
      const param = {
        "mobileNo": emailId,
        "otp": otp
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/verifyOTP";
      return this.PostCall(url, param);
    }
    else {
      const param = {
        "emailId": emailId,
        "otp": otp
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/verifyOTP";
      return this.PostCall(url, param);
    }
  }
  
  updatePassword(emailId: any, password: any): Observable<any> {
    if (emailId.charAt(0) == '+') {
      const param = {
        "mobileNo": emailId,
        "password": password
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/passwordUpdate";
      return this.http.put<any>(url, param);
    }
    else {
      const param = {
        "emailId": emailId,
        "password": password
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/passwordUpdate";
      return this.http.put<any>(url, param);
    }
  }
}