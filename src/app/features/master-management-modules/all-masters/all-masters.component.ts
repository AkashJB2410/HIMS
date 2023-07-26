import { Component, Input, OnInit } from '@angular/core';
import tabularData from './all-masters.json';
import allUnitList from './allUnitList.json';
import patientList from './patientConfigCards.json'
import Breadcrumbs from './breadcrumb.json';
import { AllMastersService } from './all-masters.service';
import allDoctorData from './allMSTDoctor.json'

@Component({
  selector: 'app-all-masters',
  templateUrl: './all-masters.component.html',
  styleUrls: ['./all-masters.component.css']
})

export class AllMastersComponent implements OnInit {
  title:any="title"
  items:any= Breadcrumbs
  tabularSideData=tabularData;
  allUnitList:any =allUnitList;
  patientList:any=patientList;
  allDoctorData=allDoctorData;
  allFlag = {
  admiFlag:false,
  disFlag:false,
  billFlag:false,
  docFlag:false,
  emrFlag:false,
  invFlag:false,
  otFlag:false,
  pathFlag:false,
  radFlag:false,
  unitFlag:false,
  nurFlag:false,
  patientFlag:false
  }
  constructor(private allMastersService:AllMastersService) { }

  ngOnInit(): void {
   let  obj=localStorage.getItem('activeTab');
   if(obj){
    this.renderComponents(JSON.parse(obj));
   }
  }

  restFlag(){
    this.allFlag = {
      admiFlag:false,
      disFlag:false,
      billFlag:false,
      docFlag:false,
      emrFlag:false,
      invFlag:false,
      otFlag:false,
      pathFlag:false,
      radFlag:false,
      unitFlag:false,
      nurFlag:false,
      patientFlag:false
      }
  }

  renderComponents(e: any) { 
  localStorage.setItem('activeTab', JSON.stringify(e));
  this.restFlag();
    switch (e.label) {
      case "Admission Configuration": this.allFlag.admiFlag=true; break
      case "Discharge Configuration":  this.allFlag.disFlag=true; break
      case "Billing Configuration":  this.allFlag.billFlag=true; break
      case "Doctor Schedule":  this.allFlag.docFlag=true; break
      case "EMR Configuration":  this.allFlag.emrFlag=true; break
      case "Inventory Configuration": this.allFlag.invFlag=true; break
      case "OT Configuration": this.allFlag.otFlag=true; break
      case "Pathology Configuration": this.allFlag.pathFlag=true; break
      case "Radiology Configuration": this.allFlag.radFlag=true; break
      case "Patient Configuration": this.allFlag.patientFlag=true; break
      case "Unit Configuration": this.allFlag.unitFlag=true; break
      case "Nursing Station Configuration": this.allFlag.nurFlag=true; break
      default:
        break;
    }
  }
}
