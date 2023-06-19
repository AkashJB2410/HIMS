import { Component, OnInit } from '@angular/core';
import groupForm from './group_form.json';
import groupTable from './groupTableConfig.json';
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
  groupData: any = [];
  flag: any;
  constructor(private messageService: MessageService, private http: GroupModuleService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.tableConfig = groupTable;
    // this.getConfigForTable();
    this.getAllGroup();
    this.assignOptions();
  }

  onAdd(e: any) {
    this.flag = e;
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

  getConfigForTable() {
    this.tableConfig = groupTable;
  }
  addRow(e: any) {
    this.visibleSidebar = true;
  }
  BulkDeleteRows(e: any) {
    this.groupData = [];
 
    if (e != '') {
      e.forEach((data:any) => {
        if(data.is_Active!=false){
        let obj ={
          "groupId": data.groupId,
        }
        this.deleteGroup(obj.groupId);
      } else{
        this.messageService.add({
          severity: 'error',
          summary: 'selected Rows',
          detail: ' Deleted.',
        });
      }
      });
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Delete All Data successfull.',
      });
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'select Rows',
        detail: 'Rows are not selected.',
      });
    }
 
  }
  sidebarData(e: any) {
    console.log('From User Management ==> ', e);
    if (e != 'reset') {
      if (this.flag == "edit") {
        console.log(e);
        this.updateGroup(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data updated successfull.',
        });
      } else {
        console.log(e);
        this.submitGroup(e);
        this.messageService.add({
          severity: 'success',
          summary: 'success',
          detail: 'Data save successfull.',
        });
      }
    }
  }

  confirmAction(e: any) {
    if(e != false){
    this.deleteGroup(e.groupId);
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully',
    });
  }
  }

  getAllGroup() {
    this.data = undefined;
    this.groupData = [];
    this.http.GetAllGroupData().subscribe((res) => {
      // for (let i = 0; i < this.data.length; i++) {
      //   this.data[i].srNumber = i + 1;
      // }
      res.forEach((e: any) => {
        let obj = {
          "groupId": e.groupId,
          "mstModule": e.mstModule.moduleId,
          "lable": e.lable,
          "icon": e.icon,
          "routerLink": e.routerLink,
          "sequence": e.sequence,
          "is_Active": e.is_Active,
          "mstModule_name": e.mstModule.label,
        }
        this.groupData.push(obj);
        console.log("objet ==>", obj);
      })
      this.data = [...this.groupData];
      this.isdataReady = true;
    })
  }

  updateGroup(groupId: any) {
    this.http.updateGroupData(groupId).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
      console.log('data' + data);
    });
  }

  deleteGroup(groupId: any) {
    this.http.deleteGroupData(groupId).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
      console.log('data' + data);
    });
  }

  submitGroup(groupId: any) {
    this.http.saveGroupData(groupId).subscribe((data) => {
      this.data = undefined;
      this.getAllGroup();
      console.log('data' + data);
    });
  }

  assignOptions() {
    this.formdata = Object.assign({}, groupForm);
    this.formdata.form.formControls.forEach((data: any) => {
      data.values = [];
      if (data.formControlName === "selectmstModule") {
        let defaultObj = {
          "name": "Select Master Module",
          "code": "0"
        }
        data.values.push(defaultObj);
        this.http.GetAllMasterModuleData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.label,
              "code": e.moduleId
            }
            data.values.push(obj);
          })
        })
      }
    })
  }
}