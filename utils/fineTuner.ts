const fs = require("fs");
const { OpenAI } = require("openai");

const initFineTuning = async (
  jsonlPath: `${string}.jsonl`,
  trainingModel: string,
  epochCount: number,
  suffixName: string
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const trainingDataFile = fs.createReadStream(jsonlPath);

  const fileObj = await openai.files.create({
    file: trainingDataFile,
    purpose: "fine-tune",
  });

  console.log(`Successfully uploaded the training data:\n
    id:${fileObj.id}`);

  const fineTune = await openai.fineTuning.jobs.create({
    training_file: fileObj.id,
    model: trainingModel,
    hyperparameters: { n_epochs: epochCount },
    suffix: suffixName,
  });

  console.log(`Started the fine-tuning process:\n
    model:${fineTune.model}\n
    id:${fineTune.id}`);
};

module.exports = { initFineTuning };
