import express from 'express';
import passport from 'passport';
import { signInUser } from '../../services/Auth/AuthService';
import { authStrategyEnum } from '../../shared/enums/authStrategyEnum';

const router = express.Router();

router.get('/resolve-token', passport.authenticate('jwt', { session: false }), (req: any, res: any) => {
    return res.status(200).json(req.user);
});

router.post('/google', async(req: any, res:any) => {

    const { token } = req.body;
    const { createdUser, jwt } = await signInUser(token, authStrategyEnum.GOOGLE);

    return res
        .cookie('access_token', jwt.token, {
            httpOnly: true
        })
        .status(200)
        .json({user: createdUser});
});

export default router;