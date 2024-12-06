import { User } from "../interfaces/user";

export class UserModel {

  public id : number;
  public avatar : string;
  public balance : number;
  public first_name : string;
  public gender : string;
  public isActive : boolean;
  public last_name : string;

  constructor({
    id,
    avatar ,
    balance,
    firstName,
    gender,
    isActive,
    lastName, 
  } : User ){
    this.id         =  id
    this.avatar     =  avatar
    this.balance    =  balance
    this.first_name =  firstName
    this.gender     =  gender
    this.isActive   =  isActive
    this.last_name  =  lastName
    
  }



  
}