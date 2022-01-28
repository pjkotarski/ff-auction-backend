import { model, Schema } from 'mongoose';
import { DEMO_USERS_DOCUMENT } from '../../../shared/configs/env.configs';
import { IDemoUser } from '../../../shared/types/demo/IDemoUser';


const schema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  isRunning: {
    type: Schema.Types.Boolean,
    default: false
  },
  expiration_time: {
    type: Schema.Types.Date,
    default: null
  }
});

export const DemoUserModel = model<IDemoUser>(DEMO_USERS_DOCUMENT, schema);