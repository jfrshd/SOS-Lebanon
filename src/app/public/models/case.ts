export class Case {
    public id: string;
    public contactName: string;
    public contactEmail: string;
    public contactPhone: string;
    public category: string;
    public location: string;
    public description: string;
    public helpDescription: string;
    public images?: string[];
    public facebookAccount?: string;
    public instagramAccount?: string;
    public twitterAccount?: string;
    public linkedInAccount?: string;
    public isActive?: boolean;
    public isFulfilled?: boolean;

    constructor(obj: Case = {} as Case) {
        this.id = obj.id;
        this.contactName = obj.contactName;
        this.contactEmail = obj.contactEmail;
        this.contactPhone = obj.contactPhone;
        this.category = obj.category;
        this.location = obj.location;
        this.description = obj.description;
        this.helpDescription = obj.helpDescription;
        this.images = obj.images || [];
        this.facebookAccount = obj.facebookAccount;
        this.instagramAccount = obj.instagramAccount;
        this.twitterAccount = obj.twitterAccount;
        this.linkedInAccount = obj.linkedInAccount;
        this.isActive = obj.isActive || false;
        this.isFulfilled = obj.isFulfilled || false;
    }
}
