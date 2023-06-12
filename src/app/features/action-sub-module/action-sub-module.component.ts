import { Component, OnInit } from '@angular/core';
import { ActionSubModuleService } from './action-sub-module.service';
import { MessageService } from 'primeng/api';
import action_Sub_Module_Form from './action-sub-module-input-from.json';
import action_Sub_Module_Table_Config from './action-sub-module-table-config.json'

@Component({
  selector: 'app-action-sub-module',
  templateUrl: './action-sub-module.component.html',
  styleUrls: ['./action-sub-module.component.css']
})
export class ActionSubModuleComponent implements OnInit {

  configurations: any;
  table_Config: any;
  isDataReady: boolean = false;
  visibleSiderbar: boolean = false;
  table_Data: any;
  sidebar_Update_Input: any = action_Sub_Module_Form;
  saveMethod: boolean = false;
  constructor(private messageService:MessageService, private http:ActionSubModuleService) { }

  ngOnInit(): void {
    this.configurations={
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.table_Config = action_Sub_Module_Table_Config
    this.getAllActionSubModule();
  }

  getAllActionSubModule(){
    this.http.getAllActionSubModule().subscribe(item => {
      this.table_Data = item;
      this.isDataReady=true;
      for(let i=0; i<this.table_Data.length;i++){
        this.table_Data[i].srNo=i+1;
      }
      this.table_Data;
    })
  }

  editRow(e:any){
    this.visibleSiderbar=true;
  }

  saveActionSubModule(data:any){
    this.saveMethod = true;
  }

  editActionSubModule(data:any){
  }

  isActive(data:any){
    if(data.is_Deleted){
      this.http.reactiveActionSubModule(data)
        .subscribe(b_Data => {
          this.table_Data = undefined;
          this.getAllActionSubModule();
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Action Sub Module Enable Successfully' });  
    }
    else if(!data.is_Deleted){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Action Sub Module is already Active' });
    }
  }

  confirmAction(e:any){
    if(e.is_Active==true){
      this.table_Data=undefined;
      this.deleteActionSubModule(e);
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Action Sub Module Disabled Successfully' });
    }
    else if (e.is_Active==false){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Action Sub Module is already Disabled' });
    }
    else{}
  }

  sidebarData(e:any){
    if(e=='reset'){}
    else if (this.saveMethod) {
      this.addActionSubModule(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Action Sub Module Added Successfully' });
      this.saveMethod=false;
    } else {
        this.updateActionSubModule(e);
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Action Sub Module Updated Successfully.' });
    }
  }

  addActionSubModule(sub_Module:any){
    this.http.addActionSubModule(sub_Module)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllActionSubModule();
      })
  }

  updateActionSubModule(sub_Module:any){
    this.http.updateActionSubModule(sub_Module)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllActionSubModule();
      })
  }

  deleteActionSubModule(sub_Module:any){
    this.http.deleteActionSubModule(sub_Module.asmId)
      .subscribe(b_Data => {
        this.getAllActionSubModule();
      })
  }

}
