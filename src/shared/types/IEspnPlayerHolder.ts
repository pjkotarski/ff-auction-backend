import IEspnPlayer from "./IEspnPlayer";

export default interface IEspnPlayerHolder {
    player: IEspnPlayer;
    rawStats: any;
    projectedRawStats: any;
}