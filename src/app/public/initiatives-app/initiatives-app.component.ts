import { Component, OnInit } from '@angular/core';
import { InitiativeService } from '../services/initiative/initiative.service';
import { Initiative, ArrayResponse } from '../models';

@Component({
  selector: 'app-initiatives-app',
  templateUrl: './initiatives-app.component.html',
  styleUrls: ['./initiatives-app.component.css']
})
export class InitiativesAppComponent implements OnInit {
  initiatives: Initiative[] = [];

  constructor(private initiativeService: InitiativeService) { }

  ngOnInit(): void {
    this.initiativeService.get()
      .subscribe(data => this.initiatives = new ArrayResponse<Initiative>(data).result.Items);
  }

  imageError(element, initiative: Initiative): void {
    debugger
    const image = location.origin + '/assets/landing%20page/pictures/' + (initiative.profilePicture || '') + '.png';
    if (element.src && element.src === image) {
      element.src = './assets/landing page/pictures/not found.png';
    } else {
      element.src = image;
    }
  }
}
