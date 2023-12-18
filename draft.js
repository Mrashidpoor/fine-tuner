const { OpenAI } = require("openai");
require('dotenv').config()
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const listEvents = async () => {
    let events = await openai.fineTuning.jobs.listEvents('ftjob-dN7PO1ksgqhj2bqYwr8VnDjF', { limit: 10 });
    console.log(events.data)
}

listEvents()