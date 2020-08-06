import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Listing } from '../models';
import { ListingService } from '../services/listing/listing.service';

@Component({
    selector: 'sos-listing-entry',
    templateUrl: './listing-entry.component.html',
    styleUrls: ['./listing-entry.component.css'],
    providers: [ListingService]
})
export class ListingEntryComponent {
    @Input() data: Listing;
    @Input() showUser: boolean;
    @Input() showActions: boolean;
    @Output() onDelete = new EventEmitter<number>();

    constructor(private listingService: ListingService) {
    }

    delete() {
        debugger
        this.listingService.delete(this.data.id)
            .subscribe(_ => {
                debugger
                this.onDelete.emit(this.data.id);
            });
    }

    fulfill() {
        this.listingService.fulfill(this.data.id, this.data.fulfilled)
            .subscribe(_ => {
            });
    }
}
