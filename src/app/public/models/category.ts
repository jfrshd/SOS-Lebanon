export class Category {
    public id: string;
    public name: string;
    public description?: string;
    public image?: string;

    constructor(obj: Category = {} as Category) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.image = obj.image;
    }
}
