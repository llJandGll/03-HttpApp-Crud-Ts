import axios from 'axios';
import { UserProvider } from './UserProvider';
import { PaginatedResponse } from '../interfaces/pagination';
import { UserModel } from '../models/UserModel';
import { localhostUserModel } from '../mappers/localhostUser.mapper';
import { userToDatabase } from '../mappers/UserToDatabase.mapper';
export class UserRepository implements UserProvider {

  constructor() {
     
  }

  async getUsersByPage(page: number): Promise<UserModel[]> {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${ page }`;
    const { data } = await axios.get<PaginatedResponse<UserModel>>( url );
    if ( data.last < page && !data.next ) return [];
    const users = data.data;
    return users.map( localhostUserModel );
  }


  async saveUser( user : UserModel ){
    
    if( user.id ){
      throw 'not implement'
    }

    const updatedUser = await this.createUser( user )
    
    console.log('user repository',updatedUser);
    return updatedUser;
  }

  async createUser ( user : UserModel  )  {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const userMapped = userToDatabase( user );
    const data = await axios({
      headers : {
        "content-type" : "application/json; charset=UTF-8",
      },
      method : "POST",
      url : url,
      data : userMapped
    })

    return data;
  }



}