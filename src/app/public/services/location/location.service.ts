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
    private MOCK_DATA = [
        new Location({
            id: '1',
            name: 'Downtown'
        }),
        new Location({
            id: '2',
            name: 'Hazmieh'
        })
    ];
    constructor(private httpClient: HttpClient) {
    }

    public get(): Observable<ArrayResponse<Location>> {
        if (environment.mock) {
            return of(new ArrayResponse({
                statusCode: 200,
                result: {
                    Count: this.MOCK_DATA.length,
                    ScannedCount: this.MOCK_DATA.length,
                    Items: this.MOCK_DATA,
                    LastEvaluatedKey: null
                }
            })
            );
        } else {
            return this.httpClient.get<ArrayResponse<Location>>(environment.url + '/locations');
        }
    }
}
