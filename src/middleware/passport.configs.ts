import { Strategy } from 'passport-jwt';
import { PUB_KEY } from '../shared/configs/env.configs';

import UserRepo from '../database/repo/User.repo';

const cookieExtractor = (req:any) => {

    let token = null;
    if (req && req.cookies)
    {
        token = req.cookies.access_token;
    }
    return token;
};

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: PUB_KEY,
    algorithsm: ['RS256']
}

const strategy = new Strategy(options, async(payload: any, done: any) => {

    try {
        const user = await UserRepo.findUserById(payload.sub);

        if (!user) {
            throw Error;
        }

        done(null, user);
    } catch(err) {
        done(err, null);
    }
});

export const jwtMiddleware = (passport: any) => {
    passport.use(strategy);
}

