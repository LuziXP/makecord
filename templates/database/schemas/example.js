const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    guildId: String,
    userId: String,
    data: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('Example', exampleSchema);
