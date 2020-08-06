import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Listing } from '../models';
import { ListingService } from '../services/listing/listing.service';
import { ListingType } from '../models';
import { ListingTypeService } from '../services/listing-type/listing-type.service';

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css'],
    providers: [ListingService, ListingTypeService]
})
export class ListingComponent implements OnInit, OnDestroy {
    keyword: string;
    type: string;
    types: ListingType[] = [];
    sub: Subscription;
    data: Listing[] = [];

    constructor(private route: ActivatedRoute, private listingService: ListingService,
        private listingTypeService: ListingTypeService) {
    }

    refresh() {
        this.listingService.get(this.type, this.keyword)
            .subscribe(data => this.data = data);
        this.listingTypeService.get()
            .subscribe(data => this.types = data);
    }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => this.type = params['type']);
        this.refresh();
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
