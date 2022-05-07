import { Role } from "./Role";

export class jwtResponse{
     id: number;
   
     accessToken: string;
  
     tokenType: string;
   
     username: string;
   
     email: string;
  
     roles: string[];
  constructor(){}

}