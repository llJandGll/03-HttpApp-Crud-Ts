import { UserRepository } from "../connections/UserRepository";
import { UserModel } from "../models/UserModel";


export class UserServices {
  private HttpUsers : UserRepository
  constructor( 
    public http : UserRepository,
   ) {
    this.HttpUsers = http;
  }

  async getUsers( page : number = 1 ) : Promise< UserModel[]>{
    const users = await this.HttpUsers.getUsersByPage( page );
    return users;
  }

  async saveUser ( user : UserModel ) {
    const userPost = await this.HttpUsers.saveUser( user );
    return userPost
  }

  async getUserById ( id : string | number ) {
    const user = await this.HttpUsers.getUserById( id );
    return user;
  }

  async deleteUserById ( id : string | number ) {
    const user = await this.HttpUsers.deleteUserById( id );
    console.log('delte service', user)
    return user;
  }


} 