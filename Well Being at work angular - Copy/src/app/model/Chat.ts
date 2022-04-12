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
    seen:Boolean;
    edit:Boolean;
    deleted:DeleteMsg;
    date:Date;
    idRecever:number;
    e:employee;
    groupchat:groupChat;


}