#!/usr/bin/env node

import dotenv from "dotenv";

dotenv.config();

const CONSTANTS = {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    DB: {
        MONGODB: process.env.MONGODB_URL
    }
};

export default CONSTANTS;