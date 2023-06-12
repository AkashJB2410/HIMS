import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailConfigurationService {
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllEmailData() {
    const url = "http://localhost:8080/api/v1/allEmailData";
    return this.http.get<any>(url);
  }

  saveEmailData(data: any): Observable<any> {
    const param = {
      "to_mailId": data.toMailIdInput,
      "subject": data.subjectInput,
      "mail_body": data.emailBodyInput,
      "date_time":data.dateTimeInput,
      "email_status": data.emailStatusInput,
      "retry_count": data.retryCountInput
    };

    const url = "http://localhost:8080/api/v1/addEmail";
    return this.PostCall(url, param);
  }

  deleteEmailData(emailId: any) {
    const url = "http://localhost:8080/api/v1/deleteEmail/" + emailId;
    return this.http.delete<any>(url);
  }

  updateEmailData(data: any) {
    const param = {
      "id": data.idInput,
      "to_mailId": data.toMailIdInput,
      "subject": data.subjectInput,
      "mail_body": data.emailBodyInput,
      "date_time":data.dateTimeInput,
      "email_status": data.emailStatusInput,
      "retry_count": data.retryCountInput
    };
    const url = "http://localhost:8080/api/v1/Email/update";
    return this.http.put<any>(url, param);
  }
}
