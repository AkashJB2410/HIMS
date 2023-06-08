import { Component, OnInit } from '@angular/core';
import tabularData from './all-masters.json'
import allUnit from './allUnit.json'

@Component({
  selector: 'app-all-masters',
  templateUrl: './all-masters.component.html',
  styleUrls: ['./all-masters.component.css']
})
export class AllMastersComponent implements OnInit {

  tabularSideData=tabularData;
  allUnit = allUnit;
  admiFlag:boolean=false;
  disFlag:boolean=false;
  billFlag:boolean=false;
  docFlag:boolean=false;
  emrFlag:boolean=false;
  invFlag:boolean=false;
  otFlag:boolean=false;
  pathFlag:boolean=false;
  radFlag:boolean=false;
  patFlag:boolean=false;
  unitFlag:boolean=false;
  nurFlag:boolean=false;
  tabData=[0,1,2,3,4,5,6,7,8,9,10,11];
  constructor() { }

  ngOnInit(): void {
  }

  renderComponents(e: any) { 
    switch (e.label) {
      case "Admission Configuration": this.admiFlag=true, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "Discharge Configuration": this.admiFlag=false, this.disFlag=true, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "Billing Configuration": this.admiFlag=false, this.disFlag=false, this.billFlag=true, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "Doctor Schedule": this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=true, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "EMR Configuration": this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=true, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "Inventory Configuration": this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=true, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "OT Configuration": this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=true, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "Pathology Configuration":this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=true, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "Radiology Configuration":this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=true, this.patFlag=false, this.unitFlag=false, this.nurFlag=false; break
      case "Patient Configuration":this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=true, this.unitFlag=false, this.nurFlag=false; break
      case "Unit Configuration": this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=true, this.nurFlag=false; break
      case "Nursing Station Configutation":this.admiFlag=false, this.disFlag=false, this.billFlag=false, this.docFlag=false, this.emrFlag=false, this.invFlag=false, this.otFlag=false, this.pathFlag=false, this.radFlag=false, this.patFlag=false, this.unitFlag=false, this.nurFlag=true; break
      default:
        break;
    }

  }

}
