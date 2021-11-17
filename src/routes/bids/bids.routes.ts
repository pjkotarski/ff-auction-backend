import express from 'express';
import BidService from '../../services/BidService';
import PlayerService from '../../services/PlayerService';
import IBid from '../../shared/types/IBid'
import { IBidRequest } from '../../shared/types/IBidRequest';
import IPlayer from '../../shared/types/IPlayer';

const router = express.Router();

router.get('/get-bids', async(req: any, res: any) => {
    const players: IPlayer[] = await BidService.getBids();
    return res.json(players);
});

router.post('/post-bid', async(req: any, res: any) => {
    const requestBid: IBid = req.body;
    await BidService.postBid(requestBid);

    const player = await PlayerService.getPlayerWithBids(requestBid.player_id);
    return res.json(player);
});

router.post('/get-bids', async(req: any, res: any) => {

   const bidRequest: IBidRequest = req.body;
   let players: IPlayer[];
   if (bidRequest.mostRecentBid && bidRequest.mostRecentBid.length > 0) {
       players = await BidService.getBidsAfterTime(bidRequest.mostRecentBid);
   } else {
       players = await BidService.getBids();
   }

   res.json(players);
});

export default router;