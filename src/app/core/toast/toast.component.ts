import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import toaster from './toaster.json'
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']

})
export class ToastComponent implements OnInit {
  toasterData: any;

  @Input() message: any;
  confirmationService: any;
  constructor(private messageService: MessageService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.toasterData = toaster;
    this.primengConfig.ripple = true;
  }
  showMessage() {
    this.messageService.add({severity:this.toasterData.severity, summary: this.toasterData.title, detail:this.toasterData.description,life:this.toasterData.life,sticky:true});
}
}
