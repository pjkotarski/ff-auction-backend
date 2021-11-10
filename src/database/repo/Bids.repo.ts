import { BidModel } from '../model/Bids.model';
import IBid from '../../shared/types/IBid';

export default class BidsRepo {

    public static async addBid(newBid: IBid){

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
}