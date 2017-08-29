require('dotenv').config();
const {FacebookGraphAPI, getAccessToken} = require('../');
const {APP_ID, APP_SECRET} = process.env;

let graphAPI = null;

beforeAll(async () => {
    const accessToken = await getAccessToken(APP_ID, APP_SECRET);
    graphAPI = new FacebookGraphAPI(accessToken);
})

test('retrieve a user /4 (zuck) with no fields', async () => {
    expect.assertions(1);
    const zuck = await graphAPI.getObject('4');
    expect(zuck).toMatchObject({
        id: "4",
        name: "Mark Zuckerberg"
    })
})

test('retrieve a user /4 (zuck) with fields', async () => {
    expect.assertions(1);
    const zuck = await graphAPI.getObject('4', ['first_name', 'last_name']);
    expect(zuck).toMatchObject({
        first_name: "Mark",
        last_name: "Zuckerberg"
    })
})

test('retrieve a page /552580508224925 (Chan Zuckerberg Initiative) with no fields', async () => {
    expect.assertions(1);
    const page = await graphAPI.getObject('552580508224925');
    expect(page).toMatchObject({
        name: "Chan Zuckerberg Initiative",
        id: "552580508224925"
    })
})


test('retrieve a page /552580508224925 (Chan Zuckerberg Initiative) with fields', async () => {
    expect.assertions(1);
    const page = await graphAPI.getObject('552580508224925', ['about']);
    expect(page).toHaveProperty('about')
})