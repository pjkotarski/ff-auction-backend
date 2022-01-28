import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from '../../shared/configs/env.configs';
import IAuthStrategy from '../../shared/types/IAuthStrategy';
import { IUser } from '../../shared/types/IUser';


export default class GoogleAuthService implements IAuthStrategy{

    client: OAuth2Client;

    constructor() {
        this.client = new OAuth2Client(GOOGLE_CLIENT_ID);
    }

    async getUserInfo(id: string): Promise<any> {

        const ticket = await this.client.verifyIdToken({
            idToken: id,
            audience: GOOGLE_CLIENT_ID
        });

        return ticket.getPayload();
    }

    createUser(oauthUser: any): IUser {
        return {
            firstName: oauthUser.given_name,
            lastName: oauthUser.family_name,
            email: oauthUser.email,
            profilePicture: oauthUser.picture,
        };
    }

}

