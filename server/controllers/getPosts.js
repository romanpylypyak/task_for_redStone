const mysql = require("mysql2/promise");
const config = require("../config/DBConfig");



module.exports = async (req,res) => {
    let data = req.body;
    const conn = await mysql.createConnection(config);
    try {
      const [rows, fields] = await conn.execute(
        `Select * FROM ${data.name}posts`
      )
      if(!rows.length){
        return res.status(400).send("no Data");
      } else {
        if(req.url === "/user"){
          let resData = JSON.stringify(rows)
          res.setHeader("Content-type", 'text/plain')
          res.status(200).send(resData)
        }
       else if(req.url === "/api/user"){
        res.render('index', { rows: rows });
       }
      } 
    } catch (error) {
      return res.status(500).send("Error, data of this user posts is undefined!")
    }
  conn.end(); 
}