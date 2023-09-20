#!/usr/bin/env node

import request from 'supertest';
import app from './index';
import dotenv from "dotenv";
import Mongo from './config/db';
import mongoose from 'mongoose';

dotenv.config();

describe('Test initial server', () => {

    const port = process.env.PORT;
    const server = app.listen(port);
    const mongo = new Mongo(mongoose);

    it('Should ping the server config', async() => {

        const res = await request(app).get('/api/ping');

        expect(res.status).toEqual(200);
        expect(res.text).toEqual('pong');
    });

    afterAll( async() => {
        await server.close();
        await mongo.closeDb();
    });
})