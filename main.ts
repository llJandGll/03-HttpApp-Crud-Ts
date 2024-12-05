import { UsersApp } from './src/users.app';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="card">
    <div> que onda que pex</div>
  </div>

`

const parentElement = document.querySelector<HTMLDivElement>(".card")!;
// if ( !parentElement) throw new Error("Element not found");
UsersApp( parentElement );


