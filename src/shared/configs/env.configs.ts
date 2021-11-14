import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.SERVER_PORT;

export const BID_DOCUMENT = process.env.BID_DOCUMENT;
export const PLAYER_DOCUMENT =process.env.PLAYER_DOCUMENT;

export const SEASON_START = process.env.SEASON_START_MOMENT;

export const PLAYER_PAGE_SIZE = parseInt(process.env.PLAYER_PAGE_SIZE, 10);



