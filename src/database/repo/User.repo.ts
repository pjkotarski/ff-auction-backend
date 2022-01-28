import { InternalServerError } from '../../shared/types/errors/InternalServer.error';
import { IUser } from '../../shared/types/IUser';
import { UserModel } from '../model/User.model';


export default class UserRepo {
    
    public static async saveUser(newUser: IUser): Promise<IUser> {
        
        const user = new UserModel(newUser);
        try { 
            return await user.save();
        } catch (error) {
            console.log('There was an error saving user', error);
            return null;
        }
    }

    public static async findUserById(id: string): Promise<IUser> {
        return await UserModel.findById(id).lean();
    }

    public static async findUserByEmail(email: string): Promise<IUser> {
        return await UserModel.findOne({ email: email }).lean();
    }

    public static updateUserLeague(user: IUser, leagueId: number): Promise<IUser> {

        /* You could do find one and update for everything that changed?  */

        return UserModel.findOneAndUpdate({ _id: user._id }, { league_id: leagueId }).lean().exec();
    }

    public static updateNewUserFields(userId:string, updates: any): Promise<IUser> {
        return UserModel.findByIdAndUpdate(userId, updates).lean().exec();
    }

    public static async getUserLeague(user: IUser): Promise<number> {
        const foundUser = await UserModel.findOne({ _id: user._id }).lean().exec();

        if (!foundUser) throw new Error('could not find the user');

        return user.league_id;
    }

}