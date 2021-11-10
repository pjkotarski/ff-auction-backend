import mongoose from 'mongoose';

export default interface BidDao {
    _id?: mongoose.Types.ObjectId;
    player_id: string;
    amount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    isLeader?: boolean;
}
