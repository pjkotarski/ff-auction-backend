import IAuthStrategy from '../../shared/types/IAuthStrategy';
import { IUser } from '../../shared/types/IUser';

export default class FacebookAuthService implements IAuthStrategy{
    getUserInfo(id: string): any {

    }

    createUser(oauthUser: any): IUser {
        return {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
            profilePicture: '',
            league_id: null,
            teamName: ''
        };
    }
}