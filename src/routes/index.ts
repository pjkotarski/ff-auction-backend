import express from 'express';
import bidsRouter from './bids/bids.routes';
import playersRouter from './players/players.routes';

const router = express.Router();

router.use('/bids', bidsRouter);
router.use('/players', playersRouter);

export default router;