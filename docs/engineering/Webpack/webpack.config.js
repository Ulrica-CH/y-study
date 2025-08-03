const path = require("path");
module.exports = {
  entry: "./src/index.js",
  mode:'production',   
  output: {
    path: __dirname,
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve(__dirname, "./loader/report-inject-loader.js"),
      },
    ],
  },
};
