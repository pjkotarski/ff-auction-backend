import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = "player";

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
}, { timestamps: true });

const PlayerModel = model(DOCUMENT_NAME, schema);

export { PlayerModel };

