import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit {

  @Input() name:string;
  @Input() snippet:string;

  @Output() destroyResult = new EventEmitter();
  

  constructor() { }

  ngOnInit() {
  }

  destroy() {
    this.destroyResult.emit();
  }

}
