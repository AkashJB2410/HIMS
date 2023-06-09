import { Component, OnInit } from '@angular/core';
import table from './actionModuleTableConfig.json';
import addnew from './actionModuleSidebarConfig.json';
import { MessageService } from 'primeng/api';
import { ActionModuleService } from './action-module.service';
@Component({
  selector: 'app-action-module',
  templateUrl: './action-module.component.html',
  styleUrls: ['./action-module.component.css'],
})
export class ActionModuleComponent implements OnInit {


  isActive(event: string) {
    console.log(event);
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;      
      this.getActionModules();
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
  constructor(private messageService: MessageService,private http: ActionModuleService) { }

  ngOnInit(): void {
    this.configurations = {
      isFilter: false,
      isTable: true,
      isSideBar: true,
      isConfirmation: true,
    };
    this.getConfigForTable();
    this.getActionModules();
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

  addRow(e:any){
    this.visibleSidebar = true;
  }

  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e == 'reset') {
      console.log(e);
    } else if (e.actionModuleIdInput == true) {
      console.log(e);
      this.submitActionModule(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.updateActionModule(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }

  confirmAction(e: any) {
    this.deleteActioModule(e.actionModuleId);
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully',
    });
    console.log('Deleted' + JSON.stringify(e));
  }

  getActionModules() {
    this.http.GetAllActionModuleData().subscribe((res) => {
      this.data = res;
      console.log(this.data);      
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
      }
    });
  }

  updateActionModule(actionModuleIdInput: any) {
    this.http.updateActionModuleData(actionModuleIdInput).subscribe((data) => {
      this.data = undefined;
      this.getActionModules();
      console.log('data' + data);
    });
  }

  deleteActioModule(actionModuleIdInput: any) {
    this.http.deleteActionModuleData(actionModuleIdInput).subscribe((data) => {
      this.data = undefined;
      this.getActionModules();
      console.log('data' + data);
      
      
    });
  }

  submitActionModule(actionModuleData: any) {
    this.http.saveActionModuleData(actionModuleData).subscribe((data) => {
      this.data = undefined;
      this.getActionModules();
      console.log('data' + data);
    });
  }
}
