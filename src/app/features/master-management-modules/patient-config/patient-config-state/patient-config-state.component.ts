import { Component, OnInit } from '@angular/core';
import { FeaturescommonService } from '../../../shared/featurescommon.service';
import breadcrumb from './StateBreadCrumb.json';
import form1 from './patientConfigStateForm.json';
import table from './patientConfigStateTable.json';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-patient-config-state',
  templateUrl: './patient-config-state.component.html',
  styleUrls: ['./patient-config-state.component.css']
})
export class PatientConfigStateComponent implements OnInit {
  data: any=[];
  breadcrumb = breadcrumb;
  apiGet = 'mstState/list';
  apiAdd = 'mstState/create';
  apiUpdate = 'mstState/update';
  apidelete = 'mstState/inActivate';
  apiactive = 'mstState/activate';
  configurations: {
    isFilter: boolean;
    isTable: boolean;
    isSideBar: boolean;
    isConfirmation: boolean;
  };
  flag: string;
  form: any;
  editData: any;
  visibleSidebar: boolean;
  saveMethod: boolean;
  tableConfig:any=table;
  constructor(
    private messageService: MessageService,
    private http: FeaturescommonService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getAllStateData();
    this.form=form1;
  }

  sidebarData(e: any) {
    if (e != 'reset') {
      if (this.flag == 'edit') {
        this.updateStateData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        this.submitStateData(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data saved successfull.',
        });
      }
    }
  }

  save(e: any) {
    this.saveMethod = true;
    this.editData = [];
    this.common.sendEditData(false);
  }

  edit(e: any) {
    this.editData = e.editRow;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  buttonEvent(e: any) {
    this.editData = undefined;
    this.common.sendEditData(false);
  }

  confirmAction(e: any) {
    if (e.isActive == true) {
      this.data = undefined;
      this.deleteStateData(e);
      this.messageService.add({
        severity: 'success',
        summary: 'Disabled',
        detail: 'The selected rows is disabled successfully',
      });
    } else if (e.isActive == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The selected rows is already Disabled',
      });
    } else {
    }
  }

  getAllStateData() {
    this.http.getData(this.apiGet).subscribe((res) => {
      this.data = res.content;
      for(let i=0; i<this.data.length;i++){
        this.data[i].id=i+1;
      }
      this.data;
    });
  }

  updateStateData(stateData: any) {
    this.http.updateData(stateData, this.apiUpdate).subscribe((data) => {
      this.data = undefined;
      this.getAllStateData();
      console.log('data' + data);
    });
  }

  deleteStateData(stateData: any) {
    this.http.deleteData(this.apidelete, stateData.stateId).subscribe((data) => {
      this.data = undefined;
      this.getAllStateData();
      console.log('data' + data);
    });
  }
  

  submitStateData(stateData: any) {
    this.http.addData(stateData, this.apiAdd).subscribe((data) => {
      this.data = undefined;
      this.getAllStateData();
      console.log('data' + data);
    });
  }

  isActive(data: any) {
    if (!data.isActive) {
      this.http
        .reactiveData(this.apiactive, data, data.stateId)
        .subscribe((b_Data) => {
          this.data = undefined;
          this.getAllStateData();
        });
      this.messageService.add({
        severity: 'success',
        summary: 'Enable',
        detail: 'The selected rows is enable successfully',
      });
    } else if (data.isActive) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The selected rows is already active',
      });
    }
  }

  bulkDeleteRows(bulk_Data: any) {
    let count = 0;
    if (bulk_Data != '') {
      bulk_Data.forEach((stateData: any) => {
        if (stateData.isActive == true) {
          this.deleteStateData(stateData);
          count++;
        }
      });
      if (count == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The selected rows are already disabled',
        });
        this.data = undefined;
        this.getAllStateData();
      } else if (count != 0) {
        this.messageService.add({
          severity: 'success',
          summary: 'Bulk Deleted',
          detail: 'The selected rows disabled successfully',
        });
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No Row Selected',
      });
    }
  }

}
