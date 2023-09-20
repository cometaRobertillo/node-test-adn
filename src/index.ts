#!/usr/bin/env node

import app from './server';
import config from './server/config/constants';

const port = config.PORT;

app.listen(port);
