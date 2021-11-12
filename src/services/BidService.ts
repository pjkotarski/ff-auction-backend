import BidsRepo from '../database/repo/Bids.repo';
import IBid from '../shared/types/IBid';

export default class BidService {

    constructor() {}

    static getBids(): Promise<IBid[]> {
        return BidsRepo.getBids();
    }


}

