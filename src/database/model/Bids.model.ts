import { model, Schema } from 'mongoose';
import { BID_DOCUMENT } from '../../shared/configs/env.configs';

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


export const getBidModelWithWeek = (week: string) => {
  return model(BID_DOCUMENT + week, schema);
}
