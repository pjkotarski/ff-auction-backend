export interface ILeague { 
    _id?: number;
    name?: string;
    commissioner?: string;
    members?: string[];
    auctionStart?: string;
    auctionEnd?: string;
    auctionDay?: string;
    startingBalance?: number;
    espnSWID?: string;
    espnS2?: string;
}