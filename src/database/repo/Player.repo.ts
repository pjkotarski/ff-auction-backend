import  IPlayer from '../../shared/types/IPlayer';
import { PlayerModel } from '../model/Player.model';

export default class PlayersRepo {

    public static addPlayer(player: IPlayer) {

        const playerRecord = new PlayerModel(player);

        playerRecord.save()
            .then(() => {
                console.log('SAVED ANOTHER PLAYER');
            })
            .catch(() => {
                console.log('THERE WAS AN ERROR SAVING THE PLAYER');
            });

    }

    public static clearPlayerDb() {

        PlayerModel.deleteMany({})
            .then(() => {
                console.log('REMOVED ALL PLAYERS FROM DB');
            })
            .catch(() => {
                console.log('error removing players from db');
            })

    }


    public static async getPlayers() {
        return await PlayerModel.find({}) as IPlayer[];
    }

}