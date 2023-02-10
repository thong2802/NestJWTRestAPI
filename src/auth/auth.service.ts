import { ConfigService } from '@nestjs/config';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon from "argon2"
import { AuthDTO } from "./dto";
import { JwtService } from "@nestjs/jwt";


@Injectable({}) // This is Dependency injection

export class AuthService {
    constructor
        (
        private prismaService:PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService
        ){}
    
    // handle register user
   async register(authDTO: AuthDTO){  
        // generate password to hashedPassword
        const hashedPassword = await argon.hash(authDTO.password);

        // insert data to database
        try{
            const user = await this.prismaService.user.create({
                data: {
                    email: authDTO.email,
                    hashedPassword: hashedPassword,
                    firstName: '',
                    lastName: ''
                },
                // only select id,  email, createdAt.
                select: {
                    id: true,
                    email: true,
                    createdAt: true
                } 
                // you should add constraints "unique" to user table.        
             })
             return user
         }catch(error) {
            if(error.code == "P2002"){
                throw new ForbiddenException(error.message)
            }
         } 
    }

    // handle login
   async login(authDTO: AuthDTO) {
       // find user with input email.
       const user = await this.prismaService.user.findUnique({
            where: { 
                email: authDTO.email
            }
       });
       const passwordMatched = await argon.verify(
            user.hashedPassword,
            authDTO.password
       );

       if(!user) {
            throw new ForbiddenException("User with is this email not exist");
       }

       if(!passwordMatched) {
            throw new ForbiddenException("Incorrect password");
       }

       delete user.hashedPassword;
       
       return this.signJWT(user.id, user.email);
    }

    async signJWT(userId: number, email: string): Promise<{accessToken: string}> {
        const payload = {
            sub: userId,
            email
        }

        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn: '10m',
            secret: this.configService.get('JWT_SECRET')
        })

        return {
            accessToken: jwtString,
        }
    }
}