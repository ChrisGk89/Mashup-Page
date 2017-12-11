import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-foursquare-result',
  templateUrl: './foursquare-result.component.html'
})
export class FoursquareResultComponent implements OnInit {

  @Input() venues:string;
  @Input() address:string;

  @Output() destroyResult = new EventEmitter();  

  constructor() { }

  ngOnInit() {
  }

  destroy() {
    this.destroyResult.emit();
  }

}
