
import { ListingType } from '../../models';
import { ListingType } from '../../models';
import { Observable, of } from 'rxjs';

export class ListingTypeService {
    private MOCK_DATA = [
        new ListingType({
            image: 'assets/landing page/pictures/shelters.png',
            name: 'Shelters',
            description: 'Find a place to stay if your home was destroyed.'
        }),
        new ListingType({
            image: 'assets/landing page/pictures/medicine.png',
            name: 'Medicine',
            description: 'If you\'re short on medicine, we got you.'
        }),
        new ListingType({
            image: 'assets/landing page/pictures/food.png',
            name: 'Food',
            description: 'Do not worry about your next meal.'
        }),
        new ListingType({
            image: 'assets/landing page/pictures/others.png',
            name: 'Others',
            description: 'See everything we may help you with.'
        })
    ];

    public get(): Observable<ListingType[]> {
        let data = this.MOCK_DATA;

        return of(data);
    }
}
