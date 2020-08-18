import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Initiative} from '../models';
import {InitiativeService} from '../services/initiative/initiative.service';

declare var $: any;

@Component({
  selector: 'app-initiative-view',
  templateUrl: './initiative-view.component.html',
  styleUrls: ['./initiative-view.component.css'],
})
export class InitiativeViewComponent implements OnInit {
  @Input() data: Initiative;
  @Input() showActions: boolean;
  categoriesDescription: string;
  locationsDescription: string;

  constructor(
    private initiativeService: InitiativeService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.categoriesDescription = this.data.categories.join(', ');
    this.locationsDescription = this.data.locations.join(', ');
  }

}
