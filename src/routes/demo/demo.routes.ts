import express, { NextFunction } from 'express';
import { getUserCookies } from '../../services/demo/CookieResolver';
import DemoAuctionService from '../../services/demo/DemoAuctionService';
import { IDemoBid } from '../../shared/types/demo/IDemoBid';
import { BadRequestError } from '../../shared/types/errors/BadRequest.error';
import { InternalServerError } from '../../shared/types/errors/InternalServer.error';
import IPlayer from '../../shared/types/IPlayer';
import asyncHandler from 'express-async-handler';


const router = express.Router();

router.post('/get-user', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const user_id = getUserCookies(req);

  if (!user_id) { 
    throw new BadRequestError('user id is required');
  }
  const user = await DemoAuctionService.getUser(user_id);
  res.status(200).json(user);
}));

router.post('/create-user', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const userName = req.body.name;
  if (!userName) throw new BadRequestError('you need a name');
  const user = await DemoAuctionService.saveUser({ name: userName });

  if (!user) {
    throw new InternalServerError('could not create a user');
  }

  console.log(user._id.toString());

  user._id = user._id.toString();

  res.cookie('user_id', user._id);
  res.status(200).json(user);
})); 

router.get('/start-demo', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const user_id = getUserCookies(req);

  const isRunning = await DemoAuctionService.isAuctionRunningForUser(user_id);
  if (isRunning) {
    res.status(300).send('service is already running');
    return;
  }

  const expirationTime: Date = DemoAuctionService.generateExpirationTime();
  DemoAuctionService.startMockProcess(user_id, expirationTime);

  res.status(200).json(expirationTime);
}));


router.get('/running-for-user', asyncHandler(async(req: any, res: any, next: NextFunction) => {
  const user_id = getUserCookies(req);
  const isRunning = await DemoAuctionService.isAuctionRunningForUser(user_id);
  res.json(200).json({ isRunning: isRunning });
}));

router.post('/post-bid', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const user_id = getUserCookies(req);

  const postedBid: IDemoBid = req.body.bid;
  
  if (!postedBid) {
    throw new BadRequestError('error reading posted bid');
  }

  if (!postedBid.league_id) {
    postedBid.league_id = user_id;
  }

  const player = await DemoAuctionService.saveBid(postedBid); 

  if (!player) {
    throw new InternalServerError('something went wrong');
  }

  res.status(200).json(player);
}));


router.get('/players', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const user_id = getUserCookies(req);

  const [bidded, unbidded] = await Promise.all([
    DemoAuctionService.getPlayerBids(user_id),
    DemoAuctionService.getUnbiddedPlayers(user_id)
  ]);

  if (!bidded || !unbidded) {
    throw new InternalServerError('could not fetch players');
  }

  const allPlayers = bidded.concat(unbidded);

  res.status(200).json(allPlayers);

}));

router.post('/players/:page', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const user_id = getUserCookies(req);

  let query = req.body.query;

  if (query === null || query === undefined) {
    query = '';
  }

  const page: number = req.params.page;
  if (!page) throw new BadRequestError('bad request');

  const playersPage: IPlayer[] = await DemoAuctionService.getPlayersByPage(page, user_id, query);

  if (!playersPage) throw new InternalServerError('something went wrong');

  res.status(200).json(playersPage);
}));


router.post('/bidded-players', asyncHandler(async(req: any, res: any, next: NextFunction) => {
  
  const user_id = getUserCookies(req);

  let query = req.body.query;
  
  if (!query) query = '';

  const biddedPlayers = await DemoAuctionService.getPlayerBids(user_id, query);

  if (!biddedPlayers) {
    throw new InternalServerError('something went wrong');
  }

  res.status(200).json(
    biddedPlayers
  );
}));

router.get('/unbidded-players', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const user_id = getUserCookies(req);

  const unbiddedPlayers = await DemoAuctionService.getUnbiddedPlayers(user_id);

  if (!unbiddedPlayers) {
    throw new InternalServerError('something went wrong');
  }

  res.status(200).json(unbiddedPlayers);
}));

router.get('/clear-bids', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  const user_id = getUserCookies(req);

  const result = await DemoAuctionService.clearBids(user_id);

  res.status(200).send('it worked');
 
}));

router.post('/search', asyncHandler(async(req: any, res: any, next: NextFunction) => {

  console.log('starting search')

  const user_id = getUserCookies(req);

  console.log('user id', user_id);

  const search = req.body.search;

  if (!search) {
    throw new BadRequestError('no search');
  }

  const matching = await DemoAuctionService.searchPlayers(search, user_id);

  if (matching || matching === []) {
    res.status(200).json(matching);
  } else {
    throw new InternalServerError('could not search properly');
  }

}));

export default router;