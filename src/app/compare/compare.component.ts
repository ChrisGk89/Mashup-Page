import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';

import { CompareResultComponent } from './compare-result.component';
import { CompareService } from './compare.service';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html'
})

export class CompareComponent implements OnInit {
  @ViewChild('target', {read: ViewContainerRef}) target: any;
  datePlaceholder: string;
  loading: boolean;
  town: string;
  cmp: any;
  cmpRef: any;
  constructor(public compareService: CompareService, public resolver: ComponentFactoryResolver) { }
  ngOnInit() {
    this.initDateElement();
  }
  initDateElement() {
    let date = new Date();
    let dateString = date.getFullYear() + '/';
    dateString += (date.getMonth() + 1) + '/';
    dateString += date.getDate();
    this.datePlaceholder = dateString;
  }
  onSubmit(elmTown, elmDate, $event) {
    if (this.cmpRef) {
      this.destroyCompareResult();
    }
    let date = elmDate.inputText || elmDate.placeholder;
    date = new Date(Date.parse(date));
    this.town = elmTown.value || elmTown.placeholder;
    this.loading = true;
    if (elmDate) {
      this.compareService.getDate(date.getDate(), date.getMonth(), date.getFullYear(), this.town)
        .subscribe((response) => {
            this.onSearchResultsComplete(response);
          },
          error => console.error(error)
        );
    }
  }
  onSearchResultsComplete(data) {
    this.loading = false;
    let newComp = this.resolver.resolveComponentFactory(CompareResultComponent);
    this.cmpRef = this.target.createComponent(newComp);
    this.cmp          = this.cmpRef.instance;
    this.cmp.vxu      = 'Växjö';
    this.cmp.town     = this.town;
    this.cmp.vxuText  = this.validateResult(data.vxuText);
    this.cmp.townText = this.validateResult(data.townText);
    this.cmp.destroyResult.subscribe(() => this.destroyCompareResult());
  }
  validateResult(data) {
    if (data === undefined) {
      data = 'No available weather information found during search.';
    }
    return data;
  }
  destroyCompareResult() {
    this.cmpRef.destroy();
  }
}
