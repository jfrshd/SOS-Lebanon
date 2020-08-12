
import { Injectable } from '@angular/core';
import { Case, ArrayResponse, ApiEvaluatedKey, ApiResponse } from '../../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CaseService {
    private MOCK_DATA = [
        new Case({
            id: 'id1',
            contactName: 'John Smith',
            contactEmail: 'johnsmith@email.com',
            contactPhone: '71555555',
            category: 'Equipment',
            description: 'This is for a family of 4, with 2 kids in school who lost their home during the latest explosion. The dad is doing his best to salvage the losses and keep his family living a good life.',
            helpDescription: 'The family needs to buy 2 IPADs for their kids to be able to study remotely. You can help by sending 2 IPADs or donating $XXX to purchase and deliver them to the family.',
            location: 'Hazmieh',
            facebookAccount: 'example00',
            instagramAccount: 'exam.ple',
            twitterAccount: 'ExamPle',
            linkedInAccount: 'example here',
            image: ''
        }),
    ];

    constructor(private httpClient: HttpClient) {
    }

    public get(
        keyword?: string, limit: number = 10,
        evaluateKey: ApiEvaluatedKey = null): Observable<ArrayResponse<Case>> {
        const evaluateKeyStr = JSON.stringify(evaluateKey);
        const params: any = {
            LastEvaluatedKey: evaluateKeyStr === '{}' ? '' : encodeURI(evaluateKeyStr),
            limit: limit.toString()
        };
        if (keyword) {
            params.keyword = keyword;
        }
        return this.httpClient.get<ArrayResponse<Case>>(environment.url + '/case', {
            params
        });
    }

    public getById(id: string): Observable<ApiResponse<Case>> {
        return this.httpClient.get<ApiResponse<Case>>(environment.url + '/case', {
            params: {
                id
            }
        });
    }

    public delete(id: string): Observable<ArrayResponse<Case>> {
        return this.httpClient.delete<ArrayResponse<Case>>(environment.url + '/case', {
            params: {
                id
            }
        });
    }

    public create(model: Case): Observable<Case> {
        return this.httpClient.post<Case>(environment.url + '/case', model);
    }

    public update(model: Case): Observable<Case> {
        return this.httpClient.put<Case>(environment.url + '/case', model);
    }
}
