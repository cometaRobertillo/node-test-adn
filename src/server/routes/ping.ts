#!/usr/bin/env node

import { NextFunction, Request, Response } from 'express';

const ping = (_req: Request, res: Response, next: NextFunction) => {
    res.status(200);
    res.send('pong');
    next();
}

export { ping };