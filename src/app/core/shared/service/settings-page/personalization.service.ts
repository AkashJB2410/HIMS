import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as myConstants from "../../objects/constants";

@Injectable({
  providedIn: 'root'
})
export class PersonalizationService {

  constructor(private http: HttpClient) { }
  headers = new HttpHeaders().set('Content-type', 'application/json');


  addPersonalization(e: any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + "personalization/create";
    return this.http.post<any>(url, e);
  }
  updatePersonalization(e: any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + "personalization/update/" + e.personalizationId;
    return this.http.put<any>(url, e);
  }
  DeletePersonalization(e: any): Observable<any> {
    const url = myConstants.LOCALHOSTURL + "personalization/deletePersonalization/" + e;
    return this.http.delete<any>(url);

  }
  getallPersonalization() {
    const url = myConstants.LOCALHOSTURL + "personalization/list?page=0&size=10";
    return this.http.get<any>(url);
  }
}
