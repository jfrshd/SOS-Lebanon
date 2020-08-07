
import { Injectable } from '@angular/core';
import { Listing, ApiResponse } from '../../models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ListingService {
    private MOCK_DATA = [
        new Listing({
            id: '1',
            typeId: 'Shelters',
            user: 'John Smith',
            title: '2 Bedroom apartment hazmieh',
            description: 'Description does here, everything that should be known will be written in this box',
            phoneNumber: '71555555',
            location: 'Hazmieh'
        }),
        new Listing({
            id: '2',
            typeId: 'Shelters',
            user: 'Anas Khattar',
            title: '2 Bedroom apartment Dbayeh',
            description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. \
            Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown \
            printer took a galley of type and scrambled it to make a type specimen book. It has survived \
            not only five centuries, but also the leap into electronic typesetting, remaining essentially \
            unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem \
            Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            phoneNumber: '71222222',
            location: 'Dbayeh'
        })
    ];

    constructor(private httpClient: HttpClient) {
    }

    public get(typeId: string): Observable<ApiResponse<Listing>> {
        return this.httpClient.get<ApiResponse<Listing>>(environment.url + '/type-help', {
            params: {
                typeId
            }
        });
    }

    public getById(id: string): Observable<ApiResponse<Listing>> {
        return this.httpClient.get<ApiResponse<Listing>>(environment.url + '/post', {
            params: {
                id
            }
        });
    }

    public delete(id: string): Observable<ApiResponse<Listing>> {
        return this.httpClient.get<ApiResponse<Listing>>(environment.url + '/help', {
            params: {
                id
            }
        });
    }

    public create(listing: Listing): Observable<Listing> {
        return this.httpClient.post<Listing>(environment.url + '/help', listing);
    }

    public update(listing: Listing): Observable<Listing> {
        return this.httpClient.put<Listing>(environment.url + '/help', listing);
    }
}
