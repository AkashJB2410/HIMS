import { BankBranchMasterService } from './bank-branch-master.service';
import { Component, OnInit } from '@angular/core';
import table from './bankBranchMasterTableConfig.json';
import addnew from './bankBranchMasterSidebarConfig.json';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bank-branch-master',
  templateUrl: './bank-branch-master.component.html',
  styleUrls: ['./bank-branch-master.component.css'],
})
export class BankBranchMasterComponent implements OnInit {
  saveMethod: boolean;
  status:boolean;
  isDelete: boolean;
  // isActive(event: string) {
  //   console.log(event);
  //   this.http.isActiveData(event).subscribe((data) => {
  //     this.data = undefined;      
  //     this.getAllBankBranch();
  //     if(this.status==false){
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'error',
  //         detail: ' Allready updated.',
  //       });
        
  //     }
  //     if(this.status==true){
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'success',
  //         detail: 'updated successfuly',
  //       });
  //       this.status=false
  //       // this.isDelete=true
  //     }
      
  //   });
  // }


  isActive(data:any){
    if(!data.is_Active){
      this.http.isActiveData(data)
        .subscribe(b_Data => {
          this.data = undefined;
          this.getAllBankBranch();
        })
        this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Bank Branch Enable Successfully' });  
    }
    else if(data.is_Active){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Branch is already Active' });
    }
  }
  data1: any;
  editBankMaster(data: any) {
    addnew.form.formControls[1].isEditable=false;
  }

  table: any;
  visibleSidebar: boolean = true;
  addNew: any = addnew;
  configurations: any;
  data: any;
  isdataReady = false;
  formData: any;
  branch: any = [];
  constructor(
    private messageService: MessageService,
    private http: BankBranchMasterService
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

  saveBankMaster(data: any) {
    this.saveMethod = true;
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

    // this.http.getAllBankMasterData().subscribe((res) => {
    //   // console.log(this.data);
    //   // console.log(res);
    //   this.data.values = [];
    //   let Obj = {
    //     name: 'Select Role',
    //     code: '0',
    //   };
    //   this.data.values.push(Obj);
    //   // console.log(this.data);
    //   this.addNew.form.formControls[2].values = this.data.values;
    //   res.forEach((e: any) => {
    //     let obj1 = {
    //       name: e.bankName,
    //       code: e.bankId,
    //     };
    //     this.data.values.push(obj1);
    //   });
    // });
  }

  // getAllBankBranch() {
  //   this.http.getAllBankBranchData().subscribe((res) => {

  //     this.data = res;
  //     this.isdataReady = true;
  //     for (let i = 0; i < this.data.length; i++) {
  //       this.data[i].srNumber = i + 1;
  //       this.data[i].smtId = this.data[i].bbBankId.bankName;
  //       this.data[i].id=this.data[i].bbBankId.bankId;
  //     }
  //     console.log("back =>",this.data)

  //   });
  // }

  getAllBankBranch() {
    this.branch = [];
    this.data = undefined;
    this.http.getAllBankBranchData().subscribe((res) => {
      res.forEach((e: any) => {
        console.log('res data =>', e);
        let obj = {
          "bbId": e.bbId,
          "bbBankId": e.bbBankId.bankId,
          "bankBranchName": e.bankBranchName,          
          "is_Active": e.is_Active,
          "bbBankId_name": e.bbBankId.bankName,
        };
        this.branch.push(obj);
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
      this.status==false
    });
    
  }
  confirmAction(e: any) {
    
    console.log('Deleted' + JSON.stringify(e));

    if(e.is_Active==true){
      this.deleteBankBranch(e.bbId);  
      this.messageService.add({ severity: 'success', summary: 'success', detail: 'Bank Master is already Disabled' });

    }
    else if(e.is_Active==false){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Bank Master is Disabled' });

    }
  }

  submitBankBranch(bankBranchData: any) {
    this.http.saveBankBranchData(bankBranchData).subscribe((data) => {
      this.data = undefined;
      this.getAllBankBranch();
    });
  }
}
