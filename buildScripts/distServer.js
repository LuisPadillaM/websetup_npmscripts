import express from "express";
import path from "path";
import open from "open";
import compression from "compression";

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
})

app.get("/users", (req, res) => {
  console.log(req.query);
  res.json([
    {"id": 1, "firstName": "Bob", "lastName": "Smith", "email": "lorem@gmail.com"},
    {"id": 2, "firstName": "Bob2", "lastName": "Smith", "email": "lorem2@gmail.com"},
    {"id": 3, "firstName": "Bob3", "lastName": "Smith", "email": "lorem3@gmail.com"}
  ])
})

app.listen(port, (err) => {
  if (err){
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
})

