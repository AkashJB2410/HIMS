import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as myConstants from "../objects/constants";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders().set('Content-type', 'application/json');

  Logincheck(obj: any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + "authentication/userLogin";
    const headers = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.post<any>(url, obj, { headers })
  }

  GetAllCollectionData() {
    const url = myConstants.LOCALHOSTURL + "authentication/AllCOllectionData";
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
    const url = myConstants.LOCALHOSTURL + "authentication/verify";
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
    const url = myConstants.LOCALHOSTURL + "authentication/sendOTP";
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
    const url = myConstants.LOCALHOSTURL + "authentication/verifyOTP";
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
    const url = myConstants.LOCALHOSTURL + "authentication/passwordUpdate";
    return this.http.put<any>(url, param);
  }

  orgData(email: any) {
    const url = myConstants.LOCALHOSTURL + "authentication/organizationData?emailId=" + email;
    return this.http.get<any>(url);
  }
}