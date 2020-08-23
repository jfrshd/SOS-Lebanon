import { Injectable } from '@angular/core';
import { ApiEvaluatedKey, ApiResponse, ArrayResponse, Initiative } from '../../models';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {
  private MOCK_DATA = [
    new Initiative({
      pk: 'id1',
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
      const evaluateKeyStr = JSON.stringify(evaluateKey);
      const params: any = {
        LastEvaluatedKey: evaluateKeyStr === '{}' ? '' : encodeURI(evaluateKeyStr),
        limit: limit.toString()
      };
      if (keyword) {
        params.keyword = keyword;
      }
      return this.httpClient.get<ArrayResponse<Initiative>>(environment.url + '/initiatives', {
        params
      });
    }
  }

  public getById(id: string): Observable<ApiResponse<Initiative>> {
    if (environment.mock) {
      return of(new ApiResponse({
        result: this.MOCK_DATA[0],
        statusCode: 200
      })
      );
    } else {
      return this.httpClient.get<ApiResponse<Initiative>>(environment.url + '/initiative', {
        params: {
          id
        }
      });
    }
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
