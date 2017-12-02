import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

onSearch(input) {
    let title = input.value || input.placeholder;

    this.localService.getvenues(title)
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
