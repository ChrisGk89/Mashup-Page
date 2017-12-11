import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wikipedia-result',
  templateUrl: './wikipedia-result.component.html'
})
export class WikipediaResultComponent implements OnInit {

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
