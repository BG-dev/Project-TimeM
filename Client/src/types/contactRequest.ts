import IUser from './user';

export default interface IContactRequest {
  id?: string;
  sender?: IUser;
  recipient?: IUser;
}
