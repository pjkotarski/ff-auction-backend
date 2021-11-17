import BidsRepo from '../database/repo/Bids.repo';
import PlayersRepo from '../database/repo/Player.repo';
import IBid from '../shared/types/IBid';
import IPlayer from '../shared/types/IPlayer';

export default class BidService {

    constructor() {}

    static async getBids(): Promise<IPlayer[]> {
        const bids = await BidsRepo.getBids();
        return this.mapBidsToPlayers(bids);
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

    public static async getBidsAfterTime(time: string): Promise<IPlayer[]> {
        const bids = await BidsRepo.getBidsAfterTimestamp(time);
        return this.mapBidsToPlayers(bids);
    }

    private static async isBidValid(bid: IBid): Promise<boolean> {

        const leadingBid: IBid[] = await BidsRepo.getLeadingBidForPlayer(bid.player_id);

        if (leadingBid.length === 0 || bid.amount > leadingBid[0].amount) {
            return true;
        }

        return false;
    }

    private static async mapBidsToPlayers(bids: IBid[]): Promise<IPlayer[]> {

        const playersSet = new Set<number>();
        bids.forEach(bid => {
            playersSet.add(bid.player_id);
        });

        const playerIds: number[] = Array.from(playersSet);
        const players = await PlayersRepo.getPlayerListFromIds(playerIds);
        

        for (const bid of bids) {
            let player = players.filter(player => player._id === bid.player_id)[0];
            
            if (player.bids) { 
                player.bids.push(bid);
            } else {
                player.bids = [bid];
            }
        }

        return players;
    }

}

