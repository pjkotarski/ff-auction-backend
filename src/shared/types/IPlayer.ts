import { PositionEnum, InjuryStatusEnum } from '../enums/playerEnums';


export default interface IPlayer {
    _id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    jerseyNumber: number;
    team: string;
    teamAbbr: string,
    position: PositionEnum,
    injuryStatus: InjuryStatusEnum,
    percentOwned: number,
    createdAt?: Date;
    updatedAt?: Date;
}