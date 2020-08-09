import { ApplicationUser } from './application-user';

export class Listing {
    public id?: string;
    public image?: string;
    public typeId?: string;
    public title?: string;
    public description?: string;
    public user?: string;
    public userInfo?: ApplicationUser;
    public location?: string;
    public phone?: string;
    public fulfilled?: boolean;
    public keywords?: [string];

    constructor(obj: Listing = {} as Listing) {
        this.id = obj.id;
        this.image = obj.image;
        this.typeId = obj.typeId;
        this.title = obj.title;
        this.description = obj.description;
        this.user = obj.user;
        this.userInfo = new ApplicationUser(obj.userInfo);
        this.location = obj.location;
        this.phone = obj.phone;
        this.fulfilled = !!obj.fulfilled;
        this.keywords = obj.keywords;
    }
}
