import { UserRepository } from "./users/connections/UserRepository";
import { UserServices } from "./users/use-cases";


export const UsersApp =  async ( element : HTMLDivElement) => {
  if( !element ) throw new Error('element is null or undefined');

  try{
    element.innerHTML = `Loading...`;
    const userRepository = new UserRepository();
    const userService = new UserServices( userRepository );
    const users = userService.getUsers();
    console.log(users)
  }catch( error : any ){
    console.log(error)
    element.innerHTML =  `Error ${ error.message }`;

  }
}
