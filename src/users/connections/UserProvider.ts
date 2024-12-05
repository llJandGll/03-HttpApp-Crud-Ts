import { User } from "../interfaces/user";

export abstract class  UserProvider {
  constructor() {
    
  }

  abstract getUsersByPage ( page : number) : Promise<User[]>;
} 