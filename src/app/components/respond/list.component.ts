import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Respond } from "src/app/models/respond.model";
import { RespondRepository } from "src/app/models/respond.repository";
import { LocalStorageService } from 'src/app/models/local-storage.service';

@Component({
    selector: "list",
    templateUrl: "list.component.html"
})

export class RespondListComponent {
    title = 'Respond List';
    surveyid: string ='';
    // respondList: Respond[] = null;

    constructor(private repository: RespondRepository,
        private router: Router,
        activeRoute: ActivatedRoute,
        private localStorageService: LocalStorageService
    ){ 
        this.localStorageService.removeItem('respondList');
        this.surveyid = activeRoute.snapshot.params['id'];
        this.repository.getRespondList(this.surveyid);
    }

    get respondList(): Respond[]{
        return JSON.parse(this.localStorageService.getItem('respondList'));
    }

    createRange(number: number){
        return new Array(number);
    }

    get noResponse():boolean {
        if (this.respondList.length==0)
            return true;
        else return false;

    }

    get processing():boolean{
        if  (this.respondList == null)
            return true;
        else return false;
    }
}
