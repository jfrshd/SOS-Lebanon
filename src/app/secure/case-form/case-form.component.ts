import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ArrayResponse, ListingLocation, InitiativeCategory, Case } from '../../public/models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListingLocationService } from '../../public/services/listing-location/listing-location.service';
import { Subscription } from 'rxjs';
import { InitiativeCategoryService } from '../../public/services/initiative-category/initiative-category.service';
import { CaseService } from '../../public/services/case/case.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.css'],
  encapsulation: ViewEncapsulation.None
})
export class CaseFormComponent implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;
  data: Case = new Case();
  form: FormGroup;
  @ViewChild('fileBtn') fileBtn: HTMLElement;
  submitted = false;
  errorMessage: string;
  categories: InitiativeCategory[] = [];
  locations: ListingLocation[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private caseService: CaseService,
    private initiativeCategoryService: InitiativeCategoryService,
    private listingLocationService: ListingLocationService) {
  }

  ngOnInit(): void {
    this.listingLocationService.get().subscribe(
      res => {
        this.locations = new ArrayResponse<ListingLocation>(res).result.Items;
      }
    );
    this.initiativeCategoryService.get().subscribe(
      res => {
        this.categories = new ArrayResponse<InitiativeCategory>(res).result.Items;
      }
    );
    this.sub = this.route.params
      .subscribe(params => {
        this.id = params.id;

        if (!!this.id) {
          this.caseService.getById(this.id)
            .subscribe(data => {
              this.data = new Case(data.result);
              for (const key in this.form.controls) {
                if (key in this.form.controls && key in this.data && key !== 'profilePicture') {
                  this.form.controls[key].setValue(this.data[key]);
                }
              }
            });
        }

        this.form = new FormGroup({
          contactName: new FormControl(this.data.contactName, [Validators.required]),
          description: new FormControl(this.data.description, [Validators.required]),
          category: new FormControl(this.data.category),
          location: new FormControl(this.data.location),
          helpDescription: new FormControl(this.data.helpDescription, [Validators.required]),
          contactPhone: new FormControl(this.data.contactPhone, [Validators.required]),
          contactEmail: new FormControl(this.data.contactEmail, [Validators.required, Validators.email]),
          facebookAccount: new FormControl(this.data.facebookAccount),
          instagramAccount: new FormControl(this.data.instagramAccount),
          twitterAccount: new FormControl(this.data.twitterAccount),
          linkedInAccount: new FormControl(this.data.linkedInAccount),
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
      const promise = this.id ? this.caseService.update(this.form.value) : this.caseService.create(this.form.value);
      promise.subscribe(
        res => {
          this.router.navigateByUrl('/home');
        },
        error => {
          this.errorMessage = 'Couldn\'t add case';
        }
      );
    }
  }
}
