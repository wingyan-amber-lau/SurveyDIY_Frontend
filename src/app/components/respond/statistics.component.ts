import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Statistics } from "src/app/models/statistics.model";
import { RespondRepository } from "src/app/models/respond.repository";
import { LocalStorageService } from 'src/app/models/local-storage.service';

@Component({
    selector: "statistics",
    templateUrl: "statistics.component.html"
})

export class RespondStatisticsComponent {
    title = 'Respond Statistics';
    surveyid: string = '';
    //respondStatistic : Statistics[] = null;

    constructor(private repository: RespondRepository,
        private router: Router,
        activeRoute: ActivatedRoute,
        private localStorageService: LocalStorageService
    ){
        this.localStorageService.removeItem('respondStat');
        this.surveyid = activeRoute.snapshot.params['id'];
        this.repository.getRespondStatistics(this.surveyid);
    }

    get respondStatistic(): Statistics[]{
        return JSON.parse(this.localStorageService.getItem('respondStat'));
    }

    //Print Page
    printThisPage() {
        window.print();
    }

    get noResponse():boolean {
        if (this.respondStatistic[0]?.surveyStatistics.length==0)
            return true;
        else return false;

    }

    get processing():boolean{
        if  (this.respondStatistic == null)
            return true;
        else return false;
    }
}
