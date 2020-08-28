import { Component, Input, OnInit } from '@angular/core';
import { Initiative } from '../models';
import { InitiativeService } from '../services/initiative/initiative.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-initiative-page',
  templateUrl: './initiative-page.component.html',
  styleUrls: ['./initiative-page.component.css'],
})
export class InitiativePageComponent implements OnInit {
  @Input() data: Initiative;
  id: string;
  selectedTab: string;

  constructor(
    private route: ActivatedRoute,
    private initiativeService: InitiativeService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        this.id = params.id;
        this.initiativeService.getById(this.id)
          .subscribe(res => this.data = new Initiative(res.result));
      });
  }
}
