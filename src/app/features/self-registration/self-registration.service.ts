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
  saveMstAddress(mstAddress: any): Observable<any> {
    const url = "http://localhost:8082/mst_address/create";
    return this.PostCall(url, mstAddress);
  }
  verifyMobileNumber(data: any){
  const url = "http://localhost:8082/mst_patient/byMobileNumber/"+data;
  return this.http.get<any>(url)
  }

   // To send OTP on verified number
   sendOTPMobile(data: any): Observable<any> {
        const url = "http://localhost:8082/send_sms/sendOtpForRegister/" +data;
    return this.http.get<any>(url);
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
