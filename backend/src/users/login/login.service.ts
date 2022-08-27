import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const DiscordOauth2 = require('discord-oauth2');

@Injectable()
export class LoginService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  private oauth = new DiscordOauth2({
    clientId: this.configService.get('CLIENT_ID'),
    clientSecret: this.configService.get('CLIENT_SECRET'),
    redirectUri: 'http://localhost:3001/api/login/callback',
  });

  async login(code: string) {
    const token = await this.oauth.tokenRequest({
      code: code,
      grantType: 'authorization_code',
      scope: ['identify'],
    });
    const user = await this.oauth.getUser(token.access_token);
    const userdb = await UserEntity.findOneBy({ userid: user.id });
    if (!userdb)
      await UserEntity.create({
        userid: user.id,
        userName: user.username,
        userImageId: user.avatar,
        basket: [],
        access: 0,
      }).save();
    else
      await UserEntity.update(user.id, {
        userName: user.username,
        userImageId: user.avatar,
      });
    return this.jwtService.sign({ id: user.id });
  }

  validate(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
