import {IUserProps} from "../Features/interfaces/IUserProps";
import {mySQLConnection} from "../index";

export interface ISQLUserData{
    userid: string;
    userName: string;
    userImageId: string;
    access: number;
    basket: string;
}

export default class User implements IUserProps{
    readonly userid;
    readonly userImageId;
    readonly username;
    public basket: number[] = [-1];
    public access = 0;

    constructor(userid: string, userImageId: string, usermane: string) {
        this.userid = userid;
        this.userImageId = userImageId;
        this.username = usermane;
    }

    public getSendObject (): IUserProps{
        return{
            username: this.username,
            userImageId: this.userImageId,
            userid: this.userid,
            basket: this.basket,
            access: this.access
        }
    }
    public insertToSql(){
        mySQLConnection.reqQuery("INSERT INTO users (userid, userName, userImageId, access, basket) VALUES (?, ?, ?, ?, ?);", this.userid, this.username, this.userImageId, this.access, this.basket );
        return this;
    }
    public setBasket(newBasket: number[]){
        this.basket = newBasket;
        return this
    }

    public setAccess(newAccess: number){
        this.access = newAccess;
        return this
    }

    public static parseSQL(sqlData: ISQLUserData): IUserProps{
        return {
            userid: sqlData.userid,
            username: sqlData.userName,
            userImageId: sqlData.userImageId,
            access: sqlData.access,
            basket: sqlData.basket.split(", ").map(num=>Number(num))
        }
    }
    public static async updateBasket(newBasket: number[], id: string){
        let basket = "";
        for (let i = 0; i < newBasket.length-1; i++){
            basket += newBasket[i];
            basket += ", ";
        }
        basket += newBasket[newBasket.length-1];
        mySQLConnection.reqQuery("UPDATE users SET basket = ? WHERE userid = ?;", basket, id);
    }
    public static async getUser(user: any): Promise<User>{
        const data = await mySQLConnection.reqQuery("SELECT * FROM users WHERE userid = ?;", user.id);
        if(data){
            const userData = User.parseSQL(data[0]);
            return new User(userData.userid, userData.userImageId, userData.username).setBasket(userData.basket).setAccess(userData.access);
        }else{
            return new User(user.id, user.avatar, user.username);
        }
    }
}