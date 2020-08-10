import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Listing, ListingType, ArrayResponse } from '../../public/models';
import { ListingService } from '../../public/services/listing/listing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListingTypeService } from '../../public/services/listing-type/listing-type.service';
import { ListingLocationService } from '../../public/services/listing-location/listing-location.service';
import { Subscription } from 'rxjs';
import { ListingLocation } from 'src/app/public/models/listing-location';

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
  @ViewChild('fileBtn') fileBtn: HTMLElement;
  submitted = false;
  errorMessage;
  listingTypes = [];
  locations = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private listingTypeService: ListingTypeService,
    private listingLocationService: ListingLocationService) {
  }

  ngOnInit(): void {

    this.listingLocationService.get().subscribe(
      res => {
        this.locations = new ArrayResponse<ListingLocation>(res).result.Items;
      }
    );
    this.listingTypeService.get().subscribe(
      res => {
        this.listingTypes = new ArrayResponse<ListingType>(res).result.Items;
      }
    );
    this.sub = this.route.params
      .subscribe(params => {
        this.id = params.id;

        if (!!this.id) {
          this.listingService.getById(this.id)
            .subscribe(data => {
              this.data = new Listing(data.result);
              for (const key in this.form.controls) {
                if (key in this.form.controls && key in this.data && key !== 'image') {
                  this.form.controls[key].setValue(this.data[key]);
                }
              }
            });
        }

        this.form = new FormGroup({
          title: new FormControl(this.data.title, [Validators.required]),
          phone: new FormControl(this.data.phone, [Validators.required]),
          typeId: new FormControl(this.data.typeId),
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
    this.submitted = true;
    if (this.form.valid) {
      console.log(this.data);
      // const promise = this.id ? this.listingService.update(this.form.value) : this.listingService.create(this.form.value);
      // promise.subscribe(
      //   res => {
      //     this.router.navigateByUrl('/home/my-listings');
      //   },
      //   error => {
      //     this.errorMessage = 'Couldn\'t add listing';
      //   }
      // );
    }
  }
}
