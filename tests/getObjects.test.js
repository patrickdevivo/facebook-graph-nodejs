require('dotenv').config();
const {FacebookGraphAPI, getAccessToken} = require('../');
const {APP_ID, APP_SECRET} = process.env;

let graphAPI = null;

beforeAll(async () => {
    const accessToken = await getAccessToken(APP_ID, APP_SECRET);
    graphAPI = new FacebookGraphAPI(accessToken);
})

test('retrieve multiple users', async () => {
    expect.assertions(1);
    const userIds = ['4', '6'];
    const users = await graphAPI.getObjects(userIds);
    expect(users).toMatchObject({
        "4": {
            "name": "Mark Zuckerberg",
            "id": "4"
          },
          "6": {
            "name": "Dustin Moskovitz",
            "id": "6"
          }
    })
})

test('retrieve multiple users with fields', async () => {
    const userIds = ['4', '6'];
    const fields = ['first_name', 'last_name'];
    const users = await graphAPI.getObjects(userIds, fields);
    expect.assertions(userIds.length * fields.length);
    for (let i in userIds) {
        expect(users).toHaveProperty(`${userIds[i]}.first_name`);
        expect(users).toHaveProperty(`${userIds[i]}.last_name`)
    }
})
