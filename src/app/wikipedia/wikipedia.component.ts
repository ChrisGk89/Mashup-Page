//Importing all components outside this file that need to work properly
import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { WikipediaResultComponent } from './wikipedia-result.component';
import { WikipediaService } from './wikipedia.service';


@Component({
  selector: 'app-wikipedia',
  templateUrl: './wikipedia.component.html'
})
export class WikipediaComponent implements OnInit {

  @ViewChild('target', {read: ViewContainerRef}) target:any;

  cmpArray:Array<any> = []
  cmpRefArray:Array<any> = []
  noResult:boolean = false;

  constructor(public wikipediaService:WikipediaService, 
              public resolver:ComponentFactoryResolver) { 

  }

  ngOnInit() {
  }

  //Building the search function that passes the response value in onSearchResultComplete()
  onSearch(input) {
    let title = input.value || input.placeholder;

    this.wikipediaService.getResults(title)
          .subscribe((response)=>{      
             let responseData = this.parseResponse(response['_body']);
             let items = responseData.query.search;
             this.onSearchResultsComplete(items);
          },
          error => console.error(error)
        )
    }

    //onSearchResultComplete create the components that we see as results 
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

         //createComponent push the results in cmpArray and cmpRefArray and used by onSearchResultComplete to create the comonents that we see as a result
         createComponent(s:string,t:string)
         {
         let newComp = this.resolver.resolveComponentFactory(WikipediaResultComponent);
         let cmpRef = this.target.createComponent(newComp);

         let cmp = cmpRef.instance;
         cmp.name = s;
         cmp.snippet = t;

         this.cmpRefArray.push(cmpRef);
         this.cmpArray.push(cmp);
        }

        destroyWikipediaResult() {
        this.cmpRef.destroy();
  }
}
