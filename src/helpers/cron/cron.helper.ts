import PlayerService from '../../services/PlayerService';
import { getEspnApiClient } from '../../shared/configs/espn.config';
import IEspnPlayerHolder from '../../shared/types/IEspnPlayerHolder';

export const onCron = async() => {
    console.log('TRIGGERING CRON EVENT');
    const client = getEspnApiClient();
    await PlayerService.clearPlayerDb();
    const freeAgents: IEspnPlayerHolder[] = await client.getFreeAgents({ seasonId: '2021', scoringPeriodId: '5'});
    PlayerService.savePlayersFromEspn(freeAgents);
}
