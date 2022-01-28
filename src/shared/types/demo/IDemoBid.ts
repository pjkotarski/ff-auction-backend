import IBid from '../IBid';

export interface IDemoBid extends IBid {
  _id?: string;
  player_id: number;
  user_id: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
  bidderName?: string;
  league_id?: string;
}