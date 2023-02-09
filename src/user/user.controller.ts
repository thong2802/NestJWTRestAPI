import { MyJwtGuard } from './../auth/guard/myjwt.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
@Controller("user")
export class UserController {

    @Get("userDetail")
    //@UseGuards(AuthGuard('jwt'))
    @UseGuards(MyJwtGuard)
    userDetail(@GetUser() user: User) { {
        // console.log(JSON.stringify(Object.keys(user.user)));
        return {
             user
        }
    }    
}
}


