import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ArrayResponse, Location, Category, Initiative } from '../../public/models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationService } from '../../public/services/location/location.service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../public/services/category/category.service';
import { InitiativeService } from '../../public/services/initiative/initiative.service';

@Component({
  selector: 'app-initiative-form',
  templateUrl: './initiative-form.component.html',
  styleUrls: ['./initiative-form.css'],
  encapsulation: ViewEncapsulation.None
})
export class InitiativeFormComponent implements OnInit, OnDestroy {
  id: string;
  sub: Subscription;
  data: Initiative = new Initiative();
  form: FormGroup;
  @ViewChild('fileBtn') fileBtn: HTMLElement;
  submitted = false;
  loading = false;
  errorMessage: string;
  categories: Category[] = [];
  locations: Location[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private initiativeService: InitiativeService,
    private categoryService: CategoryService,
    private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationService.get().subscribe(
      res => {
        this.locations = new ArrayResponse<Location>(res).result.Items;
      }
    );
    this.categoryService.get().subscribe(
      res => {
        this.categories = new ArrayResponse<Category>(res).result.Items;
      }
    );
    this.sub = this.route.params
      .subscribe(params => {
        this.id = params.id;

        if (!!this.id) {
          this.initiativeService.getById(this.id)
            .subscribe(data => {
              this.data = new Initiative(data.result);
              for (const key in this.form.controls) {
                if (key in this.form.controls && key in this.data && key !== 'profilePicture') {
                  this.form.controls[key].setValue(this.data[key]);
                }
              }
            });
        }

        this.form = new FormGroup({
          name: new FormControl(this.data.name, [Validators.required]),
          leadName: new FormControl(this.data.leadName, [Validators.required]),
          categories: new FormControl(this.data.categories),
          locations: new FormControl(this.data.locations),
          description: new FormControl(this.data.description, [Validators.required]),
          phone: new FormControl(this.data.phone, [Validators.required]),
          email: new FormControl(this.data.email, [Validators.required, Validators.email]),
          // password: new FormControl(this.data.password, [Validators.required, Validators.minLength(8)]),
          // confirmPassword: new FormControl(this.data.confirmPassword, [Validators.required, Validators.minLength(8)]),
          facebookAccount: new FormControl(this.data.facebookAccount),
          instagramAccount: new FormControl(this.data.instagramAccount),
          twitterAccount: new FormControl(this.data.twitterAccount),
          linkedInAccount: new FormControl(this.data.linkedInAccount),
          profilePicture: new FormControl(this.data.profilePicture)
        });
      });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  changeDropdown(key: string, event, type: string): void {
    if (type === 'selectAll') {
      this.form.controls[key].setValue(event.map(ev => ev.id));
    } else if (type === 'select') {
      const value = this.form.value[key];
      value.push(event.id);
      this.form.controls[key].setValue(value);
    } else if (type === 'deselect') {
      const value = this.form.value[key].filter(ev => ev !== event.id);
      this.form.controls[key].setValue(value);
    }
  }

  onSaveListing(): void {
    this.submitted = true;
    if (!this.loading && this.form.valid) {
      this.loading = true;
      const promise = this.id ? this.initiativeService.update(this.form.value) : this.initiativeService.create(this.form.value);
      promise.subscribe(
        res => {
          this.router.navigateByUrl('/home/login?user=' + this.form.value.email);
        },
        error => {
          this.errorMessage = 'Couldn\'t add initiative';
        }
      );
    }
  }
}
