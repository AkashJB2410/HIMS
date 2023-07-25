import { Component, OnInit } from '@angular/core';
import { SuperSpecialityService } from './super-speciality.service';
import { MessageService } from 'primeng/api';
import { CommonService } from 'src/app/core/shared/service/common.service';
import breadcrumb from './super-speciality-breadcrumb.json';
import speciality_Table_Config from './super-speciality-tableConfig.json';
import speciality_Form from './super-speciality.json'

@Component({
  selector: 'app-super-speciality',
  templateUrl: './super-speciality.component.html',
  styleUrls: ['./super-speciality.component.css']
})
export class SuperSpecialityComponent implements OnInit {

 data:any;
 speciality:any =[];
 config: any;
 configurations: any;
 table_Config: any;
 isDataReady: boolean = false;
 visibleSiderbar: boolean = false;
 table_Data: any;
 sidebar_Update_Input: any = speciality_Form;
 breadcrumb = breadcrumb;
 editData: any
 flag: any;
 constructor(private http: SuperSpecialityService, private messageService: MessageService, private common: CommonService) {}

 ngOnInit(): void {
   this.configurations = {
     "isFilter": false,
     "isTable": true,
     "isSideBar": true,
     "isConfirmation": true
   };

   this.getConfigForTable();
   this.getAllSuperSpeciality();
 }

 getConfigForTable() {
   this.config = speciality_Table_Config;
 }

 onAdd(e: any) {
   this.editData = []
   this.flag = e.add;
 }

 getAllSuperSpeciality() {
   this.data = undefined;
   this.speciality = [];
   this.http.getAllSuperSpeciality().subscribe(res => {
     console.log('All data=>', res)
     res.forEach((e: any, index: any) => {
       let obj = {
         "id": index,
         "ssName": e.ssName,

         "is_Active": e.is_Active,
         "ssId": e.ssId,

       }
       this.speciality.push(obj)
     })
     this.data = [...this.speciality];
     this.isDataReady = true;
     console.log('All data=>', this.data)
     for (let i = 0; i < this.data.length; i++) {
       this.data[i].srNumber = i + 1;
     }
   })

   this.isDataReady = true;
 }

 buttonEvent(e: any) {
   this.editData = undefined;
   this.common.sendEditData(false);
 }

 editRow(e: any) {
   this.visibleSiderbar = true;
   console.log(e);
 }

 addRow(e: any) {
   this.visibleSiderbar = true;
 }

 onEdit(e: any) {
   this.editData = e.editRow;
   this.flag = false;
 }
 
 isActive(event: string) {
  //  this.http.reactiveDepartment(event).subscribe((data) => {
  //    this.data = undefined;
  //    this.getAllDepartment();
  //  });
 }

 confirmAction(e: any) {
  //  if (e.is_Active == true) {
  //    // this.table_Data = undefined;
  //    this.deleteDepartment(e.departmentId);
  //    this.messageService.add({
  //      severity: 'success',
  //      summary: 'Disabled',
  //      detail: 'Department Disabled Successfully'
  //    });
  //  } else if (e.is_Active == false) {
  //    this.messageService.add({
  //      severity: 'error',
  //      summary: 'Error',
  //      detail: 'Department is already Disabled'
  //    });
  //  } else {}
 }

 closeSidebarData(e: any) {
  //  this.editData = undefined;
 }

 sidebarData(e: any) {
  //  if (e != 'reset') {
  //    if (this.flag == "add") {
  //      this.addDepartment(e);
  //      console.log("sidebardata =>", e)
  //      this.messageService.add({
  //        severity: 'success',
  //        summary: 'Added',
  //        detail: 'Department Added Successfully'
  //      });
  //      this.flag = false;
  //    } else {
  //      this.updateDepartment(e);
  //      this.messageService.add({
  //        severity: 'success',
  //        summary: 'Updated',
  //        detail: 'Department Updated Successfully.'
  //      });
  //    }
  //  }
 }

 addDepartment(department: any) {
  //  this.http.addDepartment(department)
  //    .subscribe(b_Data => {
  //      this.table_Data = undefined;
  //      this.getAllDepartment();
  //      console.log("data" + b_Data)

  //    })
 }

 updateDepartment(e: any) {
  //  this.http.updateDepartment(e)
  //    .subscribe(d_Data => {
  //      console.log('update fill=>', e)
  //      this.table_Data = undefined;
  //      this.getAllDepartment();
  //      console.log("data" + d_Data)
  //    })
 }

 deleteDepartment(e: any) {
  //  this.http.deleteDepartment(e)
  //    .subscribe(d_Data => {
  //      this.data = undefined;
  //      this.getAllDepartment();
  //      console.log("data" + d_Data)
  //    })
 }

 BulkDeleteRow(e: any) {
  //  this.data = [];
  //  if (e != '') {
  //    e.forEach((data: any) => {
  //      let obj = {
  //        "departmentId": data.departmentId,
  //      }
  //      this.deleteDepartment(obj.departmentId);
  //    });

  //  } else {
  //    this.messageService.add({
  //      severity: 'error',
  //      summary: 'select Rows',
  //      detail: 'Rows are not selected.',
  //    });
  //  }
 }

}
