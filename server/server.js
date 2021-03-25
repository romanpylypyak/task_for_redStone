const express = require("express");
const app = express();
let cors = require("cors")
app.use(express.json());
const port = require("./config/serverConfig.js")
const getUser = require("../server/controllers/getUser")
const getPosts = require("../server/controllers/getPosts")
app.use(cors())
const hbs = require("express-handlebars")
const path = require("path")
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/', helpers:{
  math: function(lvalue, operator, rvalue) {lvalue = parseFloat(lvalue);
      rvalue = parseFloat(rvalue);
      return {
          "+": lvalue + rvalue,
      }[operator];
  }
}
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.post("/", getUser)
app.post("/user", getPosts)
app.post("/api/user", getPosts)


app.listen(port, () =>
  console.log("NEW server has been started on port " + port.port+ " ...")
);
