
import { ListingType, ApiResponse } from '../../models';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ListingTypeService {
    private MOCK_DATA = [
        new ListingType({
            image: 'assets/landing page/pictures/shelters.png',
            name: 'Shelters',
            description: 'Find a place to stay if your home was destroyed.'
        }),
        new ListingType({
            image: 'assets/landing page/pictures/medicine.png',
            name: 'Medicine',
            description: 'If you\'re short on medicine, we got you.'
        }),
        new ListingType({
            image: 'assets/landing page/pictures/food.png',
            name: 'Food',
            description: 'Do not worry about your next meal.'
        }),
        new ListingType({
            image: 'assets/landing page/pictures/others.png',
            name: 'Others',
            description: 'See everything we may help you with.'
        })
    ];

    constructor(private httpClient: HttpClient) {
    }

    public get(): Observable<ApiResponse<ListingType>> {
        return this.httpClient.get<ApiResponse<ListingType>>(environment.url + '/type');
    }
}
