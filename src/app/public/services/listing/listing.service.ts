
import { Listing } from '../../models';
import { Observable, of } from 'rxjs';

export class ListingService {
    private MOCK_DATA = [
        new Listing({
            id: 1,
            type: 'Shelters',
            user: 'John Smith',
            title: '2 Bedroom apartment hazmieh',
            description: 'Description does here, everything that should be known will be written in this box',
            phoneNumber: '71555555',
            location: 'Hazmieh'
        }),
        new Listing({
            id: 2,
            type: 'Shelters',
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

    public get(type: string, keyword: string): Observable<Listing[]> {
        let data = this.MOCK_DATA;

        if (keyword) {
            keyword = keyword.toLocaleLowerCase();
            data = data.filter(f =>
                (
                    f.title.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                    f.description.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                    f.user.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                    f.location.toLocaleLowerCase().indexOf(keyword) !== -1 ||
                    f.phoneNumber.toLocaleLowerCase().indexOf(keyword) !== -1
                )
            );
        }
        if (type) {
            type = type.toLocaleLowerCase();
            data = data.filter(f => f.type.toLocaleLowerCase() === type);
        }

        return of(data);
    }

    public getById(id: number): Observable<Listing> {
        const index = this.MOCK_DATA.findIndex(f => f.id === id);
        if (index > -1) {
            return of(this.MOCK_DATA[index]);
        }

        return of(null);
    }

    public delete(id: number): Observable<Listing> {
        const index = this.MOCK_DATA.findIndex(f => f.id === id);
        if (index > -1) {
            this.MOCK_DATA.splice(index, 1);
        }

        return of(this.MOCK_DATA[index]);
    }

    public fulfill(id: number, flag: boolean): Observable<Listing> {
        const index = this.MOCK_DATA.findIndex(f => f.id === id);
        if (index > -1) {
            this.MOCK_DATA[index].fulfilled = flag;
        }

        return of(this.MOCK_DATA[index]);
    }

    public post(listing: Listing): Observable<Listing> {
        return of(this.MOCK_DATA[0]);
    }
}
