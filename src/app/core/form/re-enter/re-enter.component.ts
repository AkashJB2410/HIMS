import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-re-enter',
  templateUrl: './re-enter.component.html',
  styleUrls: ['./re-enter.component.css'],
})
export class ReEnterComponent implements OnInit {
  password: any = '';
  repassword: any = '';
  @Output() confirmPass = new EventEmitter<any>();
  constructor(private toast: MessageService) { }
  ngOnInit(): void { }

  pass(e: any) {
    this.password = e.target.value;
    if (this.repassword != '') {
      if (this.password != this.repassword) {
        this.toast.add({ severity: 'error', summary: '', detail: 'Passwords did not match', });
      }
    }
  }

  repass(e: any) {
    this.repassword = e.target.value;
    if (this.password == this.repassword) {
      this.confirmPass.emit(this.password);
    } else {
      this.toast.add({ severity: 'error', summary: '', detail: 'Passwords did not match', });
    }
  }
}
