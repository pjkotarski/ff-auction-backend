import UserRepo from '../database/repo/User.repo';
import { ILeague } from '../shared/types/ILeague';
import { IUser } from '../shared/types/IUser';
import { NotFoundError } from '../shared/types/errors/NotFound.error';
import { InternalServerError } from '../shared/types/errors/InternalServer.error';

export default class UserServie {

    static async createUser(ticket: any): Promise<IUser> { 
        const createdUser: IUser = this.mapToUser(ticket);
        
        return await UserRepo.saveUser(createdUser);
    }

    static async updateExistingUser(userId: string, updates: IUser): Promise<IUser> {
        try {
            return await UserRepo.updateNewUserFields(userId, updates);
        } catch(e) {
            throw new InternalServerError('could not update the user');
        }
    }

    static mapToUser(ticket: any) {
        return {
            firstName: ticket.given_name,
            lastName: ticket.family_name,
            email: ticket.email,
            profilePicture: ticket.picture
        } as IUser;
    }

    static async assignLeagueToUser(user: IUser, league: ILeague): Promise<IUser> {

        try {
            const existingUserLeague = await UserRepo.getUserLeague(user);

            if (existingUserLeague) {
                throw new Error('user already exists to a league');
            }

            const updatedUser = await UserRepo.updateUserLeague(user, league._id);

            if (!updatedUser) throw Error;

            return updatedUser;

        } catch(e) {
            throw new NotFoundError('could not update user');
        }
    }

    static async registerUserAndLeague(user: IUser, userUpdates: IUser, league: ILeague) {
        /* basically, you've got to do the league stuff first. */
    }

    static async registerUserAndAssignLeague(user: IUser, userUpdates: IUser, league: ILeague) {
        /* you will at least need the league id here, right?  */
    }
}
