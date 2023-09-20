#!/usr/bin/env node

import { NextFunction, Request, Response } from 'express';
import business from './dna.business';

/**
 * @param {Request} req: Default express object
 * @param {Response} res: Default express object
 * @param {NextFunction} next: Default express object
 */
const getStats = async(_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await business.getStats();
        res.status(200);
        res.send(result);
    } catch(err) {
        console.log(err);
        res.status(500);
        res.send();
    }
    next();
}

/**
 * @param {Request} req: Default express object
 * @param {Response} res: Default express object
 * @param {NextFunction} next: Default express object
 */
const checkMutation = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await business.checkMutation(req.body);
        console.log('result',result)
        if(result.hasMutation) {
            res.status(200);
            res.send();
        } else {
            res.status(403);
            res.send();
        }
    } catch(err: any) {
        console.log(err);
        res.status(500);
        res.send();
    }
    next();
}

export default {
    getStats,
    checkMutation
}