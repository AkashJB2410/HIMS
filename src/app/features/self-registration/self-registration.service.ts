import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelfRegistrationService {

  
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }
  GetAllSelfRegData(){
const url= "http://localhost:8082/mst_patient/list";
return this.http.get<any>(url);
  }
  saveSelfRegData(data: any): Observable<any> {
    const url = " http://localhost:8082/mst_patient/create";
    return this.PostCall(url, data);
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
      var url = "http://localhost:8080/authentication/sendOTP";
    } else if (data.mobileNo != '') {
      param = {
        mobileNo: data.mobileNo,
      };
      if (str.search(re) == -1) {
        console.log('Not Found');
        var url = "http://localhost:8080/authentication/sendOTP";
      } else {
        console.log('Found');
        var url = "http://localhost:8080/authentication/sendOTPWhatsApp";
      }
    }
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers });
  }
//Mobile verify
headers = new HttpHeaders().set('Content-type', 'application/json');
mobileOTP(data:any): Observable<any>{
  var param = {};
  if (data.mobileNo != '') {
    param = {
      mobileNo: data.mobileNo,
    };
  }
  const url ="http://localhost:8080/authentication/verify"
  const headers = new HttpHeaders().set('Content-type', 'application/json');
return this.http.post<any>(url,param,{headers})
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
  const url = "http://localhost:8080/authentication/verifyOTP";
  const headers = new HttpHeaders().set('Content-type', 'application/json');
  return this.http.post<any>(url, param, { headers });
}
}
