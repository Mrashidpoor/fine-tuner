"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
function jsonFormatter(jsonPath, format) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileContent = fs.readFileSync(jsonPath, "utf8");
        const jsonData = JSON.parse(fileContent);
        // Initialize an array to hold the JSONL strings
        const jsonlData = [];
        // Iterate over each item in jsonData, which is assumed to be an array of objects
        if (format === 'Function') {
            jsonData.forEach((item) => {
                const formattedItem = {};
                // Process 'messages' if they exist
                if (item.messages) {
                    formattedItem['messages'] = item.messages;
                }
                // Process 'functions' if they exist
                if (item.functions) {
                    // The provided example suggests 'functions' is an array of objects with a 'function' property containing the relevant data
                    formattedItem['functions'] = item.functions.map((funcObj) => {
                        // Directly return the 'function' property if it exists
                        return funcObj.function ? funcObj.function : funcObj;
                    });
                }
                // Convert the formatted item to a JSON string and add it to the array
                jsonlData.push(JSON.stringify(formattedItem));
            });
        }
        else if (format === 'Speech') {
            jsonData.forEach((item) => {
                const formattedItem = {};
                // Process 'messages' if they exist
                if (item.messages) {
                    formattedItem['messages'] = item.messages;
                }
                // Convert the formatted item to a JSON string and add it to the array
                jsonlData.push(JSON.stringify(formattedItem));
            });
        }
        // Join all JSON strings with a newline to form the JSONL content
        const jsonlContent = jsonlData.join("\n");
        // Define the output file path
        const outputFileName = path_1.default.join(path_1.default.dirname(jsonPath), path_1.default.basename(jsonPath, '.json') + "-formatted.jsonl");
        // Write the JSONL content to the output file
        fs.writeFileSync(outputFileName, jsonlContent, "utf8");
        console.log(`Conversion complete. Output file: ${outputFileName}`);
        return outputFileName;
    });
}
module.exports = { jsonFormatter };
