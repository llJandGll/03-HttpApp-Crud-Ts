import { UserModel } from "../models/UserModel";


export const userToDatabase = ( user : UserModel )  => {

  const { 
    id,
    avatar,
    balance,
    firstName,
    gender,
    isActive,
    lastName 
  } = user;

  return {
    id,
    avatar,
    balance,
    first_name : firstName,
    gender,
    isActive,
    last_name : lastName ,
  }
}
