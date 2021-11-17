import { model, Schema } from 'mongoose';
import { BID_DOCUMENT } from '../../shared/configs/env.configs';
import IBid from '../../shared/types/IBid';

const schema = new Schema({
    player_id: {
      type: Schema.Types.Number,
      required: true,
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Schema.Types.Number,
      required: true
    },
}, { timestamps: true } );


export const getBidModelWithWeek = (week: string) => {
  return model<IBid>(BID_DOCUMENT + week, schema);
}
