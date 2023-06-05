import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-moreandless',
  templateUrl: './moreandless.component.html',
  styleUrls: ['./moreandless.component.css']
})
export class MoreandlessComponent implements OnInit {

  @Input() text: string;
  @Input() wordLimit: number;
  showMore: boolean;
  num: boolean;
  constructor() {
    this.showMore = false;
  }

  ngOnInit(): void {
    console.log()
    if (typeof this.text == 'string') {
      this.num = true;
    }else{
      this.num = false;
    }
  }

}
