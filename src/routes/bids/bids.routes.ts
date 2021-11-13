import express from 'express';
import BidService from '../../services/BidService';
import PlayerService from '../../services/PlayerService';
import IBid from '../../shared/types/IBid'

const router = express.Router();

router.get('/get-bids', async(req: any, res: any) => {
    const bids: IBid[] = await BidService.getBids();
    return res.json(JSON.stringify(bids));
});

router.post('/post-bid', async(req: any, res: any) => {
    const requestBid: IBid = req.body;
    await BidService.postBid(requestBid);

    const player = await PlayerService.getPlayerWithBids(requestBid.player_id);
    return res.json(player);
});

export default router;