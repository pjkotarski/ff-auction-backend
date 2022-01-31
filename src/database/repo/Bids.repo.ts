import { BidModel } from '../model/Bids.model';
import IBid from '../../shared/types/IBid';

export default class BidsRepo {

    public static async addBid(newBid: IBid): Promise<IBid> {

        const bid = new BidModel(newBid);

        try {
            return await bid.save();
        } catch (error) {
            console.log('THERE WAS AN ERROR ON SAVE', error);
            return null;
        }
    }

    public static async getBids(league_id: number): Promise<IBid[]> {
        return await BidModel.find({ league_id }).sort({ createdAt: -1 }).lean();
    }

    public static async getLeadingBidForPlayer(playerId: number, league_id: number) {
        return await BidModel.find({ player_id: playerId }).sort({ amount: -1 }).limit(1).lean();
    }

    public static async getBidsForPlayer(playerId: number, league_id: number): Promise<IBid[]> {

        const bids = await BidModel.find({ player_id: playerId }).sort({ createdAt: -1 }).lean();
        return bids;
    }

    public static async getBidsAfterTimestamp(time: string, league_id: number): Promise<IBid[]> {

        return await BidModel.find({ createdAt: {
            $gt: new Date(time),
            $lt: new Date()
        }}).sort({ createdAt: -1}).lean();
    }

    public static clearBids() {
        BidModel.deleteMany({})
            .then(() => {
                console.log('cleaned bids db');
            })
            .catch(() => {
                console.log('there was an error cleaning bids db')
            })
    }

}