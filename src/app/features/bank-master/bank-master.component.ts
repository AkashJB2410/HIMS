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

  confirmAction(e:any){
    if(e.is_Active==true){
      this.table_Data=undefined;
      this.deleteBankMaster(e);
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Bank Master Disabled Successfully' });
    }
    else{}
  }

  sidebarData(e:any){
    console.log(e);
    
    if (e == 'reset') {
    } else if (e.bankId == true) {
      this.addBankMaster(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Bank Master Added Successfully' });
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
