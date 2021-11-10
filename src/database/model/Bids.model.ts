import { model, Schema } from 'mongoose';

const DOCUMENT_NAME = 'bid';

const schema = new Schema({
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

const BidModel = model(DOCUMENT_NAME, schema);

export { BidModel };