import { IDemoUser } from '../../shared/types/demo/IDemoUser';
import DemoAuctionService from './DemoAuctionService'


const fakeUsers: IDemoUser[] = [
  {
    _id:  '61eb4964bfce834d5228e36b',
    name: 'Omar'
  },
  {
    _id: '61eb4964bfce834d5228e36c',
    name: 'Stringer'
  },
  {
    _id: '61eb4964bfce834d5228e36d',
    name: 'Jimmy'
  },
  {
    _id: '61eb4964bfce834d5228e36e',
    name: 'Wallace'
  },
  {
    _id: '61eb4964bfce834d5228e36e',
    name: 'Avon'
  },
  {
    _id: '61eb4964bfce834d5228e370',
    name: 'Greggs'
  },
  {
    _id: '61eb4964bfce834d5228e371',
    name: 'Cedric'
  },
  {
    _id: '61eb4964bfce834d5228e372',
    name: 'Lester'
  },
  {
    _id: '61eb4964bfce834d5228e373',
    name: 'Charlie'
  },
  {
    _id: '61eb4964bfce834d5228e373',
    name: 'Dennis'
  },
  {
    _id: '61eb4964bfce834d5228e375',
    name: 'Mac'
  }
];


export default class BotService {
  
  constructor() {}
  
  static async bidOnExisting(league_id: string) {
    console.log('bidding on existing player');
    const biddedPlayers = await DemoAuctionService.getPlayerBids(league_id);

    if (!biddedPlayers || biddedPlayers.length === 0) return;

    const randomPlayer = biddedPlayers[Math.floor(Math.random()*biddedPlayers.length)];
    const previousBidAmount = randomPlayer.bids[0].amount;
    
    const newBidAmount = previousBidAmount + BotService.getRandomBidAmount();
    
    const randomUser = BotService.getRandomUser();

    if (!randomUser) return;

    try { 
      await DemoAuctionService.saveBid({
        player_id: randomPlayer._id,
        user_id: randomUser._id,
        amount: newBidAmount,
        league_id: league_id
      });
    } catch(e) {
      console.log('could not save bid', e);
    }
  }

  static async bidOnNew(league_id: string) {
    const unbiddedPlayers = await DemoAuctionService.getUnbiddedPlayers(league_id);
    const randomPlayer = unbiddedPlayers[Math.floor(Math.random() * Math.min(30, unbiddedPlayers.length))];

    if (!randomPlayer) return;
    try { 
      await DemoAuctionService.saveBid({
        player_id: randomPlayer._id,
        user_id: BotService.getRandomUser()._id,
        amount: BotService.getRandomBidAmount(),
        league_id: league_id
      });
    } catch(e) {
      console.log('could not save bid', e);
    }
  }

  private static getRandomUser = () => {
    return fakeUsers[Math.floor(Math.random()*fakeUsers.length)];
  }

  private static getRandomBidAmount = () => {
    return Math.floor(Math.random()*19) + 1;
  }
}