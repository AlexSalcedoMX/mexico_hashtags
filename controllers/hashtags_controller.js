const HashtagModel = require('../models/hashtag_model');

async function getHashtag (req, res) {
    const hashtags = await HashtagModel.find({});
    res.send(hashtags);
}

module.exports = { getHashtag };