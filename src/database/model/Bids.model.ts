import mongoose, { model, Schema } from 'mongoose';
import BidDao from '../DAOs/BidDao';

const DOCUMENT_NAME = 'Bids';
const COLLECTION_NAME = 'bids_db';

const schema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    player_id: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Schema.Types.Number,
      required: true
    },
    isLeader: {
      type: Schema.Types.Boolean,
      required: true
    },
}, { timestamps: true } );

const BidModel = model(DOCUMENT_NAME, schema, COLLECTION_NAME);

export { BidModel };