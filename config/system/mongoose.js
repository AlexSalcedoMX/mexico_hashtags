const mongoose = require('mongoose');
const fs = require('fs');
const loggerUtil = require('./../../utils/logger');

mongoose.Promise = global.Promise;

const logger = loggerUtil.createInstance();
let walk;

// Load the mongoose models
function loadModels(callback) {
    const modelsPath = `${__dirname}/../../models`;

    walk = (path) => {
        fs.readdirSync(path).forEach((file) => {
            const newPath = `${path}/${file}`;
            const stat = fs.statSync(newPath);
            if (stat.isFile()) {
                if (/(.*)\.(js$|coffee$)/.test(file)) {
                    require(newPath); // eslint-disable-line
                }
            } else if (stat.isDirectory()) {
                walk(newPath);
            }
        });
    };
    walk(modelsPath);

    if (callback) callback();
}

// Connect to DB
function connect(callback) {
    const db = mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true }, (err) => {
        if (err) {
            logger.warn('Could not connect to MongoDB!');
            logger.error(err);
        } else {
            logger.info('MongoDB connection established');
            // Enabling mongoose debug mode if required
            mongoose.set('debug', (process.env.MONGODB_DEBUG === 'true'));

            // Call callback FN
            if (callback) callback(db);
        }
    });
}

// Disconnect from DB
function disconnect(callback) {
    mongoose.disconnect((err) => {
        if (err) {
            logger.warn('Could not disconnect to MongoDB!');
            logger.error(err);
        } else {
            logger.info('Disconnected from MongoDB.');
            if (callback) callback();
        }
    });
}

// Initialize Mongoose
function init(callback) {
    connect(() => {
        loadModels(() => {
            logger.info('Loaded Models');
            if (callback) callback();
        });
    });
}

module.exports = { connect, disconnect, init };
