import {Request, Response} from "express";
import {app} from "../../index";
import DiscordOauth2 from 'discord-oauth2';
import config from '../../../config.json';



const oauth = new DiscordOauth2({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: "http://localhost:3001/api/callback",
});


export default function LoginHandler() {
    app.use("/api/callback", async function (request: Request, response: Response) {
            let token = await oauth.tokenRequest({
                code: String(request.query['code']),
                grantType: "authorization_code",
                scope: ["identify", "guilds", "email"],
            });
            let user = await oauth.getUser(token.access_token);
            request.session.user = user;
            response.redirect('http://localhost:5173/');
        }
    );

    app.get("/api/user", async function (request: Request, response: Response) {
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

    app.get('/api/logout', (request: any, response: any) => {
        request.session.destroy();
        response.end("200");
    });
}