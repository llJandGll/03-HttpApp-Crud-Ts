import { UserRepository } from "../connections/UserRepository";


export class UserServices {
  private HttpUsers : UserRepository
  constructor( 
    private http : UserRepository,
   ) {
    this.HttpUsers = http;
  }

  async getUsers( page : number = 1 ){
    const users = await this.HttpUsers.getUsersByPage( page );
    return users;
  }
}