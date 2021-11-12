import express from 'express';
import './database/connect';
import cron from 'node-cron';
import WeekService from './services/WeekService';
import routes from './routes/index';
import { PORT } from './shared/configs/env.configs';

const port = PORT;
const app = express();

app.use('/api', routes)

cron.schedule('0 0 * * 2', () => WeekService.onCron);


app.get('/trigger-cron', (req: any, res: any) => {
    WeekService.onCron();
    res.send('imitate cron');
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
});
