
import { InitiativeCategory, ArrayResponse } from '../../models';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InitiativeCategoryService {
    private MOCK_DATA = [
        new InitiativeCategory({
            name: 'Construction'
        }),
        new InitiativeCategory({
            name: 'Equipment'
        }),
        new InitiativeCategory({
            name: 'Education'
        }),
        new InitiativeCategory({
            name: 'Mental Health'
        })
    ];

    constructor(private httpClient: HttpClient) {
    }

    public get(): Observable<ArrayResponse<InitiativeCategory>> {
        return this.httpClient.get<ArrayResponse<InitiativeCategory>>(environment.url + '/initiative-category');
    }
}
