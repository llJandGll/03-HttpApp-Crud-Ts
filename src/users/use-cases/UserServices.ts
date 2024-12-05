import { UserRepository } from "../connections/UserRepository";


export class UserServices {
  private HttpUsers : UserRepository
  constructor( 
    private http : UserRepository,
   ) {
    this.HttpUsers = http;
  }

  async getUsers( page : number ){
    const users = await this.HttpUsers.getUsersByPage( page );
    console.log(users)
    return users;
  }
}