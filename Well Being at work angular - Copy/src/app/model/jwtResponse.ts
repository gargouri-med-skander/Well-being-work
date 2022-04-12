import { Role } from "./Role";

export class jwtResponse{
    acessToken:string;
    type:string;
    username:string;
    authorities:Role[];
}