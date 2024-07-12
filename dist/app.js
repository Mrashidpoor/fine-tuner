"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
require("dotenv").config();
const { jsonFormatter: jsonlFormatter } = require("../src/utils/jsonFormatter");
const { formatAnalyzer } = require("../src/utils/jsonlFormatChecker");
const { initFineTuning } = require("../src/utils/fineTuner.ts");
const readline = require("readline");
const jsonFilePath = "templates\\Nexhealth\\nexhealth-instaceV1.0.json";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const promptUser = (jsonlFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    rl.question(`If you are satisfied with the results, type in "let's go" to start fine-tuning or type abort to exit. `, (input) => __awaiter(void 0, void 0, void 0, function* () {
        if (input === "let's go") {
            console.log("Nice! Let's gooo team clAient.");
            yield initFineTuning(jsonlFilePath, "ft:gpt-3.5-turbo-0125:personal:eos:9S89WmkK", 4, "nexhealth-s1.3");
            rl.close();
        }
        else if (input === "abort") {
            console.log("Okay, come back when you are ready.");
            rl.close();
            (0, process_1.exit)();
        }
        else {
            console.log("That's the wrong answer bitch! Try again!");
            promptUser(jsonlFilePath);
        }
    }));
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonlFilePath = yield jsonlFormatter(jsonFilePath, 'Speech');
        yield formatAnalyzer(jsonlFilePath);
        setTimeout(() => {
            promptUser(jsonlFilePath);
        }, 2000);
    }
    catch (error) {
        console.error(error.message);
    }
});
start();
