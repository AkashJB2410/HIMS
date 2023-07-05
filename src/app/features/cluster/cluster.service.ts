import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClusterService {

  constructor(private http: HttpClient) { }

  PostCall(url: any, param: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<any>(url, param, { headers })
  }

  getAllCluster() {
    const url = "http://localhost:8081/api/v1/allMstCluster";
    return this.http.get<any>(url);
  }

  addCluster(cluster: any) {
    const param = {
      "clusterName": cluster.clusterName
    };
    const url = "http://localhost:8081/api/v1/addMstCluster";
    return this.PostCall(url, param)
  }

  updateCluster(cluster: any) {
    const param = {
      "clusterName": cluster.clusterName
    };
    const url = "http://localhost:8081/api/v1/updateMstCluster/" + cluster.clusterId;
    return this.http.put<any>(url, param);
  }

  deleteCluster(cluster: any) {
    const url = "http://localhost:8081/api/v1/deleteMstCluster/" + cluster;
    return this.http.delete<any>(url);
  }

  reactiveCluster(cluster: any) {
    const url = "http://localhost:8081/api/v1/reactiveMstCluster/" + cluster.clusterId;
    return this.http.post<any>(url, cluster)
  }
}
