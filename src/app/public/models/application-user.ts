export class ApplicationUser {
    public address: string;
    public email: string;
    public family_name: string;
    public given_name: string;
    public phone_number: string;

    constructor(obj: ApplicationUser = {} as ApplicationUser) {
        this.address = obj.address;
        this.email = obj.email;
        this.family_name = obj.family_name;
        this.given_name = obj.given_name;
        this.phone_number = obj.phone_number;
    }
}