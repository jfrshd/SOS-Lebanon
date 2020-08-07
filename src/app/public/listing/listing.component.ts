import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing, ApiResponse } from '../models';
import { ListingService } from '../services/listing/listing.service';
import { ListingType } from '../models';
import { ListingTypeService } from '../services/listing-type/listing-type.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit, OnDestroy {
    keyword: string;
    type: string;
    types: ListingType[] = [];
    sub: Subscription;
    data: ApiResponse<Listing> = new ApiResponse<Listing>();
    private initialCount = 10;
    count: number = this.initialCount;

    constructor(private route: ActivatedRoute, private listingService: ListingService, private listingTypeService: ListingTypeService) {
    }

    refresh(): void {
        this.listingService.get(this.type)
            .subscribe(data => {
                if (this.keyword) {
                    const keyword = this.keyword.toLocaleLowerCase();
                    data.result.Items = data.result.Items.filter(f =>
                        (
                            f.title.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                            f.description.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                            f.user.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                            f.location.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                            f.phoneNumber.toLocaleLowerCase().indexOf(keyword) !== -1
                        )
                    );
                }

                this.data = data;
            });
        this.listingTypeService.get()
            .subscribe(data => this.types = data.result.Items);
    }

    ngOnInit(): void {
        this.sub = this.route
            .queryParams
            .subscribe(params => this.type = params['type']);
        this.refresh();
    }

    loadMore(): void {
        this.count += this.initialCount;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
