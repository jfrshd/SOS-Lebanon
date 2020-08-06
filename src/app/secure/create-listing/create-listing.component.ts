import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Listing } from '../../public/models';
import { ListingService } from '../../public/services/listing/listing.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'sos-create-listing',
    templateUrl: './create-listing.component.html',
    // styleUrls: ['./create-listing.component.css'],;
    providers: [ListingService]
})
export class CreateListingComponent implements OnInit, OnDestroy {
    id: number;
    sub: Subscription;
    data: Listing;

    constructor(private listingService: ListingService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.id = params['id'];
                this.listingService.getById(this.id)
                    .subscribe(data => this.data = data);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
