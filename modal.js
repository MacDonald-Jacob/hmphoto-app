
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
        const sql = "SELECT * FROM hmphoto.packages ORDER BY mediaid, packageid";
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
          const sql = "SELECT p.packageid, p.packagename, p.mediaid, m.service FROM hmphoto.packages p LEFT JOIN hmphoto.media m ON p.mediaID = m.mediaID ORDER BY p.mediaid, p.packageid";
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
    },

    updatePackage: function (req, res){
      if (req.session.loggedin) {
        var mediaid = req.body.mediaid;
        var packagename = req.body.packagename;
        var packageprice = req.body.packageprice;
        var packagehours = req.body.packagehours;
        var packageimg = req.body.packageimg;
        var packagelocationcount = req.body.packagelocationcount;
        var packagedescription = req.body.packagedescription;
        var packageid = req.param('id');

        const sql = 'UPDATE hmphoto.packages SET mediaid = $1::INT, packagename = $2::VARCHAR, packageprice = $3::decimal, packagehours = $4::VARCHAR, packageimg = $5::VARCHAR, packagelocationcount = $6::SMALLINT, packagedescription = $7::TEXT WHERE packageid = $8::INT';
        const value = [mediaid, packagename, packageprice, packagehours, packageimg, packagelocationcount, packagedescription, packageid]
        pool.query(sql, value, function(err){
          if(err) {
            console.log("Error in query: ")
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

    },

    getPackagesById: function (req, res){
      if (req.session.loggedin) {
        var packageid = req.param('id');
        console.log("Getting package Details...")
        console.log(packageid)
        const sql = "SELECT * FROM hmphoto.packages WHERE packageid = $1::int";
        const value = [packageid]
        pool.query(sql, value, function(err, result){
          if(err) {
            console.log("Error in query: ")
            console.log(err);
          }
          console.log("RETRUN" + JSON.stringify(result.rows))
          res.render('pages/update-package', {
            result: result.rows,
          })
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
      
