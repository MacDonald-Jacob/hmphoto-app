require('dotenv').config();
var functions = require('./functions');

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

// const connectionString = process.env.DATABASE_URL;
// const { Pool } = require('pg')
// const connectionString = process.env.DATABASE_URL || "postgres://xwpbeeqsljswvs:c31d571bef07969c64075135bd2be5568be0373140d3aa832c49f6135169c6c4@ec2-54-164-22-242.compute-1.amazonaws.com:5432/d2v78ukgtp9soq?ssl=true";
// const pool = new Pool({connectionString: connectionString});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/packages', functions.getPackages)
  // .get('/packages', (req, res) => res.render('pages/packages'))
  .get('/login', (req, res) => res.render('pages/login'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


// function getPackages(req, res){
//   console.log("Getting packages...")
//   var id = [req.query.id];

//   const sql = "SELECT * FROM hmphoto.packages";
//   pool.query(sql, function(err, result){
//     if(err) {
//       console.log("Error in query: ")
//       console.log(err);
//     }
//     res.json(JSON.stringify(result.rows))
//   })
// }






  // var sql = "SELECT * FROM hmphoto.media";
  // pool.query(sql, function(err, result) {
  //     // If an error occurred...
  //     if (err) {
  //         console.log("Error in query: ");
  //         console.log(err);
  //     }
  
  //     // Log this to the console for debugging purposes.
  //     console.log("Back from DB with result:");
  //     // console.log(result.row);
  
  
  // }) 