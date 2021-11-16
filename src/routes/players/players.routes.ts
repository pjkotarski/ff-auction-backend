import express from 'express';
import PlayerService from '../../services/PlayerService';
import IPlayer from '../../shared/types/IPlayer';


const router = express.Router();

router.get('/get-players', async(req: any, res: any) => {
    const players: IPlayer[] = await PlayerService.getPlayers();
    res.json(players);
});

router.get('/get-players/:page', async(req: any, res: any) => {

    const page: number = req.params.page;

    const players: IPlayer[] = await PlayerService.getPlayersByPage(page);

    res.json(players);
});

export default router;