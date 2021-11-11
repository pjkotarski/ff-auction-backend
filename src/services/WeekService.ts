import moment from 'moment';
import { SEASON_START } from '../shared/configs/env.configs';
import { getEspnApiClient } from '../shared/configs/espn.config';
import IEspnPlayerHolder from '../shared/types/IEspnPlayerHolder';
import PlayerService from './PlayerService';


export default class WeekService {

    constructor() {}

    private static week = '0';

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

        const client = getEspnApiClient();

        // I'm not sure if we want to do all that stuff below anymore.
        await PlayerService.clearPlayerDb();

        const freeAgents: IEspnPlayerHolder[] = await client.getFreeAgents({ seasonId: '2021', scoringPeriodId: currentWeek});
        PlayerService.savePlayersFromEspn(freeAgents);
    }



}