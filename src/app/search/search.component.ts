import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';

import { SearchResultComponent } from './search-result.component';

import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  @ViewChild('target', {read: ViewContainerRef}) target:any;

  cmpArray:Array<any> = []
  cmpRefArray:Array<any> = []
  noResult:boolean = false;

  constructor(public searchService:SearchService, 
              public resolver:ComponentFactoryResolver) { 

  }

  ngOnInit() {
  }

  onSearch(input) {
    let title = input.value || input.placeholder;

    this.searchService.getResults(title)
          .subscribe((response)=>{      
             let responseData = this.parseResponse(response['_body']);
             let items = responseData.query.search;
             this.onSearchResultsComplete(items);
          },
          error => console.error(error)
        )
    }

    onSearchResultsComplete(response) {

         for (let i of this.cmpRefArray) {
         i.destroy();
         }

         if(response == 'null'){
         this.noResult = true;
         }
             else {
                 this.noResult = false;

                 for (let result of response){
                 var t = result.title;
                 var s = result.snippet;

                 this.createComponent(t,s);
                 }
             }
         }

         parseResponse(responseData){
            return JSON.parse(responseData);
         }

         createComponent(s:string,t:string)
         {
         let newComp = this.resolver.resolveComponentFactory(SearchResultComponent);
         let cmpRef = this.target.createComponent(newComp);

         let cmp = cmpRef.instance;
         cmp.name = s;
         cmp.snippet = t;

         this.cmpRefArray.push(cmpRef);
         this.cmpArray.push(cmp);
        }

        destroySearchResult() {
        this.cmpRef.destroy();
  }
}
