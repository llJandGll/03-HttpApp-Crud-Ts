import { UserModel } from '../models/UserModel';
export interface State {
  currentPage : number,
  users : UserModel[]
}