const express = require('express');
const hashtagRouter = require('../../routes/hashtag_route');


function init() {

    const app = express();
    const router = express.Router();

    app.use('/hashtag', hashtagRouter);

    app.use('/', router);

    app.listen(3000, function () {
      console.log('Listening on port 3000!');
    });
}


module.exports = init;