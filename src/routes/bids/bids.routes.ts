import express from 'express';
import BidService from '../../services/BidService';
import PlayerService from '../../services/PlayerService';
import IBid from '../../shared/types/IBid'
import { IBidRequest } from '../../shared/types/IBidRequest';
import IPlayer from '../../shared/types/IPlayer';
import passport from 'passport';
import { IUser } from '../../shared/types/IUser';
import { resolveLeagueId } from '../../shared/utils/request.resolver';
const router = express.Router();

router.get('/get-bids', passport.authenticate('jwt', { session: false }), async(req: any, res: any) => {

    const league_id = resolveLeagueId(req);

    const players: IPlayer[] = await BidService.getBids(league_id);
    return res.json(players);
});

router.post('/post-bid', passport.authenticate('jwt', { session: false }), async(req: any, res: any) => {

    const league_id = resolveLeagueId(req);
    const requestBid: IBid = req.body.bid;

    await BidService.postBid(requestBid, league_id);

    const player = await PlayerService.getPlayerWithBids(requestBid.player_id, league_id);
    return res.json(player);
});

router.post('/get-bids', passport.authenticate('jwt', { session: false }), async(req: any, res: any) => {

    const league_id = resolveLeagueId(req);
    const bidRequest: IBidRequest = req.body;
    let players: IPlayer[];
    if (bidRequest.mostRecentBid && bidRequest.mostRecentBid.length > 0) {
        players = await BidService.getBidsAfterTime(bidRequest.mostRecentBid, league_id);
    } else {
        players = await BidService.getBids(league_id);
    }

    res.json(players);
});

export default router;