import { UserModel } from "../models/UserModel";

export abstract class  UserProvider {
  constructor() {
    
  }

  abstract getUsersByPage ( page : number) : Promise<UserModel[]>;

  abstract saveUser ( user : UserModel ) : Promise<UserModel> ;
  abstract updateUser ( user : UserModel) : Promise<UserModel>; 
  abstract createUser ( user : UserModel) : Promise<UserModel>;
  abstract getUserById ( id : string | number) : Promise<UserModel>  ;
  abstract deleteUserById ( id : string | number) : Promise<boolean>;
} 