const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

program
.argument("<filePath>", "path to the text file")
.action((filePath) => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        const words = data.trim().split(/\s+/);
        console.log(`Word count: ${words.length}`);
    } catch (error) {
        console.error("Error reading file:", error.message);
    }
})

program.parse();