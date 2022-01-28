import LeagueRepo from '../database/repo/League.repo'
import { InternalServerError } from '../shared/types/errors/InternalServer.error';
import { NotFoundError } from '../shared/types/errors/NotFound.error';
import { ILeague } from '../shared/types/ILeague';
import { IUser } from '../shared/types/IUser';

export const getLeagues = async(): Promise<ILeague[]> => {
    try {
        return await LeagueRepo.getLeagues();
    } catch (e) {
        throw new InternalServerError('could not get leagues');
    }
}

export const saveLeague = async(league: ILeague) => {
    try {
        return await LeagueRepo.saveLeague(league);
    } catch(e) {
        throw new InternalServerError;
    }
}

export const getLeague = async(leagueId: number) => {

    let league;
    try {
        league = await LeagueRepo.getLeagueById(leagueId);

        if (!league) {
            throw new Error;
        }

        return league;
    } catch(e) {
        throw new NotFoundError('could not find a league with id');
    }
}

export const createLeagueAndAddComissioner = async(league: ILeague, commissionerId: string): Promise<ILeague> => {

    league.commissioner = commissionerId;
    try {
        return await saveLeague(league);
    } catch(_) {
        throw new InternalServerError('could not create league');
    }
}

export const assignUserToLeague = async(leagueId: number, userId: string) => {
    try {
        return await LeagueRepo.addUserToLeague(leagueId, userId);
    } catch(_) {
        throw new InternalServerError('could not add user to league');
    }
}

export const addUserAsComissioner = async(leagueId: number, userId: string) => {
    try { 
        return await LeagueRepo.addUserAsComissioner(leagueId, userId);
    } catch(_) {
        throw new InternalServerError('could not add user as comissioner for league');
    }
}

//what makes the most sense for me?? --> to keep the front end as simple as posisble. 

// therefore, we're just going to have the object and the user object completely separate with fundamental building 
// blocks on the service level. 




