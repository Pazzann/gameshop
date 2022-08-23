import {IUserProps} from "./IUserProps";

export interface ICommentProps{
    user: IUserProps;
    rating: number | null;
    content: string | null;
    attachments: string[] | null;
}