import * as fs from "fs";
import path from 'path';

interface Message {
  role: "system" | "user" | "assistant";
  content: "string";
}

interface TrainingJSONL {
  messages: Message[];
}

async function jsonFormatter(jsonPath: string) {
  const fileContent = fs.readFileSync(jsonPath, "utf8");
  const jsonData = JSON.parse(fileContent);

  // Initialize an array to hold the JSONL strings
  const jsonlData: string[] = [];

  // Iterate over each item in jsonData, which is assumed to be an array of objects
  jsonData.forEach((item: any) => {
    const formattedItem = {};

    // Process 'messages' if they exist
    if (item.messages) {
      formattedItem['messages'] = item.messages;
    }

    // Process 'functions' if they exist
    if (item.functions) {
      // The provided example suggests 'functions' is an array of objects with a 'function' property containing the relevant data
      formattedItem['functions'] = item.functions.map((funcObj: any) => {
        // Directly return the 'function' property if it exists
        return funcObj.function ? funcObj.function : funcObj;
      });
    }

    // Convert the formatted item to a JSON string and add it to the array
    jsonlData.push(JSON.stringify(formattedItem));
  });

  // Join all JSON strings with a newline to form the JSONL content
  const jsonlContent = jsonlData.join("\n");

  // Define the output file path
  const outputFileName = path.join(path.dirname(jsonPath), path.basename(jsonPath, '.json') + "-formatted.jsonl");

  // Write the JSONL content to the output file
  fs.writeFileSync(outputFileName, jsonlContent, "utf8");

  console.log(`Conversion complete. Output file: ${outputFileName}`);
  return outputFileName;
}

module.exports = { jsonFormatter };
