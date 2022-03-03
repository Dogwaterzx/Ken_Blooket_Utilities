const axios = require('axios');

const utils = require('../assets/links');

async function isFavorited(setId, cookie) {
    const response = await axios(utils.links.isFavorited + setId, {
        headers: {
            Referer: 'https://www.blooket.com/',
            cookie: cookie,
        },
    });

    return response.data
};

module.exports = isFavorited
