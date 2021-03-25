const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2/promise");
const config = require("../config/DBConfig");
//const config = require("../commander.js");
const bCrypt = require("bcrypt")

module.exports = async (req,res) => {
    let data = req.body;
    const conn = await mysql.createConnection(config);
    try {
      const [rows, fields] = await conn.execute(
        `Select * FROM persons where Name='${data.name}'`,
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
}