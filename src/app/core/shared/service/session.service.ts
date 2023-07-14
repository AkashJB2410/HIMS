import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as myConstants from '../objects/constants';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private http: HttpClient) {}
  headers = new HttpHeaders().set('Content-type', 'application/json');

  Logincheck(obj: any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + 'authentication/userLogin';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, obj, { headers });
  }

  GetAllCollectionData() {
    const url = myConstants.LOCALHOSTURL + 'authentication/AllCOllectionData';
    return this.http.get<any>(url);
  }

  // To verify email Id or number
  verifyEmailId(data: any): Observable<any> {
    var param = {};
    if (data.emailId != '') {
      param = {
        emailId: data.emailId,
      };
    } else if (data.mobileNo != '') {
      param = {
        mobileNo: data.mobileNo,
      };
    }
    const url = myConstants.LOCALHOSTURL + 'authentication/verify';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers });
  }

  // To send OTP on verified number
  sendOTP(data: any): Observable<any> {
    var param = {};
    var str = data.mobileNo;
    var re = /whatsapp/gi;
    if (data.emailId != '') {
      param = {
        emailId: data.emailId,
      };
      var url = myConstants.LOCALHOSTURL + 'authentication/sendOTP';
    } else if (data.mobileNo != '') {
      param = {
        mobileNo: data.mobileNo,
      };
      if (str.search(re) == -1) {
        console.log('Not Found');
        var url = myConstants.LOCALHOSTURL + 'authentication/sendOTP';
      } else {
        console.log('Found');
        var url = myConstants.LOCALHOSTURL + 'authentication/sendOTPWhatsApp';
      }
    }
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers });
  }

  // To verify OTP
  verifyOTP(otp: any, data: any): Observable<any> {
    var param;

    if (data.emailId != '') {
      param = {
        emailId: data.emailId,
        emailOTP: otp,
      };
    } else if (data.mobileNo != '') {
      param = {
        mobileNo: data.mobileNo,
        mobileOTP: otp,
      };
    }
    const url = myConstants.LOCALHOSTURL + 'authentication/verifyOTP';
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers });
  }

  // To update password
  updatePassword(data: any, password: any): Observable<any> {
    var param = {};
    if (data.emailId != '') {
      param = {
        emailId: data.emailId,
        password: password,
      };
    } else {
      param = {
        mobileNo: data.mobileNo,
        password: password,
      };
    }
    const url = myConstants.LOCALHOSTURL + 'authentication/passwordUpdate';
    return this.http.put<any>(url, param);
  }
  
  orgData(email: any) {
    const url =
      myConstants.LOCALHOSTURL +
      'authentication/organizationData?emailId=' +
      email;
    return this.http.get<any>(url);
  }

  editProfile(data: any ,id:any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + "authentication/editProfile/" + id;
    return this.http.put<any>(url, data);

  }
}

