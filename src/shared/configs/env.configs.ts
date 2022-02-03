import dotenv from 'dotenv';
import fs from 'fs';


dotenv.config();

export const PORT = process.env.SERVER_PORT;

export const BID_DOCUMENT = process.env.BID_DOCUMENT;
export const PLAYER_DOCUMENT = process.env.PLAYER_DOCUMENT;
export const USER_DOCUMENT = process.env.USER_DOCUMENT;
export const LEAGUE_DOCUMENT = process.env.LEAGUE_DOCUMENT;


export const DEMO_BIDS_DOCUMENT = process.env.DEMO_BIDS_DOCUMENT;
export const DEMO_USERS_DOCUMENT = process.env.DEMO_USERS_DOCUMENT;

export const SEASON_START = process.env.SEASON_START_MOMENT;

export const PLAYER_PAGE_SIZE = parseInt(process.env.PLAYER_PAGE_SIZE, 10);

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_SECRET = process.env.GOOGLE_SECRET;

export const PUB_KEY = fs.readFileSync('./id_rsa_pub.pem', 'utf8');
export const PRIV_KEY = fs.readFileSync('./id_rsa_priv.pem', 'utf8');

export const INTERAL_SERVER_IDENTIFIER = 'internal_server_error';
export const NOT_FOUND_IDENTIFIER = 'not_found_error';

export const DB_URL = process.env.DB_URL;