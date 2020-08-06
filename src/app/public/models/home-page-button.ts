export class HomePageButton {
    public route: string;
    public params: any;
    public image: string;
    public title: string;
    public description: string;

    constructor(obj: HomePageButton = {} as HomePageButton) {
        this.route = obj.route;
        this.params = obj.params;
        this.image = obj.image;
        this.title = obj.title;
        this.description = obj.description;
    }
}
