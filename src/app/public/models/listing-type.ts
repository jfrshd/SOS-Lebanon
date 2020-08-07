export class ListingType {
    public image: string;
    public name: string;
    public description: string;

    constructor(obj: ListingType = {} as ListingType) {
        this.image = obj.image;
        this.name = obj.name;
        this.description = obj.description;
    }
}
