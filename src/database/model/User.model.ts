import { model, Schema } from 'mongoose';
import { USER_DOCUMENT } from '../../shared/configs/env.configs';
import { IUser } from '../../shared/types/IUser';

const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    firstName: String,
    lastName: String,
    picture: String,
    league_id: Number,
    teamName: String,
 }, { timestamps: true });


 export const UserModel = model<IUser>(USER_DOCUMENT, schema);