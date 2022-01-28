import jwt from 'jsonwebtoken';
import { PRIV_KEY, PUB_KEY } from '../shared/configs/env.configs';
import { IJwtPayload } from '../shared/types/IJwtPaylaord';


export const signJwt = (payload: IJwtPayload): string => {
    return jwt.sign(payload, PRIV_KEY, { algorithm: 'RS256' });
};

export const verifyJwt = (signedToken: string) => {

    try {        
        const payload = jwt.verify(signedToken, PUB_KEY, { algorithms: ['RS256'] });
        if (!payload.sub) throw Error;
        return payload.sub;
    } catch(err) {
       return false;
    }
}
