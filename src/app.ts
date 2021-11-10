import express from 'express';
import dotenv from 'dotenv';
import './database/connect';
import BidsRepo from './database/repo/Bids.repo';
import IBid from './shared/types/IBid';
import IPlayer from './shared/types/IPlayer';
import { PositionEnum, InjuryStatusEnum } from './shared/enums/playerEnums';
import PlayersRepo from './database/repo/Player.repo';


dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.get('/', (req: any, res: any) => {
    res.send('HELLO WORLD');
});

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



app.get('/add-player', async(req: any, res: any) => {

    const player: IPlayer = {
        _id: 99999,
        firstName: 'Aaron',
        lastName: 'Rodgers',
        fullName: 'Aaron Rodgers',
        jerseyNumber: 12,
        team: 'Green Bay Packers',
        teamAbbr: 'GB',
        position: PositionEnum.QB,
        injuryStatus: InjuryStatusEnum.ACTIVE
    }

    const result = await PlayersRepo.addPlayer(player);

    res.json(JSON.stringify(result));
});


app.get('/get-players', async(req: any, res:any) => {

    const players: IPlayer[] = await PlayersRepo.getPlayers();

    return res.json(JSON.stringify(players));
});



app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
