import { Location } from '../../models';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArrayResponse } from '../../models';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    constructor(private httpClient: HttpClient) {
    }

    public get(): Observable<ArrayResponse<Location>> {
        return this.httpClient.get<ArrayResponse<Location>>(environment.url + '/location');
    }
}
