import { UserRepository } from "./users/connections/UserRepository";
import { UserStore } from "./users/store/UserStore";
import { UserServices } from "./users/use-cases";


export const UsersApp =  async ( element : HTMLDivElement) => {
  if( !element ) throw new Error('element is null or undefined');

  try{
    element.innerHTML = `Loading...`;
    const userRepository = new UserRepository();
    const userService = new UserServices( userRepository );
    const userStore = new UserStore( userService );
    console.log( await userStore.loadNextPage())
  }catch( error : any ){
    console.log(error)
    element.innerHTML =  `Error en users.app.ts ${ error.message }`;

  }
}
