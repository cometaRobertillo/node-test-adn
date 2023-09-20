#!/usr/bin/env node

import { Router } from 'express';
import { loggerStart, loggerEnd } from './middlewares/logger';
import dna from './routes/dna/dna.service';
import { ping } from './routes/ping';

const router = Router();

router.get(
  '/ping',
  loggerStart,
  ping,
  loggerEnd);

router.get('/stats', loggerStart, dna.getStats, loggerEnd);
router.post('/mutation', loggerStart, dna.checkMutation, loggerEnd);

export default router;