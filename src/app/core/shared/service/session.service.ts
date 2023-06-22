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
  
  headers = new HttpHeaders().set('Content-type', 'application/json');

  Logincheck(obj: any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + "api/v1/login";
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, obj, { headers })
  }

  GetAllCollectionData() {
    const url = myConstants.LOCALHOSTURL + "api/v1/AllCOllectionData";
    return this.http.get<any>(url);
  }

  verifyEmailId(data: any): Observable<any> {
    var param = {};
    if (data.emailId != '') {
      param = {
        "emailId": data.emailId
      };
    } else {
      param = {
        "mobileNo": data.mobileNo
      };
    }
    const url = myConstants.LOCALHOSTURL + "api/v1/verify";
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  sendOTP(data: any): Observable<any> {
    var param = {};
    if (data.emailId != '') {
      param = {
        "emailId": data.emailId
      };
    } else {
      param = {
        "mobileNo": data.mobileNo
      };
    }
    const url = myConstants.LOCALHOSTURL + "api/v1/sendOTP";
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  verifyOTP(otp: any, emailId: any): Observable<any> {
    if (emailId.charAt(0) == '+') {
      const param = {
        "mobileNo": emailId,
        "otp": otp
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/verifyOTP";
      const headers = new HttpHeaders().set('Content-type', 'application/json');
      return this.http.post<any>(url, param, { headers })
    }
    else {
      const param = {
        "emailId": emailId,
        "otp": otp
      };
      const url = myConstants.LOCALHOSTURL + "api/v1/verifyOTP";
      const headers = new HttpHeaders().set('Content-type', 'application/json');
      return this.http.post<any>(url, param, { headers })
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