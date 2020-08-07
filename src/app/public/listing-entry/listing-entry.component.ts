import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { Listing } from '../models';
import { ListingService } from '../services/listing/listing.service';
declare var $: any;

@Component({
    selector: 'sos-listing-entry',
    templateUrl: './listing-entry.component.html',
    styleUrls: ['./listing-entry.component.css'],
    providers: [ListingService]
})
export class ListingEntryComponent implements OnInit {
    @Input() data: Listing;
    @Input() showUser: boolean;
    @Input() showActions: boolean;
    @Output() onDelete = new EventEmitter<number>();
    deleteModal: any;
    fulfillModal: any;

    constructor(private listingService: ListingService, private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.deleteModal = $(this.elementRef.nativeElement).find('.modal-delete');
        this.deleteModal.modal({
            keyboard: false,
            show: false
        });
        this.fulfillModal = $(this.elementRef.nativeElement).find('.modal-fulfill');
        this.fulfillModal.modal({
            keyboard: false,
            show: false
        });
    }

    delete() {
        this.deleteModal.modal('show');
    }

    fulfill() {
        this.fulfillModal.modal('show');
    }

    deleteListing() {
        this.listingService.delete(this.data.id)
            .subscribe(_ => {
                this.onDelete.emit(this.data.id);
            });
    }

    fulfillListing() {
        this.listingService.fulfill(this.data.id, this.data.fulfilled)
            .subscribe(_ => {
            });
    }
}
