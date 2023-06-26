import { Component, OnInit, DoCheck } from '@angular/core';
import tabularData from './all-masters.json';
import allUnitList from './allUnitList.json';
import Breadcrumbs from './breadcrumb.json';
import { AllMastersService } from './all-masters.service';


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
  patFlag:false,
  unitFlag:false,
  nurFlag:false
  }
  constructor(private allMastersService:AllMastersService) { }

  ngOnInit(): void {
    console.log(this.allMastersService.getMasterSelector());
    if(this.allMastersService.getMasterSelector()!=null){
      this.renderComponents(this.allMastersService.getMasterSelector());
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
      patFlag:false,
      unitFlag:false,
      nurFlag:false
      }
  }

  renderComponents(e: any) { 
  this.allMastersService.addMasterSelector(e);
    switch (e.label) {
      case "Admission Configuration": this.restFlag(); this.allFlag.admiFlag=true; break
      case "Discharge Configuration": this.restFlag(); this.allFlag.disFlag=true; break
      case "Billing Configuration": this.restFlag(); this.allFlag.billFlag=true; break
      case "Doctor Schedule": this.restFlag(); this.allFlag.docFlag=true; break
      case "EMR Configuration": this.restFlag(); this.allFlag.emrFlag=true; break
      case "Inventory Configuration":this.restFlag(); this.allFlag.invFlag=true; break
      case "OT Configuration":this.restFlag(); this.allFlag.otFlag=true; break
      case "Pathology Configuration":this.restFlag(); this.allFlag.pathFlag=true; break
      case "Radiology Configuration":this.restFlag(); this.allFlag.radFlag=true; break
      case "Patient Configuration":this.restFlag(); this.allFlag.patFlag=true; break
      case "Unit Configuration":this.restFlag(); this.allFlag.unitFlag=true; break
      case "Nursing Station Configutation":this.restFlag(); this.allFlag.nurFlag=true; break
      default:
        break;
    }
  }
}
