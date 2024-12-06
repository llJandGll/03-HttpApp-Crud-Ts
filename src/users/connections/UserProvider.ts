import { UserModel } from "../models/UserModel";

export abstract class  UserProvider {
  constructor() {
    
  }

  abstract getUsersByPage ( page : number) : Promise<UserModel[]>;
} 