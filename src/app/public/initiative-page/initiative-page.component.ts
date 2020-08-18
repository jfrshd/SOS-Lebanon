import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Initiative} from '../models';
import {InitiativeService} from '../services/initiative/initiative.service';
import {ActivatedRoute} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-initiative-page',
  templateUrl: './initiative-page.component.html',
  styleUrls: ['./initiative-page.component.css'],
})
export class InitiativePageComponent implements OnInit {
  @Input() data: Initiative;
  active;
  id;

  constructor(
    private route: ActivatedRoute,
    private initiativeService: InitiativeService,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.initiativeService.getById(this.id).subscribe(
          res => {
            this.data = res.result;
          }
        );
      });
  }

}
