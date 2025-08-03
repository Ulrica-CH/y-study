const path = require("path");
const Rollup = require("./Rollup");
const entryPath = path.resolve(__dirname, "./main.js");
const outputPath = path.resolve(__dirname, "dist/bundle.js");
Rollup(entryPath, outputPath);
