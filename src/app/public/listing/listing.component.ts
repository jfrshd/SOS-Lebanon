import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listing, ApiResponse } from '../models';
import { ListingService } from '../services/listing/listing.service';
import { ListingType } from '../models';
import { ListingTypeService } from '../services/listing-type/listing-type.service';
import { Subscription } from 'rxjs';
import { UserLoginService } from 'src/app/service/user-login.service';

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
    public count = 10;
    isSecure = false;

    constructor(
      private route: ActivatedRoute,
      private listingService: ListingService,
      private listingTypeService: ListingTypeService,
      private auth: UserLoginService
    ) {}

    refresh(loadMore: boolean): void {
        this.listingService.get(this.type, this.keyword, this.count, this.data.result.LastEvaluatedKey)
            .subscribe(data => {
                if (loadMore) {
                    this.data.result.ScannedCount += data.result.ScannedCount;
                    this.data.result.Items = [
                        ...this.data.result.Items,
                        ...data.result.Items
                    ];
                    this.data.result.LastEvaluatedKey = data.result.LastEvaluatedKey;
                } else {
                    this.data = new ApiResponse<Listing>(data);
                }
            });
        this.listingTypeService.get()
            .subscribe(data => this.types = new ApiResponse<ListingType>(data).result.Items);

        this.auth.isLoggedIn$.subscribe((isLoggedIn:boolean) => this.isSecure = isLoggedIn);
    }

    ngOnInit(): void {
        this.sub = this.route
            .queryParams
            .subscribe(params => this.type = params['type']);
        this.refresh(false);
    }

    loadMore(): void {
        this.refresh(true);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
