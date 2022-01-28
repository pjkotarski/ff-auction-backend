import mongoose, { model, Schema } from 'mongoose';
import { LEAGUE_DOCUMENT } from '../../shared/configs/env.configs';
import { ILeague } from '../../shared/types/ILeague';

const schema = new Schema({
    _id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    commissioner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    members: [String],
    auctionStart: String,
    auctionEnd: String,
    auctionDay: String,
    startingBalance: Number,
    espnSWID: String,
    espnS2: String
}, { timestamps: true });

export const LeagueModel = model<ILeague>(LEAGUE_DOCUMENT, schema);