const express = require("express");
const cors = require("cors");
const router = require("./App/route/index");


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log('App listening on port' + port)
});