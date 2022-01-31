import BidsRepo from '../database/repo/Bids.repo';
import LeagueRepo from '../database/repo/League.repo';
import PlayersRepo from '../database/repo/Player.repo';
import { PLAYER_PAGE_SIZE } from '../shared/configs/env.configs';
import { InjuryStatusEnum, PositionEnum } from '../shared/enums/playerEnums';
import { InternalServerError } from '../shared/types/errors/InternalServer.error';
import IBid from '../shared/types/IBid';
import IEspnPlayer from '../shared/types/IEspnPlayer';
import IEspnPlayerHolder from '../shared/types/IEspnPlayerHolder';
import { ILeague } from '../shared/types/ILeague';
import IPlayer from '../shared/types/IPlayer';


export default class PlayerService {

    constructor() {}

    static savePlayersFromEspn(espnPlayers: IEspnPlayerHolder[], leagueId: number) {
        espnPlayers.map(espnPlayer => {
            const player = PlayerService.convertPlayer(espnPlayer);
            PlayersRepo.addPlayer(player, leagueId);
        });
    }

    static clearPlayerDb(leagueId: number) {
        PlayersRepo.clearPlayerDb(leagueId);
    }

    static async getPlayerWithBids(playerId: number, league_id: number): Promise<IPlayer> {

        const promiseResults = await Promise.all([PlayersRepo.getPlayer(playerId, league_id), BidsRepo.getBidsForPlayer(playerId, league_id)]);

        const player: IPlayer = promiseResults[0];
        const bids: IBid[] = promiseResults[1];

        player.bids = bids;

        return player;
    }

    static convertPlayer(playerHolder: IEspnPlayerHolder) {

        const espnPlayer: IEspnPlayer = playerHolder.player;

        if (!espnPlayer) {
            throw new InternalServerError('something went wrong converting players');
        }

        if (espnPlayer.eligiblePositions[0] === 'K') {
            espnPlayer.defaultPosition = 'K';
        }

        const newPlayer = {
            _id: espnPlayer.id,
            firstName: espnPlayer.firstName,
            lastName: espnPlayer.lastName,
            fullName: espnPlayer.fullName,
            jerseyNumber: espnPlayer.jerseyNumber,
            team: espnPlayer.proTeam,
            teamAbbr: espnPlayer.proTeamAbbreviation,
            percentOwned: espnPlayer.percentOwned,
            position: espnPlayer.defaultPosition,
            injuryStatus: espnPlayer.injuryStatus
        } as IPlayer;

        if (newPlayer.position === 'TQB') {
            newPlayer.position = 'QB';
        }

        return newPlayer;

    }

    static getPlayers(league_id: number) {
        return PlayersRepo.getXPlayers(20, league_id);
    }

    static getPlayersByPage(page: number, league_id: number): Promise<IPlayer[]> {

        const firstPlayerIndex = PLAYER_PAGE_SIZE * page;

        return PlayersRepo.getPlayersByIndex(firstPlayerIndex, league_id);
    }

}

