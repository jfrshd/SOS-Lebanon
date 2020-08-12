export class Category {
    public id: string;
    public name: string;

    constructor(obj: Category = {} as Category) {
        this.id = obj.id;
        this.name = obj.name;
    }
}
