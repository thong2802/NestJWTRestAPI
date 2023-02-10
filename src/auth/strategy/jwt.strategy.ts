import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service'
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        public prismaService: PrismaService,
        ) {
        super({
            // token string is added to very request (login / register)
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_SECRET")
        })
    }

     async validate(payload: {sub: number, email: string}) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id: payload.sub
            }
        });
        
        if (!user) {
            throw new UnauthorizedException();
        }
        console.log(JSON.stringify(user));
        delete user.hashedPassword;

        return user
    }
}
