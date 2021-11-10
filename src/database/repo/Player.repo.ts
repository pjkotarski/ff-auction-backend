import  IPlayer from '../../shared/types/IPlayer';
import { PlayerModel } from '../model/Player.model';

export default class PlayersRepo {

    public static async addPlayer(player: IPlayer) {

        const playerRecord = new PlayerModel(player);

        try {
            return await playerRecord.save();
        } catch(error) {
            console.log('THERE WAS AN ERROR SAVING PLAYER', error);
            return {
                error: 'error saving player'
            }
        }
    }
}