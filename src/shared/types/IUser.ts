export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;
    league_id?: number;
    teamName?: string;
}