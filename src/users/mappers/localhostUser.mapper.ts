import { UserModel } from "../models/UserModel"


export const localhostUserModel = ( localhostUser : any) : UserModel   => {

  const { 
    id,
    avatar,
    balance,
    first_name,
    gender,
    isActive,
    last_name, 
  } = localhostUser;

  return new UserModel({
    id,
    avatar,
    balance,
    firstName : first_name,
    gender,
    isActive,
    lastName : last_name, 
  })
}
