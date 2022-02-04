import { IDemoUser } from '../../shared/types/demo/IDemoUser';
import DemoAuctionService from './DemoAuctionService'
const fakeUsers: IDemoUser[] = require('../../../demo_players.json');


export default class BotService {

  constructor() {}

  static async bidOnExisting(league_id: string) {

    if (!this.shouldBidOnExisting()) return;

    const biddedPlayers = await DemoAuctionService.getPlayerBids(league_id);

    if (!biddedPlayers || biddedPlayers.length === 0) return;

    const randomPlayer = biddedPlayers[Math.floor(Math.random()*biddedPlayers.length)];
    const previousBidAmount = randomPlayer.bids[0].amount;

    const newBidAmount = previousBidAmount + BotService.getRandomBidAmount();

    if (newBidAmount > 300) {
      return;
    }

    const randomUser = BotService.getRandomUser();

    if (!randomUser) return;

    try {
      await DemoAuctionService.saveBid({
        player_id: randomPlayer._id,
        user_id: randomUser._id,
        amount: newBidAmount,
        bidderName: randomUser.name,
        league_id: league_id
      });
    } catch(e) {
      console.log('could not save bid', e);
    }
  }

  static async bidOnNew(league_id: string) {

    if (!this.shouldBidOnNew()) return;

    const unbiddedPlayers = await DemoAuctionService.getUnbiddedPlayers(league_id);
    const randomPlayer = unbiddedPlayers[Math.floor(Math.random() * Math.min(30, unbiddedPlayers.length))];

    if (!randomPlayer) return;
    try {

      const randomBot = BotService.getRandomUser();

      await DemoAuctionService.saveBid({
        player_id: randomPlayer._id,
        user_id: randomBot._id,
        amount: BotService.getRandomBidAmount(),
        bidderName: randomBot.name,
        league_id: league_id
      });
    } catch(e) {
      console.log('could not save bid', e);
    }
  }

  static shouldBidOnExisting = () => {
    const rando = Math.floor(Math.random() * 4);
    return (rando >= 1);
  }

  static shouldBidOnNew = () => {
    const rando = Math.floor(Math.random() * 2); //etiher 0 or 1
    return (rando === 1);
  }

  private static getRandomUser = () => {
    return fakeUsers[Math.floor(Math.random()*fakeUsers.length)];
  }

  private static getRandomBidAmount = () => {
    return Math.floor(Math.random()*19) + 1;
  }
}