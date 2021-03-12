
require('dotenv').config();

const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString,
ssl: {
  rejectUnauthorized: false
}});

module.exports = {
    getPackages: function (req, res){
        console.log("Getting packages...")
        // var id = [req.query.id];
      
        const sql = "SELECT * FROM hmphoto.packages";
        pool.query(sql, function(err, result){
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
          res.json(JSON.stringify(result.rows))
        })
    },
    
    authLogin: function (req, res){
      var username = req.body.userName;
      var password = req.body.userPassword;
      if (username && password) {
        const sql = "SELECT * FROM hmphoto.user WHERE userName = $1::varchar AND userPassword = $2::varchar";
        const values = [username, password];
        console.log(username)
        console.log(password)
        pool.query(sql, values, function(err, results) {
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
          console.log("LENGTH CHECK: " + results.length)
          if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            res.redirect('/packageManagement');
          } else {
            message = "Incorrect Username and/or Password!"
            res.render('pages/login', {
              message: message
            })
            res.end();
          }			
        });
      } else {
          message = "Please enter Username and Password!"
            res.render('pages/login', {
            message: message
            })
            res.end();

          }
      
    }
}  
      
