import { Injectable } from "@nestjs/common";

@Injectable({}) // This is Dependency injection

export class AuthService {
    register() {
        return "This is message for register"
    }

    login() {
        return "This is message for login"
    }
}