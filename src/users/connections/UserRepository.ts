import axios from 'axios';
import { User } from '../interfaces/user';
import { UserProvider } from './UserProvider';
import { PaginatedResponse } from '../interfaces/pagination';
export class UserRepository implements UserProvider {

  constructor() {
    
  }

  async getUsersByPage(page: number): Promise<User[]> {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${ page }`;
    const { data } = await axios.get<PaginatedResponse<User>>( url );
    const { data : users } = data;
    return users;
  }



}