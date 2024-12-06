import './render-table.css';
import { UserModel } from '../../models/UserModel';


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
        <a href= "#/" data-id='${ user.id }' > Select </a>
        <a href= "#/" data-id='${ user.id }' > Delete </a>
      </td>
    </tr>
    `;
    table.querySelector("tbody")!.innerHTML = tableBodyHtml ;
  });
  
}
