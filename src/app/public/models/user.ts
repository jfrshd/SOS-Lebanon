export class User {
  public note: string;
  public phoneNumber: string;
  public fullName: string;
  public email: string;

  constructor(obj: any) {
      this.note = obj?.address;
      this.phoneNumber = obj?.phone_number;
      this.fullName = obj?.given_name + ' ' + obj?.family_name;
      this.email = obj?.email;
  }
}
