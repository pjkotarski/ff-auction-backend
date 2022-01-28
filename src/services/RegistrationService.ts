import { InternalServerError } from '../shared/types/errors/InternalServer.error';
import { ILeague } from '../shared/types/ILeague';
import { IUser } from '../shared/types/IUser';
import { assignUserToLeague, createLeagueAndAddComissioner } from './LeagueService';
import UserServie from './UserService';


export default class RegistrationService {

    static async registerUserAndLeague(userId: string, user: IUser, league: ILeague) {
        
        try {
            const newLeague = await createLeagueAndAddComissioner(league, user._id);
            user.league_id = newLeague._id;
            const newUser = await UserServie.updateExistingUser(userId, user);

            return { newUser: newUser, newLeague: newLeague };
            
        } catch (_) {
            throw new InternalServerError('could not update user and league');
        }

    }

    static async registerUserToLeague(userId: string, user: IUser, leagueId: number) {
        
        try {
            const league: ILeague = await assignUserToLeague(leagueId, userId);
            user.league_id = league._id;
            const newUser = await UserServie.updateExistingUser(userId, user);

            return { newUser: newUser, newLeague: league };
        } catch(_) {
            throw new InternalServerError('could not create user and add to league');
        }
    }

}