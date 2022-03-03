const axios = require('axios');

const utils = require('../assets/links');

async function verify(fbToken) {
    const response = await axios.post(utils.links.verify, {
        returnSecureToken: true,
        token: fbToken,
    });

    return response.data.idToken
}; 

module.exports = verify
