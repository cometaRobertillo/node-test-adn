#!/usr/bin/env node

import mongoose from 'mongoose';
import CONFIG from './constants';

export default class Mongo {
    private _dbPath: string = CONFIG.DB.MONGODB || '';
    private _dbOptions: mongoose.ConnectOptions = {
        dbName: process.env.MONGO_NAME
    };

    private _dbConnection: mongoose.Connection | undefined;
    public connection: mongoose.Mongoose = new mongoose.Mongoose();

    

    constructor(_mongoose: mongoose.Mongoose){
        this.Init(_mongoose);
    }

    private Init = (_mongoose:mongoose.Mongoose) => {
        try {
            this.connection = _mongoose;
            this.connection.connect(this._dbPath, this._dbOptions);

            this._dbConnection = this.connection.connection;

        } catch(err) {
            console.log(err)
        }
    }

    public closeDb = () => {
        this.connection.disconnect();
    };

}