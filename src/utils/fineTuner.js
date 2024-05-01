var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fs = require("fs");
const { OpenAI } = require("openai");
const initFineTuning = (jsonlPath, trainingModel, epochCount, suffixName) => __awaiter(this, void 0, void 0, function* () {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const trainingDataFile = fs.createReadStream(jsonlPath);
    const fileObj = yield openai.files.create({
        file: trainingDataFile,
        purpose: "fine-tune",
    });
    console.log(`Successfully uploaded the training data:\n
    id:${fileObj.id}`);
    const fineTune = yield openai.fineTuning.jobs.create({
        training_file: fileObj.id,
        model: trainingModel,
        hyperparameters: { n_epochs: epochCount },
        suffix: suffixName,
    });
    console.log(`Started the fine-tuning process:\n
    model:${fineTune.model}\n
    id:${fineTune.id}`);
});
module.exports = { initFineTuning };
