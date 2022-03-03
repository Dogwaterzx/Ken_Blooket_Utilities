const axios = require('axios');

const utils = require('../assets/links');

async function live(hostName, isPlus, qSetId, newDateISOString, t_a, gameMode, cookie) {
    try {
        const response = await axios.post(utils.links.live, {
            hoster: hostName,
            plus: isPlus,
            qSetId: qSetId,
            settings: {
                d: newDateISOString,
                la: true,
                m: t_a,
                t: gameMode,
            },
        }, {
            headers: {
                Referer: 'https://www.blooket.com/',
                cookie: cookie
            },
        });

        return {
            fbToken: response.data.fbToken,
            id: response.data.id
        };
    } catch (e) { }
};

module.exports = live
