import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import {ListingLocation} from '../../models/listing-location';

export class ListingLocationService {
    private MOCK_DATA = [
        new ListingLocation({
            name: 'Beirut',
        }),
        new ListingLocation({
            name: 'South',
        }),
        new ListingLocation({
            name: 'North',
        }),
        new ListingLocation({
            name: 'Bekaa',
        }),
    ];

    public get(): Observable<ListingLocation[]> {
        let data = this.MOCK_DATA;

        return of(data);
    }
}
