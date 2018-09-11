const mongoose = require('mongoose');

const hashtagModel = new mongoose.Schema({
    hashtag: String,
    total: Number,
}, { collection: 'hashtag_top' });

module.exports = mongoose.model('Hashtag', hashtagModel);
