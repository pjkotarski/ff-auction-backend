import mongoose, { Mongoose } from "mongoose";
import BidDao from "../DAOs/BidDao";
import { BidModel } from '../model/Bids.model';

export default class BidsRepo {

    public static async addBid(bidDao: BidDao){



        if (bidDao._id === undefined) {
            bidDao._id = new mongoose.Types.ObjectId();
        }

        const bid = new BidModel(bidDao); // BidModel is not a constructor




        try {
            await bid.save();
            return bid;
        } catch (error) {
            console.log('THERE WAS AN ERROR ON SAVE', error);
            return {
                error: 'error'
            }
        }
    }
}