import express from 'express';
import dotenv from 'dotenv';
import './database/connect';
import BidsRepo from './database/repo/Bids.repo';
import BidDao from './database/DAOs/BidDao';

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.get('/', (req: any, res: any) => {
    res.send('HELLO WORLD');
});

app.get('/add-bid', async(req: any, res: any) => {

    const bidDao: BidDao = {
        player_id: 'player id',
        amount: 90,
        isLeader: false
    };

    const result = await BidsRepo.addBid(bidDao);

    res.json(JSON.stringify(result));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
