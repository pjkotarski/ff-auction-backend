import moment from 'moment';
import DemoBidsRepo from '../../database/repo/demo/DemoBids.repo';
import DemoUsersRepo from '../../database/repo/demo/DemoUsers.repo';
import PlayersRepo from '../../database/repo/Player.repo';
import { PLAYER_PAGE_SIZE } from '../../shared/configs/env.configs';
import { IDemoBid } from '../../shared/types/demo/IDemoBid';
import { IDemoUser } from '../../shared/types/demo/IDemoUser';
import { BadRequestError } from '../../shared/types/errors/BadRequest.error';
import { InternalServerError } from '../../shared/types/errors/InternalServer.error';
import IPlayer from '../../shared/types/IPlayer';
import BotService from './BotService';


const runsFor = 20;
const interval = 7 * 1000;

export default class DemoAuctionService {

  constructor() {}

  static async getUser(user_id: string): Promise<IDemoUser> {
    try {
      return await DemoUsersRepo.getUser(user_id);
    } catch(e) { 
      console.log(e);
      throw new InternalServerError('could not get user');
    }
  }

  static isAuctionRunningForUser(user_id: string): Promise<boolean> {
    return DemoUsersRepo.isRunningForUser(user_id);
  }

  static saveUser(newUser: IDemoUser): Promise<IDemoUser> {
    return DemoUsersRepo.saveUser(newUser)
  }

  static async getPlayerBids(user_id: string, query=''): Promise<IPlayer[]> {

    const bids = await DemoBidsRepo.getBids(user_id);
    const user_ids = bids.map(bid => bid.user_id);

    const matchingUsers = await DemoUsersRepo.getMatchingUsers(user_ids);

    bids.forEach(bid => {

      const matchingUser = matchingUsers.find(user => user._id.toString() === bid.user_id);

      bid.bidderName = matchingUser.name;
    });

    return this.mapBidsToPlayers(bids, query);
  }

  static async getUnbiddedPlayers(user_id: string): Promise<IPlayer[]> {

    const [players, playersWithBids] = await Promise.all([
      await PlayersRepo.getPlayers(0),
      await this.getPlayerBids(user_id)
    ]);

    return DemoAuctionService.filterOutBiddedPlayers(players, playersWithBids);
  }

  static async getPlayersByPage(page: number, user_id: string, query = ''): Promise<IPlayer[]> {
    const firstPlayerIndex = PLAYER_PAGE_SIZE * page;

    const [unfilteredPlayers, biddedPlayers ]= await Promise.all([
      PlayersRepo.getPlayersByIndex(firstPlayerIndex, 0, query),
      DemoAuctionService.getPlayerBids(user_id)
    ]);

    console.log('unfiltered players', unfilteredPlayers);

    return DemoAuctionService.filterOutBiddedPlayers(unfilteredPlayers, biddedPlayers);
  }

  static async saveBid(newBid: IDemoBid): Promise<IPlayer> {
    
    if (!await this.isBidValid(newBid)) {
      throw new BadRequestError('could not save bid, invalid amount');
    }

    const bid = await DemoBidsRepo.addBid(newBid);

    const [player, playerBids] = await Promise.all([
      PlayersRepo.getPlayer(bid.player_id, 0), 
      DemoBidsRepo.getBidsForPlayer(newBid.player_id, newBid.league_id)
    ]);

    player.bids = playerBids.reverse();
    return player;
  }

  private static async isBidValid(bid: IDemoBid) {
    const leadingBid: IDemoBid = await DemoBidsRepo.getLeadingBidForPlayer(bid.player_id, bid.league_id);

    if (!leadingBid) {
      return true;
    }
    
    return bid.amount > leadingBid.amount;
  }

  static async clearBids(user_id: string) {
    return await DemoBidsRepo.deleteBids(user_id);
  }

  private static async mapBidsToPlayers(bids: IDemoBid[], query=''): Promise<IPlayer[]> {
    const playerIdSet = new Set<number>();
    
    bids.forEach(bid => {
      playerIdSet.add(bid.player_id);
    });

    const playerIds: number[] = Array.from(playerIdSet);
    const players = await PlayersRepo.getPlayerListFromIds(playerIds, 0, query);

    for (var i = bids.length - 1; i >= 0; i--) {
      let player = players.find(player => player._id === bids[i].player_id);

      if (!player) continue;

      if (player.bids) {
        player.bids.push(bids[i]);
      } else {
        player.bids = [bids[i]];
      }
    }

    return players;
  }

  public static filterOutBiddedPlayers(unbidded: IPlayer[], bidded: IPlayer[]): IPlayer[] {
    return unbidded.filter(unbidPlayer => {
      const withBid = bidded.find(bidPlayer => bidPlayer._id === unbidPlayer._id);
      return !withBid;
    });
  }

  public static startMockProcess(user_id: string, expTime: Date) { 
    let runningFor = 0;

    DemoUsersRepo.setRunningForUser(user_id, true);
    DemoAuctionService.setExpirationTime(user_id, expTime);
    

    const timer_process = setInterval(() => {

      BotService.bidOnExisting(user_id);
      BotService.bidOnNew(user_id);

      runningFor += interval;

      if (runningFor >= 1000 * runsFor - 10) {
        DemoUsersRepo.setRunningForUser(user_id, false);
        DemoAuctionService.setExpirationTime(user_id, null);
        clearInterval(timer_process);
      }
    }, interval)
  }

  public static generateExpirationTime(): Date {
    return moment(new Date()).add(runsFor, 's').toDate();
  }

  public static setExpirationTime(user_id: string, expiration_time: Date): Promise<IDemoUser> {
    try {
      return DemoUsersRepo.setExpirationTime(user_id, expiration_time);
    } catch(_) {
      throw new InternalServerError('could not set expiration time');
    }   
  }

  public static async getExpirationTime(user_id: string): Promise<Date> {
    const user = await DemoUsersRepo.getUser(user_id);

    if (!user) {
      throw new InternalServerError('could not get user');
    }

    return user.expiration_time;
  }

  public static async searchPlayers(query: string, user_id: string): Promise<IPlayer[]> {

    const [matchingPlayers, biddedPlayers] = await Promise.all([
      PlayersRepo.searchPlayers(query, 0),
      this.getPlayerBids(user_id)
    ]);

    let matchingBidded: IPlayer[] = [];

    const matchingUnbidded = matchingPlayers.filter(matchingPlayer => {

      const match = biddedPlayers.find(biddedPlayer => biddedPlayer._id === matchingPlayer._id);
      if (match) {
        matchingBidded.push(match);
      }

      return !match;
    });

    return [ ...matchingBidded, ...matchingUnbidded];
  }

}