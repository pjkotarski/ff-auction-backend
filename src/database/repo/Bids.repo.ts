import { getBidModelWithWeek } from '../model/Bids.model';
import IBid from '../../shared/types/IBid';
import WeekService from '../../services/WeekService';

export default class BidsRepo {

    public static async addBid(newBid: IBid): Promise<IBid> {

        const BidModel = this.getBidModel();
        const bid = new BidModel(newBid);

        try {
            return await bid.save();
        } catch (error) {
            console.log('THERE WAS AN ERROR ON SAVE', error);
            return null;
        }
    }

    public static async getBids(): Promise<IBid[]> {
        const BidModel = this.getBidModel();
        return await BidModel.find({}).sort({ createdAt: -1 });
    }

    public static async getLeadingBidForPlayer(playerId: number) {
        const BidModel = this.getBidModel();

        return await BidModel.find({ player_id: playerId }).sort({ amount: -1 }).limit(1);
    }

    public static async getBidsForPlayer(playerId: number): Promise<IBid[]> {
        const BidModel = this.getBidModel();
        const bids = await BidModel.find({ player_id: playerId }).sort({ createdAt: -1 });

        return bids;
    }

    public static async getBidsAfterTimestamp(time: string): Promise<IBid[]> {

        const BidModel = this.getBidModel();

        const bids = await BidModel.find({ createdAt: {
            $gt: new Date(time),
            $lt: new Date() 
        }}).sort({ createdAt: -1});

        return bids;
    }

    private static getBidModel() {
        return getBidModelWithWeek('10');
        //return getBidModelWithWeek(WeekService.getWeek());
    }
}