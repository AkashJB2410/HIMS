import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as myConstants from "../objects/constants";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  email = "raghvendrapala839@gmail.com";
  constructor(private http: HttpClient) { }

  orgData() {
    this.email
    const url = myConstants.LOCALHOSTURL + "api/v1/organizationData?emailId=" + this.email;
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

  verifyOTP(otp: any, data: any): Observable<any> {
    var param = {};
    if (data.emailId != '') {
      param = {
        "emailId": data.emailId,
        "otp": otp
      };
    } else {
      param = {
        "mobileNo": data.mobileNo,
        "otp": otp
      };
    }
    const url = myConstants.LOCALHOSTURL + "api/v1/verifyOTP";
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })

  }

  updatePassword(data: any, password: any): Observable<any> {
    var param = {};
    if (data.emailId != '') {
      param = {
        "emailId": data.emailId,
        "password": password
      };
    } else {
      param = {
        "mobileNo": data.mobileNo,
        "password": password
      };
    }
    const url = myConstants.LOCALHOSTURL + "api/v1/passwordUpdate";
    return this.http.put<any>(url, param);
  }

  // orgData(email: any) {
  //   const url = myConstants.LOCALHOSTURL + "api/v1/organizationData?emailId=" + email;
  //   return this.http.get<any>(url);
  // }
  
  addPersonalization(dateFormat: any, currency: any, theme: any): Observable<any> {
    const param = {
      "dateFormat": dateFormat,
      "currency": currency,
      "theme": theme
    };
    const url = myConstants.LOCALHOSTURL + "api/v1/addPersonalization";
    return this.http.post<any>(url, param);

  }
}