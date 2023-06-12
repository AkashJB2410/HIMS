import { Component, OnInit, DoCheck } from '@angular/core';
import tabularData from './all-masters.json'
import allUnit from './allUnit.json'

@Component({
  selector: 'app-all-masters',
  templateUrl: './all-masters.component.html',
  styleUrls: ['./all-masters.component.css']
})
export class AllMastersComponent implements OnInit, DoCheck {

  tabularSideData=tabularData;
  allUnit = allUnit;
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
  constructor() { }

  ngOnInit(): void { 
  }

  ngDoCheck(){
  }

defaultSelecter(e:Object){
  let count:number;
  count++;
  if(count>1){
    this.renderComponents(e);
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
    this.defaultSelecter(e);
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
