import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css'],
})
export class CaptchaComponent implements OnInit {
  formGroup: FormGroup;
  uniquechar = '';
  values = '';
  captcha: any;
  @Output() captchaEmitData = new EventEmitter<any>();
  constructor(private messageService: MessageService, public fb: FormBuilder, private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.generate();
  }
  generate() {
    this.values='';
    this.uniquechar = '';
    const randomchar =
      'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789';
    for (let i = 1; i < 5; i++) {
      this.uniquechar += randomchar.charAt(Math.random() * randomchar.length);
    }
  }
 
  submit(e: any) {
    this.values = e.target.value;
    if (this.uniquechar === this.values) {
      this.captchaEmitData.emit(true);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Invalid captcha', });
      this.captchaEmitData.emit(false);
    }
  }
}

