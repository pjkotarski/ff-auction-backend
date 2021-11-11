import PlayersRepo from '../database/repo/Player.repo';
import { InjuryStatusEnum, PositionEnum } from '../shared/enums/playerEnums';
import IEspnPlayer from '../shared/types/IEspnPlayer';
import IEspnPlayerHolder from '../shared/types/IEspnPlayerHolder';
import IPlayer from '../shared/types/IPlayer';


export default class PlayerService {

    constructor() {}

    static savePlayersFromEspn(espnPlayers: IEspnPlayerHolder[]) {
        espnPlayers.map(espnPlayer => {
            const player = PlayerService.convertPlayer(espnPlayer);
            PlayersRepo.addPlayer(player);
        });
    }

    static clearPlayerDb() {
        PlayersRepo.clearPlayerDb();
    }

    static convertPlayer(playerHolder: IEspnPlayerHolder) {

        const espnPlayer: IEspnPlayer = playerHolder.player;

        if (!espnPlayer) {
            console.log('LOG AND THROW SOME TYPE OF ERROR HERE');
        }

        return {
            _id: espnPlayer.id,
            firstName: espnPlayer.firstName,
            lastName: espnPlayer.lastName,
            fullName: espnPlayer.fullName,
            jerseyNumber: espnPlayer.jerseyNumber,
            team: espnPlayer.proTeam,
            teamAbbr: espnPlayer.proTeamAbbreviation,
            percentOwned: espnPlayer.percentOwned,
            position: PositionEnum[ espnPlayer.defaultPosition as keyof typeof PositionEnum],
            injuryStatus: InjuryStatusEnum[espnPlayer.injuryStatus as keyof typeof InjuryStatusEnum]
        } as IPlayer;

    }

}
