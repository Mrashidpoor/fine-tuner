import { exit } from "process";
require("dotenv").config();
const { jsonFormatter: jsonlFormatter } = require("../src/utils/jsonFormatter");
const { formatAnalyzer } = require("../src/utils/jsonlFormatChecker");
const { initFineTuning } = require("../src/utils/fineTuner.ts");
const readline = require("readline");

const jsonFilePath = "json\\ForbesIT-Dataset-SpeechV1.1.json";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = async (jsonlFilePath: string) => {
  rl.question(
    `If you are satisfied with the results, type in "let's go" to start fine-tuning or type abort to exit. `,
    async (input: string) => {
      if (input === "let's go") {
        console.log("Nice! Let's gooo team clAient.");

        await initFineTuning(
          jsonlFilePath,
          "gpt-3.5-turbo-0125",
          4,
          "forbesit-s1.1"
        );

        rl.close();
      } else if (input === "abort") {
        console.log("Okay, come back when you are ready.");

        rl.close();
        exit();
      } else {
        console.log("That's the wrong answer bitch! Try again!");
        promptUser(jsonlFilePath);
      }
    }
  );
};

const start = async () => {
  try {
    const jsonlFilePath = await jsonlFormatter(jsonFilePath, 'Speech');
    await formatAnalyzer(jsonlFilePath);
    setTimeout(() => {
      promptUser(jsonlFilePath);
    }, 2000);
  } catch (error) {
    console.error(error.message);
  }
};

start();