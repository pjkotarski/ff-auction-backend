import { ILeague } from '../../shared/types/ILeague';
import { LeagueModel } from '../model/League.model';

export default class LeagueRepo {

    public static async saveLeague(newLeague: ILeague) {
        const league = new LeagueModel(newLeague);
        try { 
            return await league.save();
        } catch (error) {
            throw new Error;
        }
    }

    public static getLeagues(): Promise<ILeague[]> {
        return LeagueModel.find({}).lean().exec();
    }

    public static async getLeagueById(leagueId: number): Promise<ILeague> {
        return LeagueModel.findOne({ _id: leagueId }).lean().exec();
    }

    public static async addUserToLeague(leagueId: number, userId: string): Promise<ILeague> {
        return await LeagueModel.findByIdAndUpdate(leagueId, {$push: { members: userId }}).lean().exec();
    }

    public static async addUserAsComissioner(leagueId: number, userId: string): Promise<ILeague> {
        return await LeagueModel.findByIdAndUpdate(leagueId, { commissioner: userId}).lean().exec();
    }

}