import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankMasterService {

  constructor(private http:HttpClient) { }

  getAllBankMaster(){
    const url="http://localhost:8081/api/v1/allMstBank";
    return this.http.get<any>(url);
  }

  PostCall(url:any , param:any):Observable<any>{
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, {headers})
  }

  addBankMaster(bank_Master:any):Observable<any>{
    const param={
      "bankName": bank_Master.bankName
    };
    const url = "http://localhost:8081/api/v1/addMstBank";
    return this.PostCall(url, param)
  }

  updateBankMaster(bank_Master:any){
    const param={
      "bankName": bank_Master.bankName
    };
    const url = "http://localhost:8081/api/v1/updateMstBank/"+bank_Master.bankId;
    return this.http.put<any>(url, param);
  }

  deleteBankMaster(bank_Master:any){
    const url = "http://localhost:8081/api/v1/deleteMstBank/"+bank_Master;
    return this.http.delete<any>(url);
  }
}
