import { Component, OnInit } from '@angular/core';
import addnew from './actionButtonSidebarConfig.json';
import table from './actionButtonTableConfig.json';
import { MessageService } from 'primeng/api';
import { ActionButtonService } from './action-button.service';
@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.css'],
})
export class ActionButtonComponent implements OnInit {

  isActive(event: string) {
    console.log(event);
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;      
      this.getActionButtons();
    });
  }


  onAdd(Event: any) {
    console.log(Event);
  }

  table: any;
  visibleSidebar: boolean = true;
  addNew: any = addnew;
  configurations: any;
  data: any;
  isdataReady = false;
  abId: any;
  constructor(
    private messageService: MessageService,
    private http: ActionButtonService
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

  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (e.actionButtonIdInput == true) {
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
    this.deleteActionButton(e.abId);
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully',
    });
    console.log('Deleted' + JSON.stringify(e));
  }

  getActionButtons() {
    this.http.GetAllActionButtonData().subscribe((res) => {
      this.data = res;
      console.log(this.data);
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
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
