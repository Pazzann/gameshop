import {Application} from "express"
import GetImage from "./api/getImage/getImage";
import LoginHandler from "./api/login/login";
import {MysqlKlaruConnection} from "klaru-mysql-wrapper/dist";
import GetItemImage from "./api/itemImage/getItemImage";

const express = require('express');
export const app: Application = express();

const cookieParser = require('cookie-parser');
// export const mySQLConnection = new MysqlKlaruConnection();
// mySQLConnection.connect();

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

GetImage();
LoginHandler();
GetItemImage();

app.listen(3001, "localhost", () => {
    console.log("Started listening to localhost:3001")
});