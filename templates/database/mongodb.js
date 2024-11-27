const mongoose = require('mongoose');
const { config } = require('./config');
const { logger } = require('./utils/logger');

async function connectDatabase() {
    try {
        await mongoose.connect(config.MONGODB_URI).then(() => {
            logger.success('MongoDB connection successful!');
        }).catch(error => {
            logger.error('MONGODB_URI invalid or not defined! Skipped...');
        });
    } catch (error) {
        logger.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = { connectDatabase };
