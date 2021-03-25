const program  = require('commander');
    program
    .arguments('<host> <host_value>, <user> <user_value>, <database> <DB_value>, <password> <password_value>')
    .action((host,host_value,user, user_value,database,DB_value,password,password_value) => {
      module.exports = ({
            host : host_value,
            user: user_value,
            database : DB_value,
            password : password_value
        })
     
    });
  
  program.parse();

  

  //node server.js "host" "127.0.0.1" "user" "root" "database" "db_for_redstone" "password" "root"

  //this config requires in getUser.js