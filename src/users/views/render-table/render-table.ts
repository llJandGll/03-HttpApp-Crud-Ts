import './render-table.css';
import { UserModel } from '../../models/UserModel';
import { showModal } from '../render-modal/render-modal';
import { UserServices } from '../../use-cases';
import { UserRepository } from '../../connections/UserRepository';
import { UserStore } from '../../store/UserStore';


let table : HTMLTableElement;

const createTable = () => {
  const table = document.createElement("table");
  const tableHeaders = document.createElement('thead');
  tableHeaders.innerHTML = `
    <tr>
      <th> #ID </th>
      <th> Balance </th>
      <th> FirstName </th>
      <th> LastName </th>
      <th> Active </th>
      <th> Actions </th>
    </tr>
  `;

  const tableBody = document.createElement('tbody');
  table.append( tableHeaders, tableBody);

  return table;
}


export const RenderTable = ( element : HTMLDivElement, users : UserModel[] ) : void  => {


  if (!table) {
    table = createTable();
    element.append( table );

    table.addEventListener("click", userSelectListener )
    table.addEventListener("click", (e) => {
      tableDeleteListener(e, element)
    })
  }
  let tableBodyHtml : string = "";
  users.map( user => {
    tableBodyHtml += `
    <tr>
      <td> ${ user.id }</td>
      <td> ${user.balance } </td>
      <td> ${user.firstName } </td>
      <td> ${user.lastName } </td>
      <td> ${user.isActive} </td>
      <td> ${user.gender} </td>
      <td>
        <a href= "#/" class="select-user" data-id='${ user.id }' > Select </a>
        <a href= "#/" class="delete-user" data-id='${ user.id }' > Delete </a>
      </td>
    </tr>
    `;
    table.querySelector("tbody")!.innerHTML = tableBodyHtml ;
  });
  
}

const tableDeleteListener = async(event : Event , elementto) => {
  const element = event.target as HTMLElement
  if ( !element.closest('.delete-user') ) return;

  const id = element.getAttribute('data-id');
  console.log(id)
  try {
      const userRepository = new UserRepository()
      const userServices = new UserServices( userRepository )
      const userStore = new UserStore( userServices )
      await userServices.deleteUserById(id?.toString()); 
      await userStore.relaodPage();
      const users = userStore.state.users;
      document.querySelector('#current-page').innerText = userStore.relaodPage();
      RenderTable( elementto , users);
      
  } catch (error) {
      console.log(error);
      alert('No se pudo eliminar');
  }

}


const userSelectListener = ( event : Event ) => {
  const element = event.target as HTMLElement
  if ( !element.closest('.select-user') ) return;
  const id = element.getAttribute("data-id")!;

  showModal( id )
};