const express = require('./config/system/express');
const envLoader = require('./utils/env_loader');
const Logger = require('./utils/logger');

const logger = new Logger();

/**
 * Load environment variables
 */
const parsedObject = envLoader.load({
    path: process.argv[2] ? process.argv[2] : './config/production_variables.env',
});

if (parsedObject.error) {
    logger.error(parsedObject.error);
}

// Mongoose and Server Initialization
express();
