import { User } from "../interfaces/user";

export class UserModel {
  public id? : string;
  public avatar : string;
  public balance : number;
  public firstName : string;
  public gender : string;
  public isActive : boolean;
  public lastName : string;

  constructor({
    id,
    avatar ,
    balance,
    firstName,
    gender,
    isActive,
    lastName, 
  } : User ){
    this.id         = id;
    this.avatar     =  avatar;
    this.balance    =  balance;
    this.firstName =  firstName;
    this.gender     =  gender;
    this.isActive   =  isActive;
    this.lastName  =  lastName;
    
  }



  
}