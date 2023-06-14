import {
  Component,
  OnInit
} from '@angular/core';
import actionRoleData from './action-role.json';
import {
  ActionRoleService
} from './action-role.service';
import actionroleTableConfig from './actionRole-tableConfig.json'
import {
  MessageService
} from 'primeng/api';
import actionroleFormData from './action-role.json'

@Component({
  selector: 'app-action-role',
  templateUrl: './action-role.component.html',
  styleUrls: ['./action-role.component.css']
})
export class ActionRoleComponent implements OnInit {

  toast: any = {};
  showToast: any;
  Message: any;
  data: any = [];
  actionRole: any = [] = [];
  config: any;
  visibleSidebar: boolean = false;
  configurations: any;
  tableConfig: any;
  isdataReady = false;
  bulkdelete: any;
  sidebarJSON: any = actionroleFormData;
  formdata: any;
  saveMethod: boolean = false;
  editMethod: boolean = false;
  flagAdd: boolean = false;
  flagApprove: boolean = false;
  flagView: boolean = false;
  flagDelete: boolean = false;
  flagEdit: boolean = false;
  flagSearch: boolean = false;


  constructor(private messageService: MessageService, private http: ActionRoleService) { }

  ngOnInit(): void {
    this.assignDropDownOptions();
    this.configurations = {
      "isFilter": true,
      "isTable": true,
      "isSideBar": true,
      "isConfirmation": true
    };
    this.getAllActionRoleData();
    this.getConfigForTable();
  }

