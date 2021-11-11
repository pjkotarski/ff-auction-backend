import express from 'express';
import './database/connect';
import BidsRepo from './database/repo/Bids.repo';
import IBid from './shared/types/IBid';
import IPlayer from './shared/types/IPlayer';
import PlayersRepo from './database/repo/Player.repo';
import cron from 'node-cron';
import WeekService from './services/WeekService';

const port = process.env.SERVER_PORT;
const app = express();

// cron event triggered every Tuesday at 12:00 am
cron.schedule('0 0 * * 2', () => WeekService.onCron);


app.get('/trigger-cron', (req: any, res: any) => {
    WeekService.onCron();
    res.send('imitate cron');
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


app.get('/get-players', async(req: any, res:any) => {

    const players: IPlayer[] = await PlayersRepo.getXPlayers(20);

    return res.json(JSON.stringify(players));
});



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
