import { BadRequestError } from '../types/errors/BadRequest.error';
import { IUser } from '../types/IUser'


export const resolveUser = (req: any): IUser => {

    const user: IUser = req.body.user;
    if (!user) throw new BadRequestError();
    return user;
}

export const resolveLeagueId = (req: any): number => {

    const leagueId: number = req.body.user.league_id;
    if (!leagueId) throw new BadRequestError();
    return leagueId;
}

