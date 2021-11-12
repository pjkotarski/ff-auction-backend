import express from 'express';
import PlayerService from '../../services/PlayerService';
import IPlayer from '../../shared/types/IPlayer';


const router = express.Router();

router.get('/get-players', async(req: any, res: any) => {
    const players: IPlayer[] = await PlayerService.getPlayers();
    res.json(JSON.stringify(players));
});

export default router;