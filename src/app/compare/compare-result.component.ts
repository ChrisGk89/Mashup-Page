import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-compare-result',
  templateUrl: './compare-result.component.html'
})
export class CompareResultComponent implements OnInit {

  @Input() vxu: string;
  @Input() town: string;
  @Input() vxuText: string;
  @Input() townText: string;

  @Output() destroyResult = new EventEmitter();

  constructor() {}

  ngOnInit() {
  }

  destroy() {
    this.destroyResult.emit();
  }

}