  assignDropDownOptions() {
    this.formdata = Object.assign({}, actionroleFormData);
    this.formdata.form.formControls.forEach((data: any) => {
      if (data.formControlName === "selectRole") {
        data.values = [];
        let defaultObj = {
          "name": "Select Role",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllMstRoleData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.roleName,
              "code": e.roleId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectActionModule") {
        data.values = [];
        let defaultObj = {
          "name": "Select Action Module",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllActionModuleData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.actionModuleName,
              "code": e.actionModuleId
            }
            data.values.push(obj);
          })
        })
      }
      if (data.formControlName === "selectActionSubModule") {
        data.values = [];
        let defaultObj = {
          "name": "Select Action Sub Module",
          "code": ""
        }
        data.values.push(defaultObj);
        this.http.GetAllActionSubModuleData().subscribe(item => {
          item.forEach((e: any) => {
            let obj = {
              "name": e.actionSubModuleName,
              "code": e.asmId
            }
            data.values.push(obj);
          })
        })
      }
    })
  }

  // isActive(data:any){
    
  //   if(data.is_Deleted){
  //     this.http.reactiveOrgData(data)
  //       .subscribe(b_Data => {
  //         this.data = undefined;
  //         this.getAllActionRoleData();
  //       })
  //       this.messageService.add({ severity: 'success', summary: 'Enable', detail: 'Organization Enable Successfully' });  
  //   }
  //   else if(!data.is_Deleted){
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Organization is already Active' });
  //   }
  // }
  getAllActionRoleData() {
    this.actionRole = [];
    this.data = undefined;
    this.http.GetAllActionRoleData().subscribe(res => {
      console.log(res);
      res.forEach((e: any) => {
        console.log("res data =>", e)
        let obj = {
          "arId": e.arId,
          "arRoleId": e.arRoleId.roleId,
          "asmActionModuleId": e.arActionSubModuleMst.asmActionModuleId.actionModuleId,
          "arActionSubModuleMst_Id": e.arActionSubModuleMst.asmId,
          "arAdd": e.arAdd,
          "arApprove": e.arApprove,
          "arDelete": e.arDelete,
          "arEdit": e.arEdit,
          "arSearch": e.arSearch,
          "arView": e.arView,
          // "arAdd": this.flagAdd,
          // "arApprove": this.flagApprove,
          // "arDelete": this.flagDelete,
          // "arEdit": this.flagEdit,
          // "arSearch": this.flagSearch,
          // "arView": this.flagView,
          "is_Active": e.is_Active,
          "arRoleId_Name": e.arRoleId.roleName,
          "arActionModuleMst": e.arActionSubModuleMst.asmActionModuleId.actionModuleName,
          "arActionSubModuleMst": e.arActionSubModuleMst.actionSubModuleName,

        }
        this.actionRole.push(obj);
      })
      this.data = [...this.actionRole];
      console.log("data", this.data)
      this.isdataReady = true;
    })
  }

  getConfigForTable() {
    this.config = actionroleTableConfig;
  }

  editRow(e: any) {
    this.visibleSidebar = true;
  }

  confirmAction(e: any) {
    this.deleteActionRoleData(e.arId);
    // this.data = undefined;
    this.messageService.add({
      severity: 'success',
      summary: 'Message form User component',
      detail: 'Deleted Sucessfully'
    });
    console.log("Deleted" + JSON.stringify(e))
  }

  submitActionRoleData(roleData: any) {
    let obj = {
      // "arId": data.idInput,
      "arActionSubModuleMst": {
        "asmId": roleData.selectActionSubModule
      },
      "arRoleId": {
        "roleId": roleData.selectRole
      },
      "arAdd": this.flagAdd,
      "arView": this.flagView,
      "arEdit": this.flagEdit,
      "arDelete": this.flagDelete,
      "arSearch": this.flagSearch,
      "arApprove": this.flagApprove


    }
    this.http.saveActionRoleData(obj)
      .subscribe(data => {
        this.data = undefined;
        this.getAllActionRoleData();
        console.log("data" + data)
      })
  }

  updateActionRoleData(roleData: any) {
    this.http.updateActionRoleData(roleData)
      .subscribe(data => {
        this.data = undefined;
        this.getAllActionRoleData();
        console.log("data" + data)
      })
  }

  deleteActionRoleData(roleId: any) {
    this.http.deleteActionRoleData(roleId)
      .subscribe(data => {
        this.data = undefined;
        this.getAllActionRoleData();
        this.data.splice(roleId)
        console.log("data" + data)
      })
  }

  sidebarData(e: any) {
    if (e == 'reset') { }
    else if (this.saveMethod) {
      this.submitActionRoleData(e);
      this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Action Role Added Successfully' });
      this.saveMethod = false;
    } else {
      this.updateActionRoleData(e);
      this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Action Role Updated Successfully.' });
    }
  }

  saveActionRole(data: any) {
    this.saveMethod = true;
  }

  editActionRole(e: any) {
    this.editMethod = true;
  }

  BulkDeleteRow(e: any) {
    //   e.forEach((ele: any) => {
    //     this.http.deleteActionRoleData(ele.roleId)
    //       .subscribe(data => {
    //         // this.data = undefined;
    //         this.getAllActionRoleData();
    //         console.log("data" + data)
    //       });
    //   });
    //   console.log("Deleted data =>", e);
    // }
  }

  changeCheckBox(e: any) {
    e.forEach((res: any) => {
      console.log("chnage event ", e)
      res.checked.forEach((a: any) => {
        if (a == "app") {
          console.log("event is app")
          this.flagApprove = true;
        }
        else if (a == "add") {
          console.log("Add event ")
          this.flagAdd = true;
        }
        else if (a == "edit") {
          console.log(" edit event")
          this.flagEdit = true;
        }
        else if (a == "del") {
          console.log("Delete event")
          this.flagDelete = true;
        }
        else if (a == "view") {
          console.log("View event")
          this.flagView = true;
        }
        else if (a == "search") {
          console.log("Search event")
          this.flagSearch = true;
        }
        // else if(a==""){
        //   this.flagApprove = false;
        //   this.flagAdd = false;
        //   this.flagEdit = false;
        //   this.flagDelete = false;
        //   this.flagView = false;
        //   this.flagSearch = false;

        // }

      })
    })
  }

}