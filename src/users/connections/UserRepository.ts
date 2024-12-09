import axios from 'axios';
import { UserProvider } from './UserProvider';
import { PaginatedResponse } from '../interfaces';
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


  async saveUser( user : UserModel ) : Promise<UserModel>{
    
    if( user.id ){
       const updatedUser = await this.updateUser( user );
       return updatedUser;
    }
 
    const createdUser = await this.createUser( user )
    
    return createdUser;
  }

  async updateUser ( user : UserModel  ) : Promise<UserModel> {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;
    const userMapped = userToDatabase( user );
    const { data } = await axios.patch<UserModel>( url , userMapped , {
      headers : {
        "content-type" : "application/json; charset=UTF-8",
      },
    })


    return data;
  }

  async createUser ( user : UserModel  ) : Promise<UserModel>  {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;
    const userMapped = userToDatabase( user );
    const { data } = await axios.post<UserModel>( url , userMapped , {
      headers : {
        "content-type" : "application/json; charset=UTF-8",
      },
    })


    return data;
  }

  async getUserById ( id : string | number  ) : Promise<UserModel> {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const { data } = await axios.get<UserModel>( url );
    const users = localhostUserModel( data );
    return users;

  }

  async deleteUserById ( id : number | string ) : Promise<boolean> {

    const url = `${ import.meta.env.VITE_BASE_URL }/users/${ id }`;
    await axios.delete(url , {
      headers : {
        "content-type" : "application/json; charset=UTF-8",
      },
    } )
    return true;

}
}