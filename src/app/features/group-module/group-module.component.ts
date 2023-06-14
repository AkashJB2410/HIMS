import { Component, OnInit } from '@angular/core';
import groupForm from './group_form.json';
import { GroupModuleService } from './group-module.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-group-module',
  templateUrl: './group-module.component.html',
  styleUrls: ['./group-module.component.css']
})
export class GroupModuleComponent implements OnInit {
  tableConfig: any;
  visibleSidebar: boolean = true;
  groupFormData: any = groupForm;
  configurations: any;
  data: any;
  formdata: any;
  isdataReady = false;
  constructor(private messageService: MessageService ,private http: GroupModuleService) { }

  ngOnInit(): void {
  }
  isActive(event: string) {
    console.log(event);
    this.http.isActiveData(event).subscribe((data) => {
      this.data = undefined;      
      this.getAllGroup();
    });
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
      this.submitGroup(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
    } else {
      console.log(e);
      this.updateGroup(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }
  confirmAction(e: any) {
    this.deleteGroup(e.actionModuleId);
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully',
    });
    console.log('Deleted' + JSON.stringify(e));
  }
  getAllGroup() {
    this.http.GetAllGroupData().subscribe((res) => {
      this.data = res;
      console.log(this.data);      
      this.isdataReady = true;
      for (let i = 0; i < this.data.length; i++) {
        this.data[i].srNumber = i + 1;
      }
    });
  }

  updateGroup(actionModuleIdInput: any) {
    this.http.updateGroupData(actionModuleIdInput).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
      console.log('data' + data);
    });
  }

  deleteGroup(actionModuleIdInput: any) {
    this.http.deleteGroupData(actionModuleIdInput).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
      console.log('data' + data);  
    });
  }

  submitGroup(actionModuleData: any) {
    this.http.saveGroupData(actionModuleData).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
      console.log('data' + data);
    });
  }
}
