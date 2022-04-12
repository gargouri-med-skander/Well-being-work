import { Chat } from "./Chat";
import { Role } from "./Role";

export class employee{
    idEmployee: number;
    firstName:string ;
    lastName:string;
    username:string;
    email:string;
    password:string;
    dateOfBirth:Date;
    active:Boolean;
    profilPicture:string;
    roles:Role[];
    chat:Chat[];

}