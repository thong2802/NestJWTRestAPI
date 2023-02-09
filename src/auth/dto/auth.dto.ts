import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// define a type of "Authentication" request from client.
export class AuthDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}