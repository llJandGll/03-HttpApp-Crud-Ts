import { UserRepository } from "../connections/UserRepository";
import { UserModel } from "../models/UserModel";


export class UserServices {
  private HttpUsers : UserRepository
  constructor( 
    private http : UserRepository,
   ) {
    this.HttpUsers = http;
  }

  async getUsers( page : number = 1 ) : Promise< UserModel[]>{
    const users = await this.HttpUsers.getUsersByPage( page );
    return users;
  }

  async saveUser ( user : UserModel ) {
    const userPost = await this.HttpUsers.saveUser( user );
    console.log("user services",userPost)
    return userPost
  }
} 