export class Case {
    public id: string;
    public contactName: string;
    public contactEmail: string;
    public contactPhone: string;
    public category: string;
    public location: string;
    public description: string;
    public helpDescription: string;
    public image: string;
    public facebookAccount?: string;
    public instagramAccount?: string;
    public twitterAccount?: string;
    public linkedInAccount?: string;

    constructor(obj: Case = {} as Case) {
        this.id = obj.id;
        this.contactName = obj.contactName;
        this.contactEmail = obj.contactEmail;
        this.contactPhone = obj.contactPhone;
        this.category = obj.category;
        this.location = obj.location;
        this.description = obj.description;
        this.helpDescription = obj.helpDescription;
        this.image = obj.image;
        this.facebookAccount = obj.facebookAccount;
        this.instagramAccount = obj.instagramAccount;
        this.twitterAccount = obj.twitterAccount;
        this.linkedInAccount = obj.linkedInAccount;
    }
}
