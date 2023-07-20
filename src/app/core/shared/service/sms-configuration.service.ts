import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsConfigurationService {
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllSMSData() {
    const url = "http://localhost:8080/api/v1/allSMSData";
    return this.http.get<any>(url);
  }

  saveSMSData(data: any): Observable<any> {
    const param = {
      "to_Number": data.toNumberInput,
      "sms_message": data.smsMessageInput,
      "date_time":data.dateTimeInput,
      "sms_status": data.smsStatusInput,
      "retry_count": data.retryCountInput
    };

    const url = "http://localhost:8080/api/v1/addSMS";
    return this.PostCall(url, param);
  }

  deleteSMSData(smsId: any) {
    const url = "http://localhost:8080/api/v1/deleteSMS/" + smsId;
    return this.http.delete<any>(url);
  }

  updateSMSData(data: any) {
    const param = {
      "id": data.idInput,
      "to_Number": data.toNumberInput,
      "sms_message": data.smsMessageInput,
      "date_time":data.dateTimeInput,
      "sms_status": data.smsStatusInput,
      "retry_count": data.retryCountInput
    };
    const url = "http://localhost:8080/api/v1/SMS/update";
    return this.http.put<any>(url, param);
  }
}
