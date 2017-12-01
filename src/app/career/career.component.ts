import {Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';

import { CareerResultComponent } from './career-result.component';

import { CareerService } from './career.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html'
})
export class CareerComponent implements OnInit {

  @ViewChild('target', {read: ViewContainerRef}) target:any;

  cmpArray:Array<any> = []
  cmpRefArray:Array<any> = []
  noResult:boolean = false;

  constructor(public careerService:CareerService, 
              public resolver:ComponentFactoryResolver) { 

  }

  ngOnInit() {
  }

  onSearch(input) {
    let title = input.value || input.placeholder;

    this.careerService.getJobs(title)
          .subscribe((response)=>{      
             this.onSearchResultsComplete(response);
          },
          error => console.error(error)
        )
    }

    onSearchResultsComplete(response) {

      for (let i of this.cmpRefArray) {
        i.destroy();
      }
      
      if(response.jobs == undefined){
        this.noResult = true;
      }
      else { 
        this.noResult = false;
        
        for (let i = 0; i < response.jobs.length; i++) {
            var c = response.jobs[i].company;
            var t = response.jobs[i].title;
            var d = response.jobs[i].description;
            var l = response.jobs[i].url;
            
            this.createComponent(c,t,d,l);
        }
      }  
    }

    createComponent(c:string,t:string,d:string,l:string)
    {
        let newComp = this.resolver.resolveComponentFactory(CareerResultComponent);
        let cmpRef = this.target.createComponent(newComp);

        let cmp              = cmpRef.instance;
            cmp.company      = c;
            cmp.title        = t;
            cmp.description  = d;
            cmp.url          = l;

        this.cmpRefArray.push(cmpRef);
        this.cmpArray.push(cmp);
    }
}

