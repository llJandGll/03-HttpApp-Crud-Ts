import { State } from "../interfaces/state"
import { User } from "../interfaces/user";
import { UserModel } from "../models/UserModel";
import { UserServices } from '../use-cases/UserServices';


export class UserStore {
  
  public state : State = {
    currentPage : 0,
    users : []
  }

  constructor(
    private userServices : UserServices,
  ) {
    
  }

  async loadNextPage () : Promise<UserModel[]> {
    const users = await this.userServices.getUsers( this.state.currentPage + 1)

    if ( users.length === 0 ) return this.state.users;
    
    this.state.users = [...users];
    this.state.currentPage += 1;
    return users;
  }
    
  async loadPreviousPage  () : Promise<UserModel[]> {
    if ( this.state.currentPage <= 1 ) return this.state.users;
    const users = await this.userServices.getUsers( this.state.currentPage -= 1 );
    this.state.users = [...users];
    return users;
    
  }
  
   getCurrentPage () : number {
    
    return this.state.currentPage;
  }
  
   relaodPage () {
    throw new Error("not impelement")
  }
  
   getUsers () {
    return this.state.users;
  }
  
  // TODO: implementar
  onUserChanged () {
    throw new Error("not impelement")
  }
  
}







