import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import * as dotenv from 'dotenv';

import booksRoute from './routes/booksRoute.js';

dotenv.config();

const app = express();

//middleware for parsing our request body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors());


app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Book store');
})

app.use('/books', booksRoute);

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('App connected to database');
        app.listen(process.env.PORT, () => {
            console.log(`App is listening to port: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });