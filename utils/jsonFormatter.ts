import * as fs from "fs";

interface Message {
  role: "system" | "user" | "assistant";
  content: "string";
}

interface TrainingJSONL {
  messages: Message[];
}

async function jsonFormatter(jsonPath: string) {
  const jsonData = await JSON.parse(fs.readFileSync(jsonPath, "utf8"));

  let formattedData = await jsonData.map((conversation: any) => {
    let messages = [
      {
        role: "system",
        content: conversation[0].system,
      },
    ];

    conversation.forEach((message: any) => {
      messages.push({
        role: "user",
        content: message.prompt,
      });

      messages.push({
        role: "assistant",
        content: message.response,
      });
    });

    return { messages };
  });

  const jsonlData = await formattedData
    .map((item: any) => JSON.stringify(item))
    .join("\n");

  const outputFileName = jsonPath.replace(".json", "") + "-formatted.jsonl";
  fs.writeFileSync(outputFileName, jsonlData, "utf8");

  console.log(
    `JSON to JSONL conversion complete. Output file: ${outputFileName}`
  );
  return outputFileName;
}

module.exports = { jsonFormatter };
