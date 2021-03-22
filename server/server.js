const express = require("express");
const app = express();
let cors = require("cors")
app.use(express.json());
const mysql = require("mysql2/promise");
const config = require("../server/config/DBconfig");
const port = require("./config/serverConfig.js")
const bCrypt = require("bcrypt")

app.use(cors())

app.post("/", async (req,res) => {
  let data = req.body;
  const conn = await mysql.createConnection(config);
  // let salt = await bCrypt.genSalt()
  // const hashPassword = await bCrypt.hash(data.password,salt)
  try {
    const [rows, fields] = await conn.execute(
      `Select * FROM persons where Name='${data.name}'`
    )
    if(!rows.length){
      return res.status(400).send("access denied. Wrong name");
    } else {
    const isValid = await bCrypt.compare(data.password, rows[0].Password) 
      if (!isValid) {
        return res.status(400).send("access denied. Wrong password");
      } else {
        res.status(200).json({user: {
          "name": rows[0].Name,
          "user role" : rows[0].Role
        }})
      }
    } 
  } catch (error) {throw error}
  conn.end();
})
    


app.listen(port, () =>
  console.log("NEW server has been started on port " + port.port+ " ...")
);
