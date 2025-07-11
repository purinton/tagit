#!/usr/bin/env node
import 'dotenv/config';
import { log, registerHandlers, registerSignals } from '@purinton/common';
import fs from 'fs';
import { execSync } from 'child_process';
import { updateVersionFiles } from './src/updateVersionFiles.mjs';
import { gitOperations } from './src/gitOperations.mjs';

(async () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }

  registerHandlers({ log });
  registerSignals({ log });

  log.info('tagit Started');

  try {
    const newVersion = await updateVersionFiles(fs, log);
    log.info(`Updated version to ${newVersion}`);
    gitOperations(execSync, fs, log);
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
})();
