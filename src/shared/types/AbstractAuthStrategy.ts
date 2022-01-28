import { IUser } from './IUser';

export default abstract class AbstractAuthStrategy {

    constructor() {}

    abstract getUserInfo(id: string): any;
    abstract createUser(oauthUser: any): IUser;
}