import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";

@Controller("auth")
export class AuthController {
    // auth service is automatically created when initialization the controller
    constructor(private authService: AuthService) {

    }

    // some request from client.
    @Post("register",) //register a new user          
    register(@Body() authDTO: AuthDTO) {        
        //not validate using class-validator AND class-transformer        
        return this.authService.register(authDTO);
    }

    //POST: ../authen/login.
    @Post("login")
    login(@Body() authDTO: AuthDTO) {
        // now controller will call authService.
        return this.authService.login(authDTO);
    }
}
// export : make "public"

