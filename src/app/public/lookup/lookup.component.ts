import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { LookupData } from '../models/lookup-data';
import { LookupDataService } from '../services/lookup-data/lookup-data.service';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './lookup.component.html',
    styleUrls: ['./lookup.component.css'],
    providers: [LookupDataService]
})
export class LookupComponent implements OnInit, OnDestroy {
    keyword: string;
    filter: string;
    filters: string[] = [
        'shelter',
        'medicine',
        'food',
        'other'
    ];
    sub: Subscription;
    data: LookupData[] = [];

    constructor(private route: ActivatedRoute, private lookupService: LookupDataService) {
    }

    refresh() {
        this.lookupService.get(this.filter, this.keyword)
            .subscribe(data => this.data = data);
    }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => this.filter = (params['filter'] || '').toLocaleLowerCase());
        this.refresh();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
