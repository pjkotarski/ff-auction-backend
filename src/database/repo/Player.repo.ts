import WeekService from '../../services/WeekService';
import { PLAYER_PAGE_SIZE } from '../../shared/configs/env.configs';
import  IPlayer from '../../shared/types/IPlayer';
import { getPlayerModel } from '../model/Player.model'

export default class PlayersRepo {

    public static addPlayer(player: IPlayer) {

        const PlayerModel = this.getPlayerModel();

        const playerRecord = new PlayerModel(player);

        playerRecord.save()
            .then(() => {
                console.log('SAVED ANOTHER PLAYER');
            })
            .catch(() => {
                console.log('THERE WAS AN ERROR SAVING THE PLAYER');
            });

    }

    public static async getPlayer(playerId: number): Promise<IPlayer> {
        const playerModel = this.getPlayerModel();
        return (await playerModel.findOne({ _id: playerId })).toObject();
    }

    public static clearPlayerDb() {
        const PlayerModel = this.getPlayerModel();

        PlayerModel.deleteMany({})
            .then(() => {
                console.log('REMOVED ALL PLAYERS FROM DB');
            })
            .catch(() => {
                console.log('error removing players from db');
            })
    }


    public static async getXPlayers(x: number): Promise<IPlayer[]> {

        const PlayerModel = this.getPlayerModel();

        const players: IPlayer[] = await PlayerModel
            .find({})
            .sort({ percentOwned: -1})
            .limit(x)
            .exec();

        return players;
    }

    public static async getPlayersByIndex(firstPlayerIndex: number): Promise<IPlayer[]> {
        const PlayerModel = this.getPlayerModel();

        return await PlayerModel
            .find({})
            .sort({ percentOwned: -1 })
            .skip(firstPlayerIndex)
            .limit(PLAYER_PAGE_SIZE)
            .exec();
    }


    private static getPlayerModel() {
        return getPlayerModel(WeekService.getWeek());
    }
}