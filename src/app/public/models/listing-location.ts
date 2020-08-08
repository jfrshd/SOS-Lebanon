export class ListingLocation {
    public id: number;
    public name?: string;

    constructor(obj: ListingLocation = {} as ListingLocation) {
        this.id = obj.id;
        this.name = obj.name;
    }
}
