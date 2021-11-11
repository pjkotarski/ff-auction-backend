export default interface IEspnPlayer {
    seasonId: string;
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    jerseyNumber: number;
    proTeam: string;
    proTeamAbbreviation: string;
    defaultPosition: string;
    eligiblePositions: string[];
    averageDraftPosition: number;
    auctionValueAverage: number;
    percentChange: number;
    percentStarted: number;
    percentOwned: number;
    availabilityStatus: string;
    isDroppable: boolean;
    isInjured: boolean;
    injuryStatus: string;
}