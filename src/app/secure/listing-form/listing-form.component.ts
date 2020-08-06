import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Listing} from '../../public/models';
import {ListingService} from '../../public/services/listing/listing.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListingTypeService} from '../../public/services/listing-type/listing-type.service';
import {ListingLocationService} from '../../public/services/listing-location/listing-location.service';

@Component({
    selector: 'sos-listing-form',
    templateUrl: './listing-form.component.html',
    styleUrls: ['./listing-form.css'],
    providers: [ListingService, ListingTypeService, ListingLocationService],
    encapsulation: ViewEncapsulation.None
})
export class ListingFormComponent implements OnInit, OnDestroy {
    id: number;
    sub: Subscription;
    data: Listing = {};
    form: FormGroup
    errorMessage;
    listingTypes = []
    locations = []

    constructor(private listingService: ListingService,
                private route: ActivatedRoute,
                private listingTypeService: ListingTypeService,
                private listingLocationService: ListingLocationService) {
    }

    ngOnInit() {
        this.listingLocationService.get().subscribe(
            res => {
                this.locations = res
            }
        )
        this.listingTypeService.get().subscribe(
            res => {
                this.listingTypes = res
            }
        )
        this.sub = this.route
            .queryParams
            .subscribe(params => {
                this.id = params['id'];

                if (this.id && this.id > 0) {
                    this.listingService.getById(this.id)
                        .subscribe(data => this.data = data);
                }

                this.form = new FormGroup({
                    title : new FormControl(this.data.title, [Validators.required]),
                    phone: new FormControl(this.data.phoneNumber, [Validators.required]),
                    type: new FormControl(this.data.type),
                    location: new FormControl(this.data.location),
                    description: new FormControl(this.data.description),
                    keywords: new FormControl(this.data.keywords),
                    image: new FormControl(this.data.image)
                })
            });
    }



    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSaveListing() {
        this.listingService.post(this.form.value).subscribe(
            res => {

            },
            error => {
                this.errorMessage = 'Couldn\'t add listing'
            }
        )
    }
}
