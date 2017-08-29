const axios = require('axios');

const {GRAPH_URL_BASE} = require('./constants');

async function getAccessToken(appId, appSecret) {
    const tokenRes = await axios.get(`${GRAPH_URL_BASE}/oauth/access_token`, {params: {
        "client_id": appId,
        "client_secret": appSecret,
        "grant_type": "client_credentials"
    }});
    const {data} = tokenRes;
    return data['access_token'];
}

module.exports = getAccessToken;