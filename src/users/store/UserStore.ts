import { State } from "../interfaces/state"
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
  
   async relaodPage () {
    const users = await this.userServices.getUsers( this.state.currentPage );
    console.log('reload page', users)
    if ( users.length === 0 ) {
        await this.loadPreviousPage();
        return;
    } 
    
    return this.state.users = users;
  }
  
   getUsers () {
    return this.state.users;
  }
  

  async onUserChanged ( updatedUser : UserModel ) {
    const users = await this.relaodPage();


    // let wasFound : boolean = false;
    this.state.users = users!.map( user  => {
      if( user.id === updatedUser.id){
        // wasFound = true;
        return updatedUser;
      }
      return user;
    })

    
    // if( this.state.users.length < 10 && !wasFound){
    //   this.state.users.push( updatedUser );
    // }
    
    return this.state.users;
  }
  
}







