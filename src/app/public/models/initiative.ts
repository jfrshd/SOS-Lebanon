export class Initiative {
    public id: string;
    public name: string;
    public leadName: string;
    public email: string;
    public phone: string;
    public password: string;
    public confirmPassword: string;
    public categories: string[];
    public description?: string;
    public locations: string[];
    public facebookAccount?: string;
    public instagramAccount?: string;
    public twitterAccount?: string;
    public linkedInAccount?: string;
    public profilePicture?: string;

    constructor(obj: Initiative = {} as Initiative) {
        this.id = obj.id;
        this.name = obj.name;
        this.leadName = obj.leadName;
        this.email = obj.email;
        this.phone = obj.phone;
        this.categories = obj.categories || [];
        this.description = obj.description;
        this.locations = obj.locations || [];
        this.facebookAccount = obj.facebookAccount;
        this.instagramAccount = obj.instagramAccount;
        this.twitterAccount = obj.twitterAccount;
        this.linkedInAccount = obj.linkedInAccount;
        this.profilePicture = obj.profilePicture;
    }
}
