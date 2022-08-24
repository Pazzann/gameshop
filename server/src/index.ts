import {Application} from "express"
import GetImage from "./api/getImage/getImage";
import {MysqlKlaruConnection} from "klaru-mysql-wrapper/dist";
import GetItemImage from "./api/item/getItemImage";
import {IConfigProps} from "./Features/interfaces/IConfigProps";
import Item from "./classes/Item";
import Items from "./api/item/items";
import Login from "./api/login/login";
import User from "./api/user/user";


const config: IConfigProps = require('../config.json')

const express = require('express');
const app: Application = express();
export const items: Item[] = [];
const cookieParser = require('cookie-parser');
export const mySQLConnection = new MysqlKlaruConnection();
mySQLConnection.connect(config.SQLHost, +config.SQLPort, config.SQLUserName, config.SQLPassword, config.SQLDatabase, async ()=>{
    console.log("Successfully connected to MySql");
    Item.getItems();
});


const cors = require("cors");
const session = require('express-session');

app.use(cookieParser());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3001"],
    credentials: true
}))

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use("/api/items", Items);
app.use("/api/images", GetImage);
app.use("/api/auth", Login);
app.use("/api/item/image", GetItemImage);
app.use("/api/user", User);

app.listen(3001, "localhost", () => {
    console.log("Started listening to localhost:3001")
});