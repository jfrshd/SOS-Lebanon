export class HomePageButton {
    public image: string;
    public title: string;
    public description: string;

    constructor(obj: HomePageButton = {} as HomePageButton) {
        this.image = obj.image;
        this.title = obj.title;
        this.description = obj.description;
    }
}
