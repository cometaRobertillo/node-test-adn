#!/usr/bin/env node

import {NextFunction, Request, Response} from 'express';

const loggerStart = (req: Request, _res: Response, next: NextFunction) => {
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.log('Incomming request');
    console.log('Protocol: ', req.protocol);
    console.log('PATH: ', req.url);
    console.log('Detail: ', JSON.stringify(req.route));
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^');

    next();
};

const loggerEnd = (_req: Request, res: Response, next: NextFunction) => {

    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^');
    console.log('Status code: ', res.statusCode);
    console.log('Status message: ', res.statusMessage);
    console.log('Locals: ', JSON.stringify(res.locals));
    console.log('Finishing request');
    console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^');
    next();
}
export { loggerStart, loggerEnd };