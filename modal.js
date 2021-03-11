
require('dotenv').config();

const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

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
      }
      
}