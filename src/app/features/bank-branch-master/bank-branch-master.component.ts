import { BankBranchMasterService } from './bank-branch-master.service';
import { Component, OnInit } from '@angular/core';
import table from './bankBranchMasterTableConfig.json';
import addnew from './bankBranchMasterSidebarConfig.json';
import { MessageService } from 'primeng/api';
import bank_branch_master_breadcrumb from './bank-branch-master-breadcrumb.json';
import { CommonService } from 'src/app/core/shared/service/common.service';

@Component({
  selector: 'app-bank-branch-master',
  templateUrl: './bank-branch-master.component.html',
  styleUrls: ['./bank-branch-master.component.css'],
})
export class BankBranchMasterComponent implements OnInit {
  saveMethod: boolean;
  status: boolean;
  isDelete: boolean;
  editData: any;


  changeEvents(e:any){
    // let defaultObj = {
    //   name: e[0],
    //   code: e[0]
    // };
    // console.log(e)
    // addnew.form.formControls[1].values[0]=defaultObj;

  }

  isActive(data: any) {
    if (!data.is_Active) {
      this.http.isActiveData(data).subscribe((b_Data) => {
        this.data = undefined;
        this.getAllBankBranch();
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Enable',
        detail: 'Bank Branch Enable Successfully',
      });
    } else if (data.is_Active) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bank Branch is already Active',
      });
    }
  }
  data1: any;
  onEdit(data: any) {
    addnew.form.formControls[1].isEditable = false;
    this.editData = data.editRow;
    this.status = false;
  }

  table: any;
  visibleSidebar: boolean = true;
  addNew: any = addnew;
  configurations: any;
  data: any;
  isdataReady = false;
  formData: any;
  branch: any = [];
  bank_branch_master_breadcrumb = bank_branch_master_breadcrumb;

  constructor(
    private messageService: MessageService,
    private http: BankBranchMasterService,
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
    this.getAllBankBranch();
    this.assigneDropdown();
  }

  getConfigForTable() {
    this.table = table;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
    console.log(e);
  }

  addRow(e: any) {
    this.visibleSidebar = true;
  }
  buttonEvent(e: any) {
    this.editData = undefined;
    this.common.sendEditData(false);
  }

  onAdd(data: any) {
    this.saveMethod = true;
    this.editData = [];
    this.common.sendEditData(false);
    this.status = true;
  }

  sidebarData(e: any) {
    if (e == 'reset') {
    } else if (this.saveMethod == true) {
      console.log(e);
      this.submitBankBranch(e);
      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data save successfull.',
      });
      this.saveMethod = false;
    } else {
      this.updateBankBranch(e);
      console.log(e);

      this.messageService.add({
        severity: 'success',
        summary: 'success',
        detail: 'Data updated successfull.',
      });
    }
  }

  assigneDropdown() {
    this.formData = Object.assign({}, addnew);
    this.formData.form.formControls.forEach((data: any) => {
      if (data.formControlName === 'bankName') {
        data.values = [];
        let defaultObj = {
          name: 'Select Master Bank',
          code: '',
        };
        data.values.push(defaultObj);
        this.http.getAllBankMasterData().subscribe((res) => {
          res.forEach((e: any) => {
            let obj1 = {
              name: e.bankName,
              code: e.bankId,
            };
            data.values.push(obj1);
          });
        });
      }
    });
  }

  Bulkdelete(e: any) {
    if (e.length == 1) {
      if (e[0].is_Active == true) {
        this.deleteBankBranch(e[0].bbId);
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
        if (e[i].is_Active == true) {
          this.deleteBankBranch(e[i].bbId);
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

  getAllBankBranch() {
    this.branch = [];
    this.data = undefined;
    this.http.getAllBankBranchData().subscribe((res) => {
      res.forEach((e: any) => {
        console.log('res data =>', e);
        let obj = {
          bbId: e.bbId,
          bbBankId: e.bbBankId.bankId,
          bankBranchName: e.bankBranchName,
          is_Active: e.is_Active,
          bbBankId_name: e.bbBankId.bankName,
        };
        this.branch.push(obj);
        for (let i = 0; i < this.branch.length; i++) {
          this.branch[i].id = i + 1;
        }
      });
      this.data = [...this.branch];
      console.log('data =>', this.data);
      this.isdataReady = true;
    });
  }

  updateBankBranch(bbId: any) {
    this.http.updateBankBranchData(bbId).subscribe((data) => {
      this.data = undefined;
      this.getAllBankBranch();
      console.log(data);
    });
  }

  deleteBankBranch(bbId: any) {
    this.http.deleteBankBranchData(bbId).subscribe((data) => {
      this.data = undefined;
      this.getAllBankBranch();
      this.status == false;
    });
  }
  confirmAction(e: any) {
    if (e == false) {
      this.getAllBankBranch();
    } else {
      if (e.is_Active == false) {
        this.messageService.add({
          severity: 'error',
          summary: 'Message form User component',
          detail: 'Allready Deleted',
        });
      } else {
        this.deleteBankBranch(e.bbId);
        this.messageService.add({
          severity: 'success',
          summary: 'Message form User component',
          detail: 'Deleted Sucessfully',
        });
      }
    }
    console.log('Deleted' + JSON.stringify(e));
  }

  submitBankBranch(bankBranchData: any) {
    this.http.saveBankBranchData(bankBranchData).subscribe((data) => {
      this.data = undefined;
      this.getAllBankBranch();
    });
  }
}
