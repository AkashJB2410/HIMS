import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css'],
  animations: [
    trigger('confirm-box', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class ConfirmBoxComponent implements OnInit {

  @Input() visible: any;
  @Input() message: any;
  @Input() show: any = false;
  @Output() confirmAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    if (this.visible == true) {
      this.confirm("")
    }
  }

  confirm(e: any) {
    this.message;
    this.confirmationService.confirm({
      message: this.message.message,
      accept: () => {
        this.confirmAction.emit(true);
      }
    });
    this.confirmationService.confirm({
      message: this.message.message,
      reject: () => {
        this.confirmAction.emit(false);
      }
    });
  }

  confirmEvent(e: any) {
    if (e == "cd.accept()") {
      this.confirmAction.emit(true);
    } else {
      this.confirmAction.emit(false);
    }
  }

}
