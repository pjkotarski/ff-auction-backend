import { ObjectId } from 'mongoose';
import { IDemoBid } from '../../../shared/types/demo/IDemoBid';
import { InternalServerError } from '../../../shared/types/errors/InternalServer.error';
import { DemoBidModel } from '../../model/demo/DemoBids.model';

export default class DemoBidsRepo {

  public static async addBid(newBid: IDemoBid): Promise<IDemoBid> {
    
    const bid = new DemoBidModel(newBid);

    try {
      return await bid.save();
    } catch(error) {
      console.log(error);
      throw new InternalServerError('could not save the bid to database');
    }
  }

  public static async getBids(leagueId: string): Promise<IDemoBid[]> {
    return await DemoBidModel.find({ league_id: leagueId }).sort({ createdAt: -1 }).lean();
  }

  public static async getLeadingBidForPlayer(playerId: number, leagueId: string): Promise<IDemoBid> {
    const leadingBids = await DemoBidModel.find({ player_id: playerId, league_id: leagueId }).sort({ amount: -1 }).limit(1).lean();

    if (leadingBids.length === 0) {
      return null;
    } else {
      return leadingBids[0];
    }
  }

  public static async getBidsForPlayer(playerId: number, leagueId: string): Promise<IDemoBid[]> {
    return await DemoBidModel.find({ player_id: playerId, league_id: leagueId}).sort({amount: -1}).lean();
  }

  public static async isBidForPlayer(playerId: number, leagueId: string): Promise<boolean> {
    const bid = DemoBidModel.findOne({ player_id: playerId, league_id: leagueId }).lean();
    return !!bid;
  }

  public static async deleteBids(leagueId: string) {
    try {
      return await DemoBidModel.deleteMany({ league_id: leagueId }).exec();
    } catch(e) {
      console.log('could not delete bids', e);
      throw new InternalServerError('could not delete bids');
    }
  }
}