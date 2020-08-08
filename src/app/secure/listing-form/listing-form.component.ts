import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Listing} from '../../public/models';
import {ListingService} from '../../public/services/listing/listing.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ListingTypeService} from '../../public/services/listing-type/listing-type.service';
import {ListingLocationService} from '../../public/services/listing-location/listing-location.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListingFormComponent implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;
  data: Listing = new Listing();
  form: FormGroup;
  errorMessage;
  listingTypes = [];
  locations = [];

  constructor(private listingService: ListingService,
              private route: ActivatedRoute,
              private listingTypeService: ListingTypeService,
              private listingLocationService: ListingLocationService) {
  }

  ngOnInit(): void {

    this.listingLocationService.get().subscribe(
      res => {
        this.locations = res.result.Items;
      }
    );
    this.listingTypeService.get().subscribe(
      res => {
        this.listingTypes = res.result.Items;
      }
    );
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = params.id;

        if (!!this.id) {
          this.listingService.getById(this.id)
            .subscribe(data => this.data = data.result.Items[0]);
        }

        this.form = new FormGroup({
          title: new FormControl(this.data.title, [Validators.required]),
          phone: new FormControl(this.data.phoneNumber, [Validators.required]),
          type: new FormControl(this.data.typeId),
          location: new FormControl(this.data.location),
          description: new FormControl(this.data.description),
          keywords: new FormControl(this.data.keywords),
          image: new FormControl(this.data.image)
        });
      });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSaveListing(): void {
    const promise = this.id ? this.listingService.update(this.form.value) : this.listingService.create(this.form.value);
    promise.subscribe(
      res => {
      },
      error => {
        this.errorMessage = 'Couldn\'t add listing';
      }
    );
  }
}
