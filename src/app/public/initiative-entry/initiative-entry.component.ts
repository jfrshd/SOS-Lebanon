import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Initiative} from '../models';
import {InitiativeService} from '../services/initiative/initiative.service';

declare var $: any;

@Component({
  selector: 'app-initiative-entry',
  templateUrl: './initiative-entry.component.html',
  styleUrls: ['./initiative-entry.component.css'],
})
export class InitiativeEntryComponent implements OnInit {
  @Input() data: Initiative;
  @Input() showActions: boolean;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDelete = new EventEmitter<string>();
  deleteModal: any;
  fulfillModal: any;
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
