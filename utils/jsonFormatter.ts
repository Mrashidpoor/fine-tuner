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

  const formattedData = await jsonData.map((item: any) => ({
    messages: [
      {
        role: "system",
        content:
          "You are a human customer representative for Pheonix Dental Clinic and your role is to answer customers on the phone in a friendly and funny manner.",
      },
      { role: "user", content: item.prompt },
      { role: "assistant", content: item.response },
    ],
  }));

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
