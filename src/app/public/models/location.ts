export class Location {
    public id: string;
    public name: string;

    constructor(obj: Location = {} as Location) {
        this.id = obj.id;
        this.name = obj.name;
    }
}
