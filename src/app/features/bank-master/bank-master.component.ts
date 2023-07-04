import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BankMasterService } from './bank-master.service';
import bank_Master_Table_Config from './bank-master-table-config.json';
import bank_Master_Form from './bank-master-input-update.json'
import BankMaster_breadcrumb from './bank-master-breadcrumb.json'
import { FormService } from 'src/app/core/shared/service/form.service';

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
  BankMaster_breadcrumb = BankMaster_breadcrumb;

  constructor(private messageService: MessageService, private http: BankMasterService, private form$: FormService) { }

  ngOnInit(): void {
    this.configurations = {
      "isFilter": false,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.table_Config = bank_Master_Table_Config
    this.getAllBankMaster();
  }

  getAllBankMaster() {
    this.http.getAllBankMaster().subscribe(item => {
      this.table_Data = item;
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

  saveBankMaster(data: any) {
    this.saveMethod = true;
    // this.form$.reRenderForm(this.sidebar_Update_Input.form.formControls[0], false, 'isVisible');
    console.log(this.sidebar_Update_Input);
  }

  editBankMaster(data: any) {
  }

  isActive(data: any) {
    if (data.is_Deleted) {
      this.http.reactiveBankMaster(data)
        .subscribe(b_Data => {
          this.table_Data = undefined;
          this.getAllBankMaster();
        })
      this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Bank Master Enable Successfully' });
    }
    else if (!data.is_Deleted) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Active' });
    }
  }

  confirmAction(e: any) {
    if (e.is_Active == true) {
      this.table_Data = undefined;
      this.deleteBankMaster(e);
      this.messageService.add({ severity: 'success', summary: 'Disabled', detail: 'Bank Master Disabled Successfully' });
    }
    else if (e.is_Active == false) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is already Disabled' });
    }
    else { }
  }

  sidebarData(e: any) {
    if (e == 'reset') { }
    else if (this.saveMethod) {
      this.addBankMaster(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Bank Master Added Successfully' });
      this.saveMethod = false;
    } else {
      this.updateBankMaster(e);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Bank Master Updated Successfully.' });
    }
  }

  addBankMaster(bank_Master: any) {
    this.http.addBankMaster(bank_Master)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllBankMaster();
      })
  }

  updateBankMaster(bank_Master: any) {
    this.http.updateBankMaster(bank_Master)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllBankMaster();
      })
  }

  deleteBankMaster(bank_Master: any) {
    this.http.deleteBankMaster(bank_Master.bankId)
      .subscribe(b_Data => {
        this.table_Data = undefined;
        this.getAllBankMaster();
      })
  }

  bulkDeleteRows(bank_Bulk_Data: any) {
    let count = 0;
    if (bank_Bulk_Data != '') {
      bank_Bulk_Data.forEach((bank_Master: any) => {
        if (bank_Master.is_Active == true) {
          this.deleteBankMaster(bank_Master);
          count++;
        }
      });
      if (count == 0) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'The Selected Rows are Already Disabled',
        });
        this.table_Data=undefined;
        this.getAllBankMaster();
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
