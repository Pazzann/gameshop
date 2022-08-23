import {GameType, Platform} from "../types";
import {IReviewsProps} from "./IReviewsProps";

export interface IItemProps{
    name: string;
    imageIds: string[];
    desc: string;
    platforms: Platform[];
    price: string;
    code: number;
    tags: string[];
    type: GameType;
    reviews: IReviewsProps | null;
}