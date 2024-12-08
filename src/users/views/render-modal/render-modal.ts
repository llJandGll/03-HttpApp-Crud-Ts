// render-modal.ts
import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { User } from '../../interfaces/user';
import { UserServices } from '../../use-cases';
import { UserRepository } from '../../connections/UserRepository';

let modalInstance: HTMLDivElement | null = null;
let form : HTMLFormElement;



export const RenderModal = (element: HTMLDivElement ) => {

  if (modalInstance) {
    return modalInstance;
  }

  modalInstance = document.createElement("div");
  modalInstance.innerHTML = modalHtml;
  modalInstance.className = 'modal-container hide-modal';
  element.append(modalInstance);


  modalInstance.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.className === 'modal-container') {
      hideModal( form );
    }
  });

  form = modalInstance?.querySelector("form")!;
  
  form?.addEventListener("submit", async ( e ) => {
    e.preventDefault();
    const user = formData( form );
    const userRepository = new UserRepository()
    const userServices = new UserServices( userRepository );
    const postUsers = await userServices.saveUser( user );
    hideModal( form )
    console.log("render modal",postUsers)
  })

}

const formData = ( form : HTMLFormElement ) : User => {
  const formData = new FormData( form );
  const user: Partial<User> = {};

  for (const [key, value] of formData) {


    if (key === 'balance') {
      user[key as 'balance'] = +value || 0;
      continue;
    }
  
    if (key === 'isActive') {
      (value === 'on') ? 
        user[key] = true : 
        user[key] = false;
      continue;
    }
  
    user[key as keyof User] = value.toString() as any;
  }

  if (
    user.avatar!.length <= 0 ||
    user.balance! <= 0 ||
    user.firstName!.length <= 0 ||
    user.lastName!.length <= 0 ||
    user.gender!.length <= 0
  ){
    throw new Error("empty field")
  }

 
  return user as User;

}


export const showModal = () => {
  modalInstance?.classList.remove('hide-modal');
 
}

export const hideModal = ( form : HTMLFormElement) => {
  modalInstance?.classList.add('hide-modal');
  form?.reset();
 
}