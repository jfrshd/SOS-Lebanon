import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Initiative, Category, Location } from '../models';

declare var $: any;

@Component({
  selector: 'app-initiative-entry',
  templateUrl: './initiative-entry.component.html',
  styleUrls: ['./initiative-entry.component.css'],
})
export class InitiativeEntryComponent implements OnInit {
  @Input() data: Initiative;
  @Input() showActions: boolean;
  @Input() categories: Category[] = [];
  @Input() locations: Location[] = [];
  // tslint:disable-next-line: no-output-on-prefix
  categoriesDescription: string;
  locationsDescription: string;

  constructor(
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.categoriesDescription = this.categories.filter(f => this.data.categories.indexOf(f.id) >= 0).map(f => f.name).join(', ');
    this.locationsDescription = this.locations.filter(f => this.data.locations.indexOf(f.id) >= 0).map(f => f.name).join(', ');
  }

}
