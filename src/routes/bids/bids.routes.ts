import express from 'express';
import BidService from '../../services/BidService';
import IBid from '../../shared/types/IBid'

const router = express.Router();

router.get('/get-bids', async(req: any, res: any) => {
    const bids: IBid[] = await BidService.getBids();
    return res.json(JSON.stringify(bids));
});

export default router;