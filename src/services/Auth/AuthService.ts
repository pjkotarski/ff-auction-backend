import { IUser } from '../../shared/types/IUser'
import { sign } from 'jsonwebtoken';
import { authStrategyEnum } from '../../shared/enums/authStrategyEnum';
import IAuthStrategy from '../../shared/types/IAuthStrategy';
import GoogleAuthService from './GoogleAuthService';
import FacebookAuthService from './FacebookAuthService';
import UserRepo from '../../database/repo/User.repo';
import { signJwt } from '../JwtService';


export const signInUser = async(token: string, authStrategy: string) => {

    const authProvider = resolveAuthStrategy(authStrategy);
    const userDetails = await authProvider.getUserInfo(token);

    let user = await UserRepo.findUserByEmail(userDetails.email);

    if (!user) {
        user = await UserRepo.saveUser(authProvider.createUser(userDetails));
    }

    const jwt = issueJWT(user);

    return { 
        createdUser: user,
        jwt: jwt
    }
}

export const issueJWT = (user: IUser) => {
    const id = user._id;
    const expiresIn = '1d';
    const payload = {
        sub: id,
        iat: Date.now()
    }

    return {
        token: signJwt(payload),
        expires: expiresIn
    }
}


export const resolveAuthStrategy = (authStrategy: string): IAuthStrategy => {
    
    if (authStrategy === authStrategyEnum.GOOGLE) {
        return new GoogleAuthService();
    } else if (authStrategy === authStrategyEnum.FACEBOOK) {
        return new FacebookAuthService();
    }

}