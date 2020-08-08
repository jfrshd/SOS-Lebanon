import { Component, OnInit } from '@angular/core';
import { ListingType } from './models';
import { ListingTypeService } from './services/listing-type/listing-type.service';

declare let AWS: any;
declare let AWSCognito: any;

@Component({
    selector: 'app-about',
    template: '<p>Hello and welcome!\'< /p>'
})
export class AboutComponent {

}

@Component({
    selector: 'app-landinghome',
    templateUrl: './landinghome.html',
    styleUrls: ['./landinghome.css'],
})
export class HomeLandingComponent implements OnInit {
    types: ListingType[];

    constructor(private dataTypeService: ListingTypeService) {
    }

    ngOnInit(): void {
        this.dataTypeService.get()
            .subscribe(data => this.types = data.result.Items);
    }
}

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}


