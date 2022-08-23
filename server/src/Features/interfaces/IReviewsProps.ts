import {ICommentProps} from "./ICommentProps";

export interface IReviewsProps{
    rating: number | null;
    totalComments: number | null;
    reviews: ICommentProps[] | null;
}