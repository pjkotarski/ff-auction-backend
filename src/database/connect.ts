import mongoose from 'mongoose';

const dbUri = `mongodb://localhost:27017/ff_auction`;  // we open up a connection to this DB specifically.

mongoose
    .connect(dbUri)
    .then(() => {
        console.log('set up connection to db');
    })
    .catch(() => {
        console.log('mongoose connection error');
    });


