#!/usr/bin/env node

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Mongo from './config/db';
import router from './router';

const _mongo:Mongo = new Mongo(mongoose);
const app:express.Application = express();

app.use(express.json({limit: '1024mb'}));
app.use(express.urlencoded({limit: '1024mb',extended: false}));
app.use(cors());

app.use('/api', router);

export default app;
