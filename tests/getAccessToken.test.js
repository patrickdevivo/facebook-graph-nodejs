require('dotenv').config();
const {getAccessToken} = require('../');
const {APP_ID, APP_SECRET} = process.env;

test('retrieve access token', async () => {
    expect.assertions(1);
    const accessToken = await getAccessToken(APP_ID, APP_SECRET);
    expect(accessToken).toBeDefined();
})