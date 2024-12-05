import './style.css'
import { UserRepository } from './users/connections/UserRepository';
import { UserServices } from './users/use-cases'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="users">

  </div>


`
const httpUsers = new UserRepository();
const users = new UserServices( httpUsers );

console.log(users.getUsers(1))

