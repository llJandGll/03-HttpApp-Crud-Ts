import { UsersApp } from './src/users.app';
import './style.css';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="card">
  </div>

`

const parentElement = document.querySelector<HTMLDivElement>(".card")!;
// if ( !parentElement) throw new Error("Element not found");
UsersApp( parentElement );


