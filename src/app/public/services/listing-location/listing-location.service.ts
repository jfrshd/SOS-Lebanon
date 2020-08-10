import { ListingLocation } from '../../models/listing-location';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ListingLocationService {
    constructor(private httpClient: HttpClient) {
    }

    public get(): Observable<ApiResponse<ListingLocation>> {
        return this.httpClient.get<ApiResponse<ListingLocation>>(environment.url + '/location');
    }
}
