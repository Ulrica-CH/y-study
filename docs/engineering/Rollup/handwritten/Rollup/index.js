const Bundle = require("./Bundle");
module.exports = function Rollup(entryPath, outputPath) {
  const bundle = new Bundle({ entryPath });
  bundle.build(outputPath);
};
