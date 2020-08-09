export class ApplicationUser {
    public address: string;
    public email: string;
    // tslint:disable-next-line: variable-name
    public family_name: string;
    // tslint:disable-next-line: variable-name
    public given_name: string;
    // tslint:disable-next-line: variable-name
    public phone_number: string;

    constructor(obj: ApplicationUser = {} as ApplicationUser) {
        this.address = obj.address;
        this.email = obj.email;
        this.family_name = obj.family_name;
        this.given_name = obj.given_name;
        this.phone_number = obj.phone_number;
    }
}
