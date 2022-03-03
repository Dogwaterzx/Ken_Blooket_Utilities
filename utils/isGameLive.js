const axios = require('axios');

const { checkPinType } = require('../errors/typeofs');

async function isGameAlive(gamePin) {
    checkPinType(gamePin);
    
    const response = await axios('https://api.blooket.com/api/firebase/id?id=' + gamePin);

    return response.data
};

module.exports = isGameAlive
