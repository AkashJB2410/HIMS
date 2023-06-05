import { Component, Input, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Input() message:any;

  constructor(private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    this.primengConfig.ripple = true;
    if(this.message.type == 'success'){
      this.showSuccess();
    }
  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }

  showInfo() {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  showWarn() {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

}
