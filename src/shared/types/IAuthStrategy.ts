import { IUser } from './IUser';

export default interface IAuthStrategy {
    getUserInfo(id: string): any;
    createUser(oauthUser: any): IUser;
}