import { IProduct } from "./IProduct";
import { Rating } from "./Rating";

export interface IReview {
    id: number;
    text: string;
    attachments: string[];
    rating: Rating;
    product: IProduct;
}