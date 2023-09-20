#!/usr/bin/env node

import { Router } from 'express';
import { loggerStart, loggerEnd } from './middlewares/logger';
import dna from './routes/dna/dna.service';

const router = Router();

router.get('/stats', loggerStart, dna.getStats, loggerEnd);
router.post('/mutation', loggerStart, dna.checkMutation, loggerEnd);

export default router;