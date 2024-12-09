// render-modal.ts
import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { User } from '../../interfaces/user';
import { UserServices } from '../../use-cases';
import { RenderTable } from '../render-table/render-table';
import { UserStore } from '../../store/UserStore';
import { UserModel } from '../../models/UserModel';

let modalInstance: HTMLDivElement | null = null;
let form : HTMLFormElement;
let loaderUser : object = {};



export const RenderModal = (element: HTMLDivElement, userServices : UserServices, userStore : UserStore ) => {

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
    await userServices.saveUser( user );
    hideModal( form )
    userStore.onUserChanged( user );
    const users = userStore.getUsers();
    RenderTable( element , users, userServices );
  })

}

const formData = ( form : HTMLFormElement ) : User => {
  const formData = new FormData( form );
  const user: Partial<User> = {...loaderUser};

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


export const showModal = async (userServices : UserServices ,  id? : string | number) => {
  loaderUser = {};
  modalInstance?.classList.remove('hide-modal');
  if ( !id) return;
  const user = await userServices.getUserById( id );
  setFormValues( user );
}


const setFormValues = ( user : UserModel ) => {
  form.querySelector<HTMLInputElement>('[name="firstName"]')!.value =  user.firstName;
  form.querySelector<HTMLInputElement>('[name="lastName"]')!.value =  user.lastName;
  form.querySelector<HTMLInputElement>('[name="balance"]')!.value =  user.balance.toString();
  form.querySelector<HTMLInputElement>('[name="avatar"]')!.value =  user.avatar;
  form.querySelector<HTMLInputElement>('[name="gender"]')!.value =  user.gender;
  form.querySelector<HTMLInputElement>('[name="isActive"]')!.checked =  user.isActive;

  loaderUser = user;
}


export const hideModal = ( form : HTMLFormElement) => {
  modalInstance?.classList.add('hide-modal');
  form?.reset();
 
}