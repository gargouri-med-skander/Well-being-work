import { employee } from "./employee";
import { Chat } from "./Chat";

export class groupChat{
    idGroupChat:number;
    usernameCreater:string;
    employeeCreater:employee;
    nameGroup:string;
    members:employee[];
    listChat:Chat[];
    
}