import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }


  GetAllUnitData() {
    const url = "http://localhost:8081/api/v1/allMstUnit";
    return this.http.get<any>(url);
  }

  GetAllCountryData() {
    const url = "http://localhost:8082/api/v1/allMstCountry";
    return this.http.get<any>(url);
  }
  GetAllStateData() {
    const url = "http://localhost:8082/api/v1/allMstState";
    return this.http.get<any>(url);
  }
  GetAllCityData() {
    const url = "http://localhost:8082/api/v1/allMstCity";
    return this.http.get<any>(url);
  }
  GetAllClusterData() {
    const url = "http://localhost:8081/api/v1/allMstCluster";
    return this.http.get<any>(url);
  }

  GetAllOrganizationData() {
    const url = "http://localhost:8081/api/v1/allMstOrgStatus";
    return this.http.get<any>(url);
  }

  updateUnitData(data: any) {
    const param =  {      
      "unitId": data.unitId,
      "unitName": data.unitName,
      "unitpostfix": data.unitpostfix,
      "unitcenter": data.unitcenter,
      "unitAddress": data.unitAddress,
      "unitEmail": data.unitEmail,
      "unitMobile": data.unitMobile,
      "unitPhone": data.unitPhone,
      "unitContactPerson": data.unitContactPerson,
      "mstOrg": {
          "orgId":data.unitOrg
      },
      "unitCode": data.unitCode,
      "unitClinicContactNo": data.unitClinicContactNo,
      "unitPharmacyLicenseNo": data.unitPharmacyLicenseNo,
      "unitPharmacyStoreName": data.unitPharmacyStoreName,
      "unitPharmacyGstNo": data.unitPharmacyGstNo,
      "unitClinicRegistrationNo": data.unitClinicRegistrationNo,
      "unitShopAndEstablishmentNo": data.unitShopAndEstablishmentNo,
      "unitTradeNo": data.unitTradeNo,
      "unitServer": data.unitServer,
      "unitDatabase": data.unitDatabase,
      "unitFaxNo": data.unitFaxNo,
      "countryId": {
        "countryId":data.selectCountry
      },
      "cityId": {
        "cityId":data.selectcity
      },
      "stateId": {
        "stateId":data.selectstate
      },
      "unitClusterId":{
        "clusterId":data.selectCountry
      },
      "unitAddressZip": data.unitAddressZip,
      "unitAddressArea": data.unitAddressArea,
    };
    const url = "http://localhost:8081/api/v1/updateMstUnit/"+data.unitId;
    return this.http.put<any>(url, param);
  }

  saveUnitData(data: any): Observable<any> {
    const param =  {      
      "unitId": data.unitId,
      "unitName": data.unitName,
      "unitpostfix": data.unitpostfix,
      "unitcenter": data.unitcenter,
      "unitAddress": data.unitAddress,
      "unitEmail": data.unitEmail,
      "unitMobile": data.unitMobile,
      "unitPhone": data.unitPhone,
      "unitContactPerson": data.unitContactPerson,
      "mstOrg": {
          "orgId":data.unitOrg
      },
      "unitCode": data.unitCode,
      "unitClinicContactNo": data.unitClinicContactNo,
      "unitPharmacyLicenseNo": data.unitPharmacyLicenseNo,
      "unitPharmacyStoreName": data.unitPharmacyStoreName,
      "unitPharmacyGstNo": data.unitPharmacyGstNo,
      "unitClinicRegistrationNo": data.unitClinicRegistrationNo,
      "unitShopAndEstablishmentNo": data.unitShopAndEstablishmentNo,
      "unitTradeNo": data.unitTradeNo,
      "unitServer": data.unitServer,
      "unitDatabase": data.unitDatabase,
      "unitFaxNo": data.unitFaxNo,
      "countryId": {
        "countryId":data.selectCountry
      },
      "cityId": {
        "cityId":data.selectcity
      },
      "stateId": {
        "stateId":data.selectstate
      },
      "unitClusterId":{
        "clusterId":data.selectCountry
      },
      "unitAddressZip": data.unitAddressZip,
      "unitAddressArea": data.unitAddressArea,
    };
    const url = "http://localhost:8081/api/v1/addMstUnit";
    return this.PostCall(url, param);
  }

  deleteUnitData(unitId: any) {
    const url = "http://localhost:8081/api/v1/deleteMstUnit/" + unitId;
    return this.http.delete<any>(url);    
  }

  isActiveData(data: any) {
    const param={
      "unitId":data.unitId
    }
    const url = "http://localhost:8081/api/v1/reactiveMstUnit/" + data.unitId;
    return this.PostCall(url,param);  
  }
}
