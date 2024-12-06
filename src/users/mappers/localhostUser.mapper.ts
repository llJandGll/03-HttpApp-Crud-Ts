import { User } from '../interfaces/user';
import { UserModel } from "../models/UserModel"


export const localhostUserModel = ( localhostUser : any) : UserModel   => {

  const { 
    avatar,
    balance,
    first_name,
    gender,
    id,
    isActive,
    last_name, 
  } = localhostUser;

  return new UserModel({
    avatar,
    balance,
    firstName : first_name,
    gender,
    id,
    isActive,
    lastName : last_name, 
  })
}
