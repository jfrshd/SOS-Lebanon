
import { Category, ArrayResponse } from '../../models';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private MOCK_DATA = [
        new Category({
            id: '1',
            name: 'Construction'
        }),
        new Category({
            id: '2',
            name: 'Equipment'
        }),
        new Category({
            id: '2',
            name: 'Education'
        }),
        new Category({
            id: '3',
            name: 'Mental Health'
        })
    ];

    constructor(private httpClient: HttpClient) {
    }

    public get(): Observable<ArrayResponse<Category>> {
        return this.httpClient.get<ArrayResponse<Category>>(environment.url + '/category');
    }
}
