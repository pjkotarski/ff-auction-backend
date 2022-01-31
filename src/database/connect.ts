import mongoose from 'mongoose';
import { DB_URL } from '../shared/configs/env.configs';

mongoose
    .connect(DB_URL)
    .then(() => {
        console.log('set up connection to db');
    })
    .catch(() => {
        console.log('mongoose connection error');
    });


