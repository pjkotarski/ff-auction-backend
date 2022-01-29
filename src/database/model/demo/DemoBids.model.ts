import { model, Schema } from 'mongoose';
import { DEMO_BIDS_DOCUMENT } from '../../../shared/configs/env.configs';
import { IDemoBid } from '../../../shared/types/demo/IDemoBid';

const schema = new Schema({
  player_id: {
    type: Schema.Types.Number,
    required: true,
    trim: true,
    maxlength: 100,
  },
  user_id: {
    type: Schema.Types.String,
    required: true
  },
  amount: {
    type: Schema.Types.Number,
    required: true
  },
  league_id: {
    type: Schema.Types.String,
    required: true
  },
  bidderName: {
    type: Schema.Types.String
  }
}, { timestamps: true });

export const DemoBidModel = model<IDemoBid>(DEMO_BIDS_DOCUMENT, schema);