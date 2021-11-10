export default interface BidDao {
    player_id: string;
    amount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isLeader?: boolean;
}