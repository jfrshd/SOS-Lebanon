import { Component, OnInit, OnDestroy } from '@angular/core';
import { ImageSlide } from './models';
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
export class HomeLandingComponent implements OnInit, OnDestroy {
    slides: ImageSlide[] = [
        new ImageSlide({ image: 'assets/landing page/pictures/picture1.png' }),
        new ImageSlide({ image: 'assets/landing page/pictures/lebanon.png' }),
    ];
    buttons: HomePageButton[] = [
        new HomePageButton({
            image: 'assets/landing page/pictures/shelter.png',
            title: 'Shelters',
            description: 'Find a place to stay if your home was destroyed.'
        }),
        new HomePageButton({
            image: 'assets/landing page/pictures/medicine.png',
            title: 'Medicine',
            description: 'If you\'re short on medicine, we got you.'
        }),
        new HomePageButton({
            image: 'assets/landing page/pictures/food.png',
            title: 'Food',
            description: 'Do not worry about your next meal.'
        }),
        new HomePageButton({
            image: 'assets/landing page/pictures/others.png',
            title: 'Others',
            description: 'See everything we may help you with.'
        })
    ];
    selectedIndex: number;
    imageInterval: any;

    constructor() {
        this.selectedIndex = 0;
    }

    ngOnInit() {
        if (this.slides.length > 1) {
            this.imageInterval = setInterval(() => {
                this.selectedIndex = (this.selectedIndex + 1) % this.slides.length;
            }, 5500);
        }
    }

    selectSlide(index: number) {
        this.selectedIndex = index;
        this.ngOnDestroy();
        this.ngOnInit();
    }

    ngOnDestroy() {
        if (this.imageInterval) {
            clearInterval(this.imageInterval);
        }
    }
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


