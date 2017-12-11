import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';

import { FoursquareResultComponent } from './foursquare-result.component';

import { FoursquareService } from './foursquare.service';

@Component({
  selector: 'app-foursquare',
  templateUrl: './foursquare.component.html',
  styleUrls: ['./foursquare.component.css']
})
export class FoursquareComponent implements OnInit {

  @ViewChild('target', {read: ViewContainerRef}) target:any;

  cmpArray:Array<any> = []
  cmpRefArray:Array<any> = []
  noResult:boolean = false;

  constructor(public foursquareService:FoursquareService, 
              public resolver:ComponentFactoryResolver) { 

  }

  ngOnInit() {
  }


  //Building the search function that passes the response value in onSearchResultComplete()
  onSearch(input) {
    let venues = input.value || input.placeholder;

    this.foursquareService.getResults(venues)
          .subscribe((response)=>{      
             let responseData = this.parseResponse(response['_body']);//Get access to the Angular 2 http response body
             let items = responseData.response.venues;
             this.onSearchResultsComplete(items);
          },
          error => console.error(error)
        )
    }


    //onSearchResultComplete() create the components that we see as results 
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
                 var v = result.name;
                 var t = result.location.address;
                 var c = result.contact.phone;
                 var w = result.url;

                 this.createComponent(v,t,c,w);
                 }
             }
         }

         parseResponse(responseData){
            return JSON.parse(responseData);
         }
         //createComponent push the results in cmpArray and cmpRefArray and used by onSearchResultComplete() to create the comonents that we see as a result
         createComponent(s:string,a:string,c:string,w:string)
         {
         let newComp = this.resolver.resolveComponentFactory(FoursquareResultComponent);
         let cmpRef = this.target.createComponent(newComp);

         let cmp = cmpRef.instance;
         cmp.venues = s;
         cmp.address = a;
         cmp.contact = c;
         cmp.website = w;

         this.cmpRefArray.push(cmpRef);
         this.cmpArray.push(cmp);
        }

        destroyFoursquareResult() {
        this.cmpRef.destroy();
  }
  }
}
