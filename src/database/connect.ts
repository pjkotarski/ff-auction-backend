import mongoose from 'mongoose';

const dbUri = `mongodb://localhost:27017/bids_db`;

mongoose
    .connect(dbUri)
    .then(() => {
        console.log('set up connection to db');
    })
    .catch(() => {
        console.log('mongoose connection error');
    });


