import {Request, Response} from "express";
import DiscordOauth2 from 'discord-oauth2';
import config from '../../../config.json';
import User from "../../classes/User";
import express from 'express';

const router = express.Router();

const oauth = new DiscordOauth2({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: "http://localhost:3001/api/auth/callback",
});


router.use("/callback", async function (request: Request, response: Response) {
        let token = await oauth.tokenRequest({
            code: String(request.query['code']),
            grantType: "authorization_code",
            scope: ["identify", "guilds", "email"],
        });
        let user = await oauth.getUser(token.access_token);
        const curUser = await User.getUser(user)
        request.session.user = curUser.getSendObject();
        response.redirect('http://localhost:5173/');
    }
);

router.get("/user", async function (request: Request, response: Response) {
    if (request.session?.user) {
        response.json({
            loggedIn: true,
            user: request.session.user
        })
    } else {
        response.json({
            loggedIn: false,
        })
    }
});

router.get('/logout', (request: any, response: any) => {
    request.session.destroy();
    response.end("200");
});
export default router