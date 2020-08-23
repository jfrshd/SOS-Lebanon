import { Component, ElementRef, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Initiative, Location, Category, ArrayResponse } from '../models';
import { InitiativeService } from '../services/initiative/initiative.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category/category.service';
import { LocationService } from '../services/location/location.service';

declare var $: any;

@Component({
  selector: 'app-initiative-view',
  templateUrl: './initiative-view.component.html',
  styleUrls: ['./initiative-view.component.css'],
})
export class InitiativeViewComponent implements OnInit, OnDestroy {
  @Input() data: Initiative = new Initiative();
  @Input() showActions: boolean;
  categories: Category[] = [];
  locations: Location[] = [];
  categoriesDescription: string;
  locationsDescription: string;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private initiativeService: InitiativeService,
    private categoryService: CategoryService,
    private locationService: LocationService,
  ) {
  }

  ngOnInit(): void {
    this.categoryService.get()
      .subscribe(data => {
        this.categories = new ArrayResponse(data).result.Items.map(c => new Category(c));
        this.categoriesDescription = this.categories.filter(f => this.data.categories.indexOf(f.id) >= 0).map(f => f.name).join(', ');
      });
    this.locationService.get()
      .subscribe(data => {
        this.locations = new ArrayResponse(data).result.Items.map(c => new Location(c));
        this.locationsDescription = this.locations.filter(f => this.data.locations.indexOf(f.id) >= 0).map(f => f.name).join(', ');
      });
    this.sub = this.route.params
      .subscribe(params => {
        if (params.id) {
          this.initiativeService.getById(params.id)
            .subscribe(data => {
              this.data = new Initiative(data.result);
              if (this.locations) {
                this.locationsDescription = this.locations
                  .filter(f => this.data.locations.indexOf(f.id) >= 0).map(f => f.name).join(', ');
              }
              if (this.categories) {
                this.categoriesDescription = this.categories
                  .filter(f => this.data.categories.indexOf(f.id) >= 0).map(f => f.name).join(', ');
              }
            });
        } else {
          this.data = new Initiative();
        }
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
