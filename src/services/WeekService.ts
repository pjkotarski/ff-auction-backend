import moment from 'moment';
import BidsRepo from '../database/repo/Bids.repo';
import { SEASON_START } from '../shared/configs/env.configs';
import { getEspnApiClient } from '../shared/configs/espn.config';
import IEspnPlayerHolder from '../shared/types/IEspnPlayerHolder';
import { ILeague } from '../shared/types/ILeague';
import { getLeagues } from './LeagueService';
import PlayerService from './PlayerService';


export default class WeekService {

    constructor() {}

    private static week = this.resolveWeek();

    static setWeek(week: string): void {
        this.week = week;
    }

    static getWeek(): string {
        return this.week;
    }

    static resolveWeek(): string {
        const today = moment();
        const seasonStart = moment(SEASON_START, 'YYYY-MM-DD');
        return today.diff(seasonStart, 'week').toString();
    }

    static async onCron() {

        const currentWeek = this.resolveWeek();
        this.setWeek(currentWeek);
        BidsRepo.clearBids();

        const leagues = await getLeagues();

        leagues.forEach((league: ILeague) => {
            WeekService.updatePlayerDbs(league, currentWeek);
        });
    }

    static async updatePlayerDbs(league: ILeague, week: string) {

        PlayerService.clearPlayerDb(league._id);
        const espnClient = getEspnApiClient(league.espnSWID, league.espnS2);
        const freeAgents: IEspnPlayerHolder[] = await espnClient.getFreeAgents({ seasonId: '2021', scoringPeriodId: week});
        PlayerService.savePlayersFromEspn(freeAgents, league._id);
    }
}