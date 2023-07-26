import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankBranchMasterService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  getAllBankBranchData() {
    const url = "http://localhost:8081/api/v1/allMstBankBranch";
    return this.http.get<any>(url);
  }

  getAllBankMasterData() {
    const url = "http://localhost:8081/api/v1/allMstBank";
    return this.http.get<any>(url);
  }

  updateBankBranchData(data: any) {
    const param = {      
      "bbId":data.bbId,
      "bankBranchName":data.bankBranchName,
      "bbBankId":{
        "bankId":data.bankId,
        "bankName":data.bankName
      }
    };    
    const url = "http://localhost:8081/api/v1/updateMstBankBranch/"+data.bbId;
    return this.http.put<any>(url, param);
  }

  saveBankBranchData(data: any): Observable<any> {
    const param = {
      "bankBranchName":data.bankBranchName,     
      "bbBankId":{
        "bankId":data.bankName
      }
    };
    const url = "http://localhost:8081/api/v1/addMstBankBranch";
    return this.PostCall(url, param);
  }

  deleteBankBranchData(bbId: any) {
    const url = "http://localhost:8081/api/v1/deleteMstBankBranch/" + bbId;
    console.log(bbId);
    return this.http.delete<any>(url);    
  }


  isActiveData(data: any) {
    const param={
      "bbId":data.bbId
    }
    const url = "http://localhost:8081/api/v1/reactiveMstBankBranch/" + data.bbId;
    console.log(data.bbId);
    return this.PostCall(url,param);  
  }
}
