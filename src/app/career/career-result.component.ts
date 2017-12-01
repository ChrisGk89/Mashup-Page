import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-career-result',
  templateUrl: './career-result.component.html'
})
export class CareerResultComponent implements OnInit {

  @Input() company:string;
  @Input() title:string;
  @Input() description:string;
  @Input() url:string;

  constructor() { }

  ngOnInit() {
  }

}
