import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import masterData from './master.json';
import { MessageService } from 'primeng/api';
import { MasterPageService } from './master-page.service';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css'],
})
export class MasterPageComponent implements OnInit {
  constructor(private http: MasterPageService,private dataService: DataServiceService) { }

  ngOnInit(): void {
  }

  SideNav(e:any){
    console.log("sidenav items =>",e);
      // this.sideBarLabel.emit(e);
      // this.emitData(e);
      this.dataService.emitOutputData(e);
  }

}
