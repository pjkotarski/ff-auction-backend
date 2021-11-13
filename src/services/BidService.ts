import BidsRepo from '../database/repo/Bids.repo';
import IBid from '../shared/types/IBid';

export default class BidService {

    constructor() {}

    static getBids(): Promise<IBid[]> {
        return BidsRepo.getBids();
    }

    static async postBid(bid: IBid): Promise<IBid> {

        const bidValid = await this.isBidValid(bid);
        if (bidValid) {
            return await this.addBid(bid);
        } else {
            return null;
        }
    }

    private static async addBid(bid: IBid): Promise<IBid> {
        return BidsRepo.addBid(bid);
    }

    private static async isBidValid(bid: IBid): Promise<boolean> {

        const leadingBid: IBid[] = await BidsRepo.getLeadingBidForPlayer(bid.player_id);

        if (leadingBid.length === 0 || bid.amount > leadingBid[0].amount) {
            return true;
        }

        return false;
    }


}

