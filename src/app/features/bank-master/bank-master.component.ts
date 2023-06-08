import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BankMasterService } from './bank-master.service';
import bank_Master_Table_Config from './bank-master-table-config.json';
import bank_Master_Form from './bank-master-input-update.json'

@Component({
  selector: 'app-bank-master',
  templateUrl: './bank-master.component.html',
  styleUrls: ['./bank-master.component.css']
})
export class BankMasterComponent implements OnInit {

  configurations: any;
  table_Config: any;
  isDataReady: boolean = false;
  visibleSiderbar: boolean = false;
  table_Data: any;
  sidebar_Update_Input: any = bank_Master_Form;
  saveMethod: boolean = false;
  constructor(private messageService:MessageService, private http:BankMasterService) { }

  ngOnInit(): void {
    this.configurations={
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.table_Config = bank_Master_Table_Config
    this.getAllBankMaster();
  }

  getAllBankMaster(){
    this.http.getAllBankMaster().subscribe(item => {
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

  saveBankMaster(data:any){
    this.saveMethod = true;
  }

  editBankMaster(data:any){
  }

  isActive(data:any){
    
    if(data.is_Deleted){
      this.http.reactiveBankMaster(data)
        .subscribe(b_Data => {
          this.table_Data = undefined;
          this.getAllBankMaster();
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Bank Master Enable Successfully' });  
    }
    else if(!data.is_Deleted){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Active' });
    }
  }

  confirmAction(e:any){
    if(e.is_Active==true){
      this.table_Data=undefined;
      this.deleteBankMaster(e);
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Bank Master Disabled Successfully' });
    }
    else if (e.is_Active==false){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Disabled' });
    }
    else{}
  }

  sidebarData(e:any){
    if(e=='reset'){}
    else if (this.saveMethod) {
      this.addBankMaster(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Bank Master Added Successfully' });
      this.saveMethod=false;
    } else {
        this.updateBankMaster(e);
        this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Bank Master Updated Successfully.' });
    }
  }

  addBankMaster(bank_Master:any){
    this.http.addBankMaster(bank_Master)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllBankMaster();
      })
  }

  updateBankMaster(bank_Master:any){
    this.http.updateBankMaster(bank_Master)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllBankMaster();
      })
  }

  deleteBankMaster(bank_Master:any){
    this.http.deleteBankMaster(bank_Master.bankId)
      .subscribe(b_Data => {
        this.getAllBankMaster();
      })
  }
  
}
