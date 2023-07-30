import { Component, OnInit } from '@angular/core';
import { ClusterService } from './cluster.service';
import table_Config from './cluster-table-config.json';
import cluster_Form from './cluster-input-update.json';
import cluster_Breadcrumb from './cluster-breadcrumb.json';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.css']
})
export class ClusterComponent implements OnInit {

  configurations: any;
  table_Config: any;
  isDataReady: boolean = false;
  visibleSiderbar: boolean = false;
  table_Data: any;
  sidebar_Update_Input: any = cluster_Form;
  saveMethod: boolean = false;
  Cluster_Breadcrumb = cluster_Breadcrumb;
  editData:any;

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllCluster();
    this.table_Config = table_Config;
  }

  constructor(private messageService: MessageService, private http: ClusterService, private common:CommonService) { }

  getAllCluster() {
    this.http.getAllCluster().subscribe(data => {
      this.table_Data = data;
      this.isDataReady = true;
      for (let i = 0; i < this.table_Data.length; i++) {
        this.table_Data[i].id = i + 1;
      }
      this.table_Data;
    })
  }

  editRow(e: any) {
    this.visibleSiderbar = true;
  }

  buttonEvent(e:any){
    this.editData=undefined;
    this.common.sendEditData(false);
  }

  saveCluster(data: any) {
    this.sidebar_Update_Input.form.formControls[0].isVisible=false;
    this.saveMethod = true;
    this.editData=[];
    this.common.sendEditData(false);
  }

  editCluster(data: any) {
    this.sidebar_Update_Input.form.formControls[0].isVisible=true;
    this.editData=data.editRow;  
   }

  isActive(data: any) {
    if (data.is_Deleted) {
      this.http.reactiveCluster(data)
        .subscribe(c_Data => {
          this.table_Data = undefined;
          this.getAllCluster();
        })
      this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Cluster Enable Successfully' });
    }
    else if (!data.is_Deleted) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cluster is already Active' });
    }
  }

  confirmAction(e: any) {
    if (e.is_Active == true) {
      this.table_Data = undefined;
      this.deleteCluster(e);
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Cluster Disabled Successfully' });
    }
    else if (e.is_Active == false) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Cluster is already Disabled' });
    }
    else { }
  }

  sidebarData(e: any) {
    if (e == 'reset') { }
    else if (this.saveMethod) {
      this.addCluster(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Cluster Added Successfully' });
      this.saveMethod = false;
    } else {
      this.updateCluster(e);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Cluster Updated Successfully.' });
    }
  }

  addCluster(cluster: any) {
    this.http.addCluster(cluster)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllCluster();
      })
  }

  updateCluster(cluster: any) {
    this.http.updateCluster(cluster)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllCluster();
      })
  }

  deleteCluster(cluster: any) {
    this.http.deleteCluster(cluster.clusterId)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllCluster();
      })
  }

  bulkDeleteRows(bank_Bulk_Data: any) {
    let count = 0;
    if (bank_Bulk_Data != '') {
      bank_Bulk_Data.forEach((cluster: any) => {
        if (cluster.is_Active == true) {
          this.deleteCluster(cluster);
          count++;
        }
      });
      if (count == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The Selected Rows are Already Disabled',
        });
        this.table_Data = undefined;
        this.getAllCluster();
      }
      else if (count != 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Bulk Deleted',
          detail: 'Successful Disabled',
        });
      }
    }
    else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No Row Selected',
      });
    }
  }

}
