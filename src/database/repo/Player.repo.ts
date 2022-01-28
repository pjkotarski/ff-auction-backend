import { PLAYER_PAGE_SIZE } from '../../shared/configs/env.configs';
import  IPlayer from '../../shared/types/IPlayer';
import { getPlayerModel } from '../model/Player.model'

export default class PlayersRepo {

    public static async getPlayers(leagueId: number): Promise<IPlayer[]> { 
        const PlayerModel = this.getPlayerModel(leagueId);
        return await PlayerModel.find({}).sort({ percentOwned: -1 }).lean().exec();
    }

    public static addPlayer(player: IPlayer, leagueId: number) {

        const PlayerModel = this.getPlayerModel(leagueId);

        const playerRecord = new PlayerModel(player);

        playerRecord.save()
            .then(() => {
                console.log('SAVED ANOTHER PLAYER');
            })
            .catch(() => {
                console.log('THERE WAS AN ERROR SAVING THE PLAYER');
            });

    }

    public static async getPlayer(playerId: number, leagueId: number): Promise<IPlayer> {
        const playerModel = this.getPlayerModel(leagueId);
        return await playerModel.findOne({ _id: playerId }).lean();
    }

    public static clearPlayerDb(leagueId: number) {
        const PlayerModel = this.getPlayerModel(leagueId);

        PlayerModel.deleteMany({})
            .then(() => {
                console.log('REMOVED ALL PLAYERS FROM DB');
            })
            .catch(() => {
                console.log('error removing players from db');
            })
    }


    public static async getXPlayers(x: number, leagueId: number): Promise<IPlayer[]> {

        const PlayerModel = this.getPlayerModel(leagueId);

        return await PlayerModel
            .find({})
            .sort({ percentOwned: -1})
            .limit(x)
            .lean();
    }

    public static async getPlayersByIndex(firstPlayerIndex: number, leagueId: number, search = ''): Promise<IPlayer[]> {
        const PlayerModel = this.getPlayerModel(leagueId);

        if (search) {
            return await PlayerModel
                .find({$text: {$search: search}})
                .sort({ percentOwned: -1 })
                .skip(firstPlayerIndex)
                .limit(PLAYER_PAGE_SIZE)
                .lean();
        } else {
            return await PlayerModel
                .find({})
                .sort({ percentOwned: -1 })
                .skip(firstPlayerIndex)
                .limit(PLAYER_PAGE_SIZE)
                .lean();
        }
    }

    public static async getPlayerListFromIds(playerIds: number[], leagueId: number, search=''): Promise<IPlayer[]> {

        const playerModel = this.getPlayerModel(leagueId);

        if (search) {
            return await playerModel
                .find({ '_id' : { '$in': playerIds}, $text: {$search: search}})
                .lean();
        } else {
            return await playerModel
                .find({ '_id' : { '$in': playerIds}})
                .lean();
        }
    }

    private static getPlayerModel(leagueId: number) {
        return getPlayerModel(leagueId);
    }

    public static async searchPlayers(query: string, leagueId: number): Promise<IPlayer[]> {
        const playerModel = this.getPlayerModel(leagueId);
        return await playerModel.find({$text: {$search: query}}).limit(100).lean();
    }
}