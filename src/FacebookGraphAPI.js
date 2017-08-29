const axios = require('axios');
const _ = require('lodash');

const {GRAPH_URL_BASE} = require('./constants');

class FacebookGraphAPI {
    constructor(accessToken = null, version = '2.10') {
        this.accessToken = accessToken;
        this.version = version;

        if (!this.accessToken) throw new Error('Please specify an access token')
    }

    async getObject(objectId, fields) {
        const params = {
            access_token: this.accessToken,
        }
        if (fields && _.isArray(fields)) params.fields = _.join(fields, ',');

        const objectRes = await axios.get(`${GRAPH_URL_BASE}/${objectId}`, {params});
        return objectRes.data;
    }

    async getObjects(objectIds, fields) {
        const params = {
            access_token: this.accessToken,
        }
        if (objectIds && _.isArray(objectIds)) params.ids = _.join(objectIds, ',');
        if (fields && _.isArray(fields)) params.fields = _.join(fields, ',');
        
        const objectRes = await axios.get(`${GRAPH_URL_BASE}/`, {params});
        return objectRes.data;
    }
}

module.exports = FacebookGraphAPI;