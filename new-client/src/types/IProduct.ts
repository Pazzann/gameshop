import { GameType } from "./GameType";
import { IReview } from "./IReview";
import { Platform } from "./Platform";
import { Rating } from "./Rating";


export interface IProduct {
    code: number;
    imageIds: string[];
    title: string;
    description: string;
    platforms: Platform[];
    price: string;
    tags: string[];
    type: GameType;
    rating: Rating;
    reviews: IReview[];
}