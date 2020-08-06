import { Component, OnInit } from '@angular/core';
import { HomePageButton } from './models/home-page-button';

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
    styleUrls: ['./landinghome.css']
})
export class HomeLandingComponent {
    buttons: HomePageButton[] = [
        new HomePageButton({
            route: 'lookup',
            params: { filter: 'shelter' },
            image: 'assets/landing page/pictures/shelter.png',
            title: 'Shelters',
            description: 'Find a place to stay if your home was destroyed.'
        }),
        new HomePageButton({
            route: 'lookup',
            params: { filter: 'medicine' },
            image: 'assets/landing page/pictures/medicine.png',
            title: 'Medicine',
            description: 'If you\'re short on medicine, we got you.'
        }),
        new HomePageButton({
            route: 'lookup',
            params: { filter: 'food' },
            image: 'assets/landing page/pictures/food.png',
            title: 'Food',
            description: 'Do not worry about your next meal.'
        }),
        new HomePageButton({
            route: 'lookup',
            params: { filter: 'other' },
            image: 'assets/landing page/pictures/others.png',
            title: 'Others',
            description: 'See everything we may help you with.'
        })
    ];
}

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './home.html',
    styleUrls: ['/home.css']
})
export class HomeComponent implements OnInit {

    constructor() {
        console.log('HomeComponent constructor');
    }

    ngOnInit() {
    }
}


