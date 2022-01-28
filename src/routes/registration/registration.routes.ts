import express, { NextFunction } from 'express';
import { getLeague, saveLeague } from '../../services/LeagueService';
import UserServie from '../../services/UserService';
import { InternalServerError } from '../../shared/types/errors/InternalServer.error';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { ILeague } from '../../shared/types/ILeague';
import { IUser } from '../../shared/types/IUser';
import { BadRequestError } from '../../shared/types/errors/BadRequest.error';
import { resolveUser } from '../../shared/utils/request.resolver';
import RegistrationService from '../../services/RegistrationService';
const router = express.Router();

router.post('/register-user-league', passport.authenticate('jwt', { session: false }), asyncHandler(async(req: any, res: any, next: NextFunction) => {

    const user = resolveUser(req);

    let league: ILeague;
    let userUpdates: IUser;
    let hasExistingLeague: boolean;

    try { 
        userUpdates = req.body.newUser;
        league = req.body.league;
        hasExistingLeague = req.body.hasExistingLeague;
        if (!user || !league || !hasExistingLeague) {
            throw new Error;
        }

    } catch(e) {
        throw new BadRequestError('could not find user or league objects')
    }

    if (hasExistingLeague) {

        const { newLeague, newUser } = await RegistrationService.registerUserToLeague(user._id, userUpdates, league._id);
        res.status(200).json({
            league: newLeague,
            user: newUser
        });
    } else {
        const { newLeague, newUser } = await RegistrationService.registerUserAndLeague(user._id, userUpdates, league); 
        res.status(200).json({
            league: newLeague,
            user: newUser
        });
    }
}));

router.post('/get-league', asyncHandler(async(req: any, res: any, next: NextFunction) => {
    const leagueId = req.body.leagueId;

    if (!leagueId) {
        throw new Error('bad request error');
    }

    const league = await getLeague(leagueId);

    res.status(200).json(league);
}));

router.post('/assign-user-to-league', passport.authenticate('jwt', { session: false }), async(req: any, res: any) => {

    const user = req.user;

    const league = req.league

    if (!user || !league) throw new Error('bad request');

    const updatedUser = await UserServie.assignLeagueToUser(user, league);
    res.status(200).json(updatedUser);

});



router.post('/register-league', passport.authenticate('jwt', { session: false }) ,async(req: any, res: any) => {

    const user = req.user;

    let league;
    try {
        league = req.body.league;

        if (!league) { 
            throw Error;
        }

    } catch (e) {
        throw new Error('bad request error');
    }

    league.commissioner = user._id;
    const createdLeague = await saveLeague(league);

    if (createdLeague) {
         
        const newUser = await UserServie.assignLeagueToUser(user, createdLeague);
        
        if (newUser) {
            res.status(200).json(createdLeague);
            return;
        }
    }
    
    throw new InternalServerError('could not create league, unknown error occured');
    
});


//How should this whole registration process work? 
/* 
    1) you will register your user. If that works, then you will register the league with the user id configured as comissioner. We could just make one endpoint for both. 





*/


export default router;