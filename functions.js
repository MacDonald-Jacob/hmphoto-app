
const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || "postgres://xwpbeeqsljswvs:c31d571bef07969c64075135bd2be5568be0373140d3aa832c49f6135169c6c4@ec2-54-164-22-242.compute-1.amazonaws.com:5432/d2v78ukgtp9soq?ssl=true";
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