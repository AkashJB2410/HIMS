import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterModuleService {
  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  GetAllMstModuleData(){
    const url = "http://localhost:8080/api/v1/allModuleData";
    return this.http.get<any>(url);
  }

  saveMstModuleData(data:any): Observable<any> {
    const param = {
      "icon": data.iconInput,
      "label": data.labelInput,
      "routerLink": data.routerLinkInput,
      "sequence": data.sequenceInput
    };
    
    const url = "http://localhost:8080/api/v1/addModule";
    return this.PostCall(url, param);
  }

  deleteMstModule(idInput:any){
    const url = "http://localhost:8080/api/v1/deleteModule/"+ idInput;
    return this.http.delete<any>(url);
  }

  updateMstModule(data:any){
    const param = {
      "moduleId": data.idInput,  
      "label": data.labelInput,    
      "icon": data.iconInput,      
      "routerLink": data.routerLinkInput,
      "sequence": data.sequenceInput
    };
    const url = "http://localhost:8080/api/v1/updatedModule/"+data.idInput;
    return this.http.put<any>(url,param);
  }



  isActiveData(data: any) {
    const param={
      "moduleId":data.moduleId
    }
    const url = "http://localhost:8080/api/v1/reActiveModule/" + data.moduleId;
    console.log(data.abId);
    return this.PostCall(url,param);  
  }

}