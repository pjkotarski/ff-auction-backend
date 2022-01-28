import express from 'express';
import bidsRouter from './bids/bids.routes';
import playersRouter from './players/players.routes';
import authRouter from './auth/auth.routes';
import registrationRouter from './registration/registration.routes';
import demoRouter from './demo/demo.routes';

const router = express.Router();

router.use('/bids', bidsRouter);
router.use('/players', playersRouter);
router.use('/auth', authRouter);
router.use('/registration', registrationRouter);
router.use('/demo', demoRouter);

export default router;