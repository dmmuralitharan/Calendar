export class event {

    public start_date:Date;
    public end_date:Date;
    public description:string;
    public background_color:string;

    public constructor(start_date:Date, 
        end_date:Date, description:string,
        background_color:string) {
            this.start_date = start_date;
            this.end_date = end_date;
            this.description = description;
            this.background_color = background_color;
    }

}