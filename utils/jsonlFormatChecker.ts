const { exec } = require("child_process");

const formatAnalyzer = async (jsonlFilePath: string) => {
  const pyCommand = `python .\\.venv\\utils\\formatChecker.py "${jsonlFilePath}"`;

  await exec(
    pyCommand,
    async (error: Error, stdout: Object, stderr: Object) => {
      if (error) {
        console.error("Execution error:", error.message);
        return;
      }
      await console.log(stdout);
      await console.error(stderr);
    }
  );
};

module.exports = { formatAnalyzer };
