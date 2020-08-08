export class Listing {
    public id?: string;
    public image?: string;
    public typeId?: string;
    public title?: string;
    public description?: string;
    public user?: string;
    public location?: string;
    public phoneNumber?: string;
    public fulfilled?: boolean;
    public keywords?: [string];

    constructor(obj: Listing = {} as Listing) {
        this.id = obj.id;
        this.image = obj.image;
        this.typeId = obj.typeId;
        this.title = obj.title;
        this.description = obj.description;
        this.user = obj.user;
        this.location = obj.location;
        this.phoneNumber = obj.phoneNumber;
        this.fulfilled = !!obj.fulfilled;
        this.keywords = obj.keywords;
    }
}
