import { Component, Input, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import toaster from './toaster.json'
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  toasterData:any;

  @Input() message: any;
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) { }



  ngOnInit() {
    this.toasterData=toaster;
    console.log("toasterData",this.toasterData)
    this.primengConfig.ripple = true;
  }



  onReject() {
    this.messageService.clear('c');
  }
  onConfirm() {
    this.messageService.clear('c');
  }
 

  // showConfirm() {
  //   this.messageService.clear();
  //   this.messageService.add({ key:'c',severity:this.toasterData.severity,summary:this.toasterData.title,detail:this.toasterData.description,life:this.toasterData.life});
  // }



  showConfirm() {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

showTopCenter() {
  this.messageService.add({key: 'tc', severity:'info', summary: 'Info', detail: 'Message Content'});
}
  
}
