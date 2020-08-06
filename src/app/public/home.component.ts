import { Component, OnInit } from '@angular/core';
import { ListingType } from './models';
import { ListingTypeService } from './services/listing-type/listing-type.service';

declare let AWS: any;
declare let AWSCognito: any;

@Component({
    selector: 'awscognito-angular2-app',
    template: '<p>Hello and welcome!\'< /p>'
})
export class AboutComponent {

}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './landinghome.html',
    styleUrls: ['./landinghome.css'],
    providers: [ListingTypeService]
})
export class HomeLandingComponent implements OnInit {
    types: ListingType[];

    constructor(private dataTypeService: ListingTypeService) {
    }

    ngOnInit() {
        this.dataTypeService.get()
            .subscribe(data => this.types = data);
    }
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './home.html',
    styleUrls: ['/home.css']
})
export class HomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}


