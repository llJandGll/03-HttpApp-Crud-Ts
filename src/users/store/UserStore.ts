import { State } from "../interfaces/state"
import { User } from "../interfaces/user";
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

   async loadNextPage () : Promise<User[]> {
    return await this.userServices.getUsers( this.state.currentPage + 1)
  }
  
   loadPreviousPage () {
    throw new Error("not impelement")
  }
  
   getCurrentPage () {
  
  }
  
   relaodPage () {
    throw new Error("not impelement")
  }
  
   getUser () {
  
  }
  
  // TODO: implementar
  onUserChanged () {
    throw new Error("not impelement")
  }
  
}







