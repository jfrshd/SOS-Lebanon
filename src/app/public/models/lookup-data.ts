export class LookupData {
    public image?: string;
    public type: string;
    public title: string;
    public description: string;
    public user: string;
    public location: string;
    public phoneNumber: string;
    public fulfilled?: boolean;

    constructor(obj: LookupData = {} as LookupData) {
        this.image = obj.image;
        this.type = obj.type;
        this.title = obj.title;
        this.description = obj.description;
        this.user = obj.user;
        this.location = obj.location;
        this.phoneNumber = obj.phoneNumber;
        this.fulfilled = !!obj.fulfilled;
    }
}
