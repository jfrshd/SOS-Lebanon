import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './lookup.component.html'
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

    constructor(private route: ActivatedRoute) {
    }

    refresh(val) {
        alert('refreshed ' + this.filter + ' keyword ' + this.keyword);
    }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => this.filter = (params['filter'] || '').toLocaleLowerCase());
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
