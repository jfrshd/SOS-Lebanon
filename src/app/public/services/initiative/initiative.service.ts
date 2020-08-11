
import { Injectable } from '@angular/core';
import { Initiative, ArrayResponse, ApiEvaluatedKey, ApiResponse } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class InitiativeService {
    private MOCK_DATA = [
        new Initiative({
            id: 'id1',
            name: 'After work Champs',
            leadName: 'John Smith',
            email: 'johnsmith@email.com',
            phone: '71555555',
            password: '',
            confirmPassword: '',
            categories: [
                'Equipment'
            ],
            description: 'text here volunteer fills this box with whatever he has to say text here volunteer fills this box with whatever he has to say text here volunteer fills this box with whatever he has to say text here volunteer fills this box with whatever he has to say text here volunteer fills this box with whatever he has to say text here volunteer fills this box with whatever he has to say text here volunteer fills this box with whatever he has to say text here volunteer fills this box with whatever he has to say',
            locations: ['Hazmieh'],
            facebookAccount: 'example00',
            instagramAccount: 'exam.ple',
            twitterAccount: 'ExamPle',
            linkedInAccount: 'example here',
            profilePicture: ''
        }),
    ];

    constructor(private httpClient: HttpClient) {
    }

    public get(
        keyword?: string, limit: number = 10,
        evaluateKey: ApiEvaluatedKey = null): Observable<ArrayResponse<Initiative>> {
        const evaluateKeyStr = JSON.stringify(evaluateKey);
        const params: any = {
            LastEvaluatedKey: evaluateKeyStr === '{}' ? '' : encodeURI(evaluateKeyStr),
            limit: limit.toString()
        };
        if (keyword) {
            params.keyword = keyword;
        }
        return this.httpClient.get<ArrayResponse<Initiative>>(environment.url + '/initiative', {
            params
        });
    }

    public getById(id: string): Observable<ApiResponse<Initiative>> {
        return this.httpClient.get<ApiResponse<Initiative>>(environment.url + '/initiative', {
            params: {
                id
            }
        });
    }

    public delete(id: string): Observable<ArrayResponse<Initiative>> {
        return this.httpClient.delete<ArrayResponse<Initiative>>(environment.url + '/initiative', {
            params: {
                id
            }
        });
    }

    public create(model: Initiative): Observable<Initiative> {
        return this.httpClient.post<Initiative>(environment.url + '/initiative', model);
    }

    public update(model: Initiative): Observable<Initiative> {
        return this.httpClient.put<Initiative>(environment.url + '/initiative', model);
    }
}
