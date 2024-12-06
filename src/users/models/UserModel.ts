import { User } from "../interfaces/user";

export class UserModel {

  public readonly id : number;
  public readonly avatar : string;
  public readonly balance : number;
  public readonly first_name : string;
  public readonly gender : string;
  public readonly isActive : boolean;
  public readonly last_name : string;

  constructor({
    id,
    avatar ,
    balance,
    first_name,
    gender,
    isActive,
    last_name 
  } : User ){
    this.id         =  id
    this.avatar     =  avatar
    this.balance    =  balance
    this.first_name =  first_name
    this.gender     =  gender
    this.isActive   =  isActive
    this.last_name  =  last_name
    
  }



  
}