import { ListingLocation } from '../../models/listing-location';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrayResponse } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ListingLocationService {
    constructor(private httpClient: HttpClient) {
    }

    public get(): Observable<ArrayResponse<ListingLocation>> {
        return this.httpClient.get<ArrayResponse<ListingLocation>>(environment.url + '/location');
    }
}
