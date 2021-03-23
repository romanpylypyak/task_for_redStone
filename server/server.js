const express = require("express");
const app = express();
let cors = require("cors")
app.use(express.json());
const port = require("./config/serverConfig.js")
const getUser = require("../server/controllers/getUser")
const getPosts = require("../server/controllers/getPosts")
app.use(cors())


app.post("/", getUser)
app.post("/user", getPosts)

app.listen(port, () =>
  console.log("NEW server has been started on port " + port.port+ " ...")
);
