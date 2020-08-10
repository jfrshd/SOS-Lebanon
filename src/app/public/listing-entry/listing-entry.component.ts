import { Component, Input, Output, EventEmitter, OnInit, ElementRef } from '@angular/core';
import { Listing } from '../models';
import { ListingService } from '../services/listing/listing.service';
declare var $: any;

@Component({
    selector: 'app-listing-entry',
    templateUrl: './listing-entry.component.html',
    styleUrls: ['./listing-entry.component.css'],
})
export class ListingEntryComponent implements OnInit {
    @Input() data: Listing;
    @Input() showUser: boolean;
    @Input() showActions: boolean;
    @Output() onDelete = new EventEmitter<string>();
    deleteModal: any;
    fulfillModal: any;

    constructor(
      private listingService: ListingService,
      private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
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

    delete(): void {
        this.deleteModal.modal('show');
    }

    fulfill(): void {
        this.fulfillModal.modal('show');
    }

    deleteListing(): void {
        this.listingService.delete(this.data.id)
            .subscribe(_ => {
                this.onDelete.emit(this.data.id);
            });
    }

    fulfillListing(): void {
        this.listingService.update(this.data)
            .subscribe(_ => {
            });
    }
}
