const { OpenAI } = require("openai");
require('dotenv').config()
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const listEvents = async () => {
    let events = await openai.fineTuning.jobs.listEvents('ftjob-57iA8B2MICAss6I9rXfwgXrF', { limit: 10 });
    console.log(events.data)
}

listEvents()