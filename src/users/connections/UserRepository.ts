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
       const updatedUser = await this.updateUser( user );
       return updatedUser;
    }

    const createdUser = await this.createUser( user )
    
    console.log('user repository',createdUser);
    return createdUser;
  }

  async updateUser ( user : UserModel  )  {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const userMapped = userToDatabase( user );
    const updatedUser = await axios({
      headers : {
        "content-type" : "application/json; charset=UTF-8",
      },
      method : "PATCH",
      url : url,
      data : userMapped
    })

    return updatedUser;
  }

  async createUser ( user : UserModel  )  {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const userMapped = userToDatabase( user );
    const createdUser = await axios({
      headers : {
        "content-type" : "application/json; charset=UTF-8",
      },
      method : "POST",
      url : url,
      data : userMapped
    })

    return createdUser;
  }


  async getUserById ( id : string | number  ) {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const { data } = await axios.get<UserModel>( url );
    console.log(data)
    const users = localhostUserModel( data );
    return users;

  }
}