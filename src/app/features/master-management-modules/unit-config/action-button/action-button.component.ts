import { Component, OnInit } from '@angular/core';
import addnew from './actionButtonSidebarConfig.json';
import table from './actionButtonTableConfig.json';
import { MessageService } from 'primeng/api';
import { ActionButtonService } from './action-button.service';
import Action_breadcrumb from './actionButton-breadcrumb.json';
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
})
export class ActionButtonComponent implements OnInit {
  editData: any[];
  status: boolean;

  isActive(e: any) {
    if (e.is_Deleted == false) {
      this.messageService.add({
        severity: 'error',
        summary: 'Message form User component',
        detail: 'Allready Enabled',
      });
    } else {
      this.http.isActiveData(e).subscribe((data) => {
        this.data = undefined;
        this.getActionButtons();
        console.log('data' + data);
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Message form User component',
        detail: 'Enabled Sucessfully',
      });
    }
  }

  onAdd(e: any) {
    this.editData = [];
    this.common.sendEditData(false);
    this.status = true;
  }

  onEdit(e: any) {
    this.editData = e.editRow;
    this.status = false;
  }

  buttonEvent(e: any) {
    this.editData = undefined;
    this.common.sendEditData(false);
  }

  table: any;
  visibleSidebar: boolean = true;
  addNew: any = addnew;
  configurations: any;
  data: any;
  isdataReady = false;
  abId: any;
  Action_breadcrumb = Action_breadcrumb;
  constructor(
    private messageService: MessageService,
    private http: ActionButtonService,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getConfigForTable();
    this.getActionButtons();
  }

  buttonClick(e: any) {
    if (e == 'next') {
      console.log(e);
    } else if (e == 'cancel') {
      console.log(e);
    }
  }

  getConfigForTable() {
    this.table = table;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  Bulkdelete(e: any) {
    if (e.length == 1) {
      if (e[0].is_Deleted == false) {
        this.deleteActionButton(e[0].abId);
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      }
    } else {
      let a: boolean;
      for (let i = 0; i < e.length; i++) {
        if (e[i].is_Deleted == false) {
          this.deleteActionButton(e[i].abId);
          a = true;
        }
      }

      if (a == true) {
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
        a = false;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      }
    }
  }

  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (this.status == true) {
      console.log(e);
      this.submitActionButton(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.updateActionButton(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }

  confirmAction(e: any) {
    if (e == false) {
      this.getActionButtons();
    } else {
      if (e.is_Deleted) {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      } else {
        this.deleteActionButton(e.abId);
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
      }
    }
    console.log('Deleted' + JSON.stringify(e));
  }

  getActionButtons() {
    this.http.GetAllActionButtonData().subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].id = i + 1;
      }
      this.data;
    });
  }

  updateActionButton(actionButtonIdInput: any) {
    this.http.updateActionButtonData(actionButtonIdInput).subscribe((data) => {
      this.data = undefined;
      this.getActionButtons();
      console.log('data' + data);
    });
  }

  deleteActionButton(actionButtonIdInput: any) {
    this.http.deleteActionButtonData(actionButtonIdInput).subscribe((data) => {
      this.data = undefined;
      this.getActionButtons();
      console.log('data' + data);
    });
  }

  submitActionButton(actionButtonData: any) {
    this.http.saveActionButtonData(actionButtonData).subscribe((data) => {
      this.data = undefined;
      this.getActionButtons();
      console.log('data' + data);
    });
  }
}
