var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { exec } = require("child_process");
const formatAnalyzer = (jsonlFilePath) => __awaiter(this, void 0, void 0, function* () {
    const pyCommand = `.\\.venv\\Scripts\\python.exe .\\utils\\formatChecker.py "${jsonlFilePath}"`;
    yield exec(pyCommand, (error, stdout, stderr) => __awaiter(this, void 0, void 0, function* () {
        if (error) {
            console.error("Execution error:", error.message);
            return;
        }
        yield console.log(stdout);
        yield console.error(stderr);
    }));
});
module.exports = { formatAnalyzer };
