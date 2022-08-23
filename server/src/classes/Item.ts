import {IItemProps} from "../Features/interfaces/IItemProps";
import {GameType, Platform} from "../Features/types";
import {IReviewsProps} from "../Features/interfaces/IReviewsProps";
import {items, mySQLConnection} from "../index";

export default class Item implements IItemProps {
    public name: string;
    public desc: string;
    public code: number;
    public price: string;
    public platforms: Platform[];
    public imageIds: string[];
    public tags: string[];
    public type: GameType;
    public reviews: IReviewsProps | null = null;

    constructor(
        name: string,
        desc: string,
        code: number,
        price: string,
        tags: string[],
        type: GameType,
        imageIds: string[],
        platforms: Platform[]
    ) {
        this.name = name;
        this.desc = desc;
        this.code = code;
        this.price = price;
        this.tags = tags;
        this.type = type;
        this.imageIds = imageIds;
        this.platforms = platforms;
    }


    public static async getItems() {
        const data = await mySQLConnection.reqRaw("SELECT * FROM products");
        for (let item of data) {
            if (!item.comments) {
                items.push(new Item(item.title, item.description, item.code, item.price, item.tags.split(', '), item.type, item.imageIds.split(", "), item.platforms.split(", ")));
            } else {

            }
        }
    }
}