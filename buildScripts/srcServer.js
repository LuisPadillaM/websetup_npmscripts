import express from "express";
import webpackmiddleware from "webpack-dev-middleware";
import webpack from "webpack";
import webpackConfig from "../webpack.config.dev";
import path from "path";
import open from "open";



const port = 3000;
const app = express(),
      compiler = webpack(webpackConfig);

app.use(webpackmiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}))


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
})

app.listen(port, (err) => {
  if (err){
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
})

