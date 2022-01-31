import BidsRepo from '../database/repo/Bids.repo';
import PlayersRepo from '../database/repo/Player.repo';
import IBid from '../shared/types/IBid';
import IPlayer from '../shared/types/IPlayer';

export default class BidService {

    constructor() {}

    static async getBids(league_id: number): Promise<IPlayer[]> {
        const bids = await BidsRepo.getBids(league_id);
        return this.mapBidsToPlayers(bids, league_id);
    }

    static async postBid(bid: IBid, league_id: number): Promise<IBid> {

        const bidValid = await this.isBidValid(bid, league_id);
        if (bidValid) {
            return await this.addBid(bid);
        } else {
            return null;
        }
    }

    private static async addBid(bid: IBid): Promise<IBid> {
        return BidsRepo.addBid(bid);
    }

    public static async getBidsAfterTime(time: string, league_id: number): Promise<IPlayer[]> {
        const bids = await BidsRepo.getBidsAfterTimestamp(time, league_id);
        return this.mapBidsToPlayers(bids, league_id);
    }

    private static async isBidValid(bid: IBid, league_id: number): Promise<boolean> {

        const leadingBid: IBid[] = await BidsRepo.getLeadingBidForPlayer(bid.player_id, league_id);

        if (leadingBid.length === 0 || bid.amount > leadingBid[0].amount) {
            return true;
        }

        return false;
    }

    private static async mapBidsToPlayers(bids: IBid[], league_id: number): Promise<IPlayer[]> {

        const playersSet = new Set<number>();
        bids.forEach(bid => {
            playersSet.add(bid.player_id);
        });

        const playerIds: number[] = Array.from(playersSet);
        const players = await PlayersRepo.getPlayerListFromIds(playerIds, league_id);


        for (const bid of bids) {
            const player = players.filter(player => player._id === bid.player_id)[0];

            if (player.bids) {
                player.bids.push(bid);
            } else {
                player.bids = [bid];
            }
        }

        return players;
    }

}

