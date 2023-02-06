import { Controller, Post, Get } from "@nestjs/common";
import { get } from "http";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    // auth service is automatically created when initialization the controller
    constructor(private authService: AuthService) {
        
    }
    // some request from client.
    @Post("register")
    register() {
        // 
        return this.authService.register;
    }

    //POST: ../authen/login.
    @Post("login")
    login() {
       

        // now controller will call authService.
        return this.authService.login;
    }
}

// export : make "public"

