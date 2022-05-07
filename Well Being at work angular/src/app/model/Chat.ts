import { Timestamp } from "rxjs";
import { employee } from "./employee";
import { groupChat } from "./groupChat";
enum DeleteMsg{
    you="you",
    all="all"
}
export class Chat{
    idChat:number;
    content:string;
    picture:string;
    seen:boolean;
    edit:boolean;
    deleted:DeleteMsg;
    date:Date;
    employeeRecever:employee;
    employeeSender:employee;
    groupchat:groupChat;
    strDate:string;
    strDateInChat:string;

}