import './render-table.css';
import { UserModel } from '../../models/UserModel';
import { showModal } from '../render-modal/render-modal';
import { UserServices } from '../../use-cases/UserServices';
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


export const RenderTable = ( element : HTMLDivElement, users : UserModel[] , userServices : UserServices, userStore? : UserStore) : void  => {


  if (!table) {
    table = createTable();
    element.append( table );

    table.addEventListener("click", ( event ) => {
      userSelectListener( event , userServices!);
    }  )
    table.addEventListener("click", (e) => {
      tableDeleteListener(e, element, userServices, userStore)
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
        <a href= "#/" class="select-user" data-id='${ user.id }' > Update </a>
        <a href= "#/" class="delete-user" data-id='${ user.id }' > Delete </a>
      </td>
    </tr>
    `;
    table.querySelector("tbody")!.innerHTML = tableBodyHtml ;
  });
  
}

const tableDeleteListener = async(event : Event , element : HTMLDivElement , userServices : UserServices , userStore? : UserStore) => {
  const data = event.target as HTMLElement
  if ( !data.closest('.delete-user') ) return;

  const id = data.getAttribute('data-id')!.toString();
  try {
      await userServices.deleteUserById( id ); 
      await userStore!.relaodPage();
      const users = await userStore!.getUsers();
      document.querySelector<any>('#current-page').innerText = userStore!.getCurrentPage();
      RenderTable( element  , users , userServices);
      
  } catch (error) {
      console.log(error);
      alert('No se pudo eliminar');
  }

}


const userSelectListener = ( event : Event , userServices : UserServices ) => {
  const element = event.target as HTMLElement
  if ( !element.closest('.select-user') ) return;
  const id = element.getAttribute("data-id")!;

  showModal( userServices , id )
};