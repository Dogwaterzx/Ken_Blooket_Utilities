const axios = require('axios');

const utils = require('../assets/links');

const APIResponseMessage = require('../errors/APIResponseErrors');

const { checkPinType, checkNameType } = require('../errors/typeofs');

async function join(gamePin, botName) {
    checkPinType(gamePin);
    checkNameType(botName);

    const response = await axios.put(utils.links.join, {
        id: gamePin,
        name: botName,
    }, {
        headers: {
            Referer: 'https://www.blooket.com/',
        },
    });

    if (response.data.msg == APIResponseMessage.join.MSG_TAKEN) {
        throw new Error(botName + ' Is taken already!');
    } else if (response.data.msg == APIResponseMessage.join.MSG_INVALID) {
        throw new TypeError(botName + ' Is an invalid name!');
    } else if (response.data.msg == APIResponseMessage.join.MSG_BLOCKED) {
        throw new Error('Blocked from joining the game, try to change your name!');
    };

    return response.data
};

module.exports = join
