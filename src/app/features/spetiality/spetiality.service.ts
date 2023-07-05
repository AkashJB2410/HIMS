import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpetialityService {
  
  constructor(private http: HttpClient) {}

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers });
  }

  getAllSpetiality() {
    const url = 'http://localhost:8081/api/v1/allMstSpeciality';
    return this.http.get<any>(url);
  }

  addSpetiality(data: any): Observable<any> {
    const param = {
      "lovTypeId": data.idInput,
      "code": data.codeInput,
      "name": data.nameInput,
      "description": data.descriptionInput,
    };
    const url = 'http://localhost:8081/api/v1/addMstSpeciality';
    return this.PostCall(url, param);
  }

  deleteSpetiality(idInput: any) {
    const url = 'http://localhost:8081/api/v1/deleteMstSpeciality/' + idInput;
    return this.http.delete<any>(url);
  }

  updateSpetiality(data: any) {
    const param = {
      lovTypeId: data.idInput,
      code: data.codeInput,
      name: data.nameInput,
      description: data.descriptionInput,
    };
    const url =
      'http://localhost:8081/api/v1/updateMstSpeciality/' + data.idInput;
    return this.http.put<any>(url, param);
  }

  activateSpetiality(data: any) {
    const param = {
      lovTypeId: data.lovTypeId,
    };
    const url =
      'http://localhost:8081/api/v1/reactiveMstSpeciality/' + data.lovTypeId;
    console.log(data.abId);
    return this.PostCall(url, param);
  }
}
