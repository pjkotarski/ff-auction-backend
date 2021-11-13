import { model, Schema } from 'mongoose';
import { PLAYER_DOCUMENT } from '../../shared/configs/env.configs';
import IPlayer from '../../shared/types/IPlayer';

const schema = new Schema({

    _id: {
        type: Number,
        required: true
    },
    firstName: String,
    lastName: String,
    fullName: String,
    jerseyNumber: Number,
    team: String,
    teamAbbr: String,
    position: String,
    injuryStatus: String,
    percentOwned: Number,
}, { timestamps: true });

export const getPlayerModel = (week: string) => {
    return model<IPlayer>(PLAYER_DOCUMENT + week, schema);
}
