import axios from 'axios';
import { UserProvider } from './UserProvider';
import { PaginatedResponse } from '../interfaces/pagination';
import { UserModel } from '../models/UserModel';
import { localhostUserModel } from '../mappers/localhostUser.mapper';
export class UserRepository implements UserProvider {

  constructor() {
    
  }

  async getUsersByPage(page: number): Promise<UserModel[]> {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${ page }`;
    const { data } = await axios.get<PaginatedResponse<UserModel>>( url );
    const users = data.data;
    return users.map( localhostUserModel );
  }



}