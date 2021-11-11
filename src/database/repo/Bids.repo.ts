import { getBidModelWithWeek } from '../model/Bids.model';
import IBid from '../../shared/types/IBid';
import WeekService from '../../services/WeekService';

export default class BidsRepo {

    public static async addBid(newBid: IBid){

        const BidModel = this.getBidModel();
        const bid = new BidModel(newBid);

        try {
            return await bid.save();
        } catch (error) {
            console.log('THERE WAS AN ERROR ON SAVE', error);
            return {
                error: 'error'
            }
        }
    }

    public static async getBids() {
        const BidModel = this.getBidModel();
        return await BidModel.find({}) as IBid[];
    }

    private static getBidModel() {
        return getBidModelWithWeek(WeekService.getWeek());
    }
}