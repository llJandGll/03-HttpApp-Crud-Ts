import { UserRepository } from "./users/connections/UserRepository";
import { UserStore } from "./users/store/UserStore";
import { UserServices } from "./users/use-cases";
import { RenderTable } from "./users/views/render-table/render-table";


export const UsersApp =  async ( element : HTMLDivElement) => {
  if( !element ) throw new Error('element is null or undefined');

  try{
    const userRepository = new UserRepository();
    const userService = new UserServices( userRepository );
    const userStore = new UserStore( userService );
    element.innerHTML = `Loading...`;
    const users = await userStore.loadNextPage()
    element.innerHTML = "";

    RenderTable( element, users  );
  }catch( error : any ){
    console.log(error)
    element.innerHTML =  `Error en users.app.ts ${ error.message }`;

  }
}
