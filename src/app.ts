import express from 'express';
import dotenv from 'dotenv';
import './database/connect';
import BidsRepo from './database/repo/Bids.repo';
import IBid from './shared/types/IBid';
import IPlayer from './shared/types/IPlayer';
import { PositionEnum, InjuryStatusEnum } from './shared/enums/playerEnums';
import PlayersRepo from './database/repo/Player.repo';
import cron from 'node-cron';
import { onCron } from './helpers/cron/cron.helper';
import PlayerService from './services/PlayerService';


dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

// cron event triggered every Tuesday at 12:00 am
cron.schedule('0 0 * * 2', () => onCron);


app.get('/restore-players', (req: any, res: any) => {
    onCron();
    res.send('restored players');
})

app.get('/add-bid', async(req: any, res: any) => {

    const bidDao: IBid = {
        player_id: 'player id',
        amount: 90,
        isLeader: false
    };

    const result = await BidsRepo.addBid(bidDao);

    res.json(JSON.stringify(result));
});

app.get('/get-bids', async(req: any, res:any) => {

    const bids: IBid[] = await BidsRepo.getBids();

    return res.json(JSON.stringify(bids));
});


app.get('/all-players', async(req: any, res: any) => {


    console.log('ATTEMPTING TO GET PLAYERS');
    const freeAgents = await onCron();

    res.json(freeAgents);

});

app.get('/get-players', async(req: any, res:any) => {

    const players: IPlayer[] = await PlayersRepo.getPlayers();

    return res.json(JSON.stringify(players));
});



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
