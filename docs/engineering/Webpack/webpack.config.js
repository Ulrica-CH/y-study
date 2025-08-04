const path = require("path");
const MyPlugin = require("./plugin/MyPlugin");
module.exports = {
  entry: "./src/index.js",
  mode:'production',   
  output: {
    path: __dirname,
    filename: "bundle.js",  
  },
  plugins: [
    new MyPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve(__dirname, "./loader/report-inject-loader.js"),
      },
    ],
  },
};
