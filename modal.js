
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

        const sql = "SELECT * FROM hmphoto.packages";
        pool.query(sql, function(err, result){
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
          res.render('pages/packages', {
            result: result.rows,
          })
        })
    },

    pmDisplay: function (req, res){
      if (req.session.loggedin) {
          loginMessage = 'Welcome back, ' + req.session.username + '!'
          const sql = "SELECT p.packageid, p.packagename, m.service FROM hmphoto.packages p LEFT JOIN hmphoto.media m ON p.mediaID = m.mediaID ORDER BY p.packageid";
          pool.query(sql, function(err, result){
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
          res.render('pages/packageManagement', {
            loginMessage: loginMessage,
            result: result.rows,
          })
          res.end();
        })
      } else {
          message = "Please login to view this page!"
          res.render('pages/login', {
            message: message
          })
          res.end();
      }
  }, 
    
    authLogin: function (req, res){
      var username = req.body.userName;
      var password = req.body.userPassword;
      if (username && password) {
        const sql = "SELECT * FROM hmphoto.user WHERE userName = $1::varchar AND userPassword = $2::varchar";
        const values = [username, password];
        pool.query(sql, values, function(err, results) {
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
          if (results.rows != 0) {
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
      
    },

    newPackage: function (req, res){
      var newmediaid = req.body.mediaid;
      var newpackagename = req.body.packagename;
      var newpackageprice = req.body.packageprice;
      var newpackagehours = req.body.packagehours;
      var newpackageimg = req.body.packageimg;
      var newpackagelocationcount = req.body.packagelocationcount;
      var newpackagedescription = req.body.packagedescription;

      if(newmediaid && newpackagename && newpackageprice && newpackagehours && newpackageimg && newpackagelocationcount && newpackagedescription){
        const sql = 'INSERT INTO hmphoto.packages (mediaid, packagename, packageprice, packagehours, packageimg, packagelocationcount, packagedescription) VALUES ( $1::int, $2::varChar, $3::decimal, $4::varChar, $5::varChar, $6::int, $7::text)';
        const values = [newmediaid, newpackagename, newpackageprice, newpackagehours, newpackageimg, newpackagelocationcount, newpackagedescription];
        pool.query(sql, values, function(err){
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
        var addMessage = 'Added Package!' 
        console.log('Adding Package..')
        res.redirect('/packages');
        res.end();
        })
      }
    },
    
    deletePackage: function (req, res){
      if (req.session.loggedin) {
        var packageid = req.param('id');
        const sql = 'DELETE FROM hmphoto.packages WHERE packageid = $1::int';
        const value = [packageid]
        pool.query(sql, value, function(err){
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
          console.log(sql, value);
        res.redirect('/packages')
        res.end();
        })
      } else {
        message = "Please login to view this page!"
        res.render('pages/login', {
          message: message
        })
        res.end();
      }
    }
}  
      
