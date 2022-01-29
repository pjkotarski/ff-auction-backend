import express, { NextFunction, Request, Response } from 'express';
import './database/connect';
import cron from 'node-cron';
import WeekService from './services/WeekService';
import routes from './routes/index';
import { PORT } from './shared/configs/env.configs';
import cookieParser from 'cookie-parser';
import { jwtMiddleware } from './middleware/passport.configs';
import passport from 'passport';
import { InternalServerError } from './shared/types/errors/InternalServer.error';
import { NotFoundError } from './shared/types/errors/NotFound.error';
import { CustomError } from './shared/types/errors/Custom.error';
import { getEspnApiClient } from './shared/configs/espn.config';
import IEspnPlayerHolder from './shared/types/IEspnPlayerHolder';
import { BadRequestError } from './shared/types/errors/BadRequest.error';

const port = PORT;
const app = express();
app.use(passport.initialize());

app.use(express.json());
app.use(cookieParser());

jwtMiddleware(passport);

app.use('/api', routes);

cron.schedule('0 0 * * 2', () => WeekService.onCron);

app.get('/test-client', async(req: any, res: any) => {

    const client = getEspnApiClient();
    const freeAgents: IEspnPlayerHolder[] = await client.getFreeAgents({ seasonId: '2021', scoringPeriodId: 0 });

    res.json(freeAgents);
});

app.get('/trigger-cron', (req: any, res: any) => {
    WeekService.onCron();
    res.send('imitate cron');
})

app.use((error: Error, req: any, res: any, next: any) => {
    if (error instanceof InternalServerError) {
        res.status(error.status);
        res.json({ error: error.message });
    } else if (error instanceof BadRequestError) {
        console.log('bad request eror here at catch');
        res.status(error.status);
        res.json({ error: error.message });
    } else if (error instanceof NotFoundError) { 
        res.status(error.status);
        res.json({ error: error.message });
    } else if (error instanceof CustomError) {
        res.status(error.status);
        res.json({ error: error.message });
    } else {
        res.status(500);
        res.json({ error: 'An unkown error occured' });
    }
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
