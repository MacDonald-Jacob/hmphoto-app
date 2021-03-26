var modal = require('./modal');
module.exports = {    
    handleLogout: function (req, res){
        req.session.destroy(function(err){
           if(err){
              console.log(err);
           }else{
               res.redirect('/')
               message = "You logged out. Log back in!"
               loginMessage = ''
           }
        })
    },
    
    deleteDisplay: function (req, res){
        if (req.session.loggedin) {
        var packageid = req.param('id');
        
        res.render('pages/delete-package', {
            packageid: packageid,
          })
      
        } else {
            message = "Please login to view this page!"
            res.render('pages/login', {
                message: message
            })
        res.end();
        }
    },

    // UpdateDisplay: function(req, res, getPackagesById){
    //     var packageid = req.param('id');
    //     if (req.session.loggedin) {
    //         // result = modal.getPackagesById(packageid);
    //         console.log("CHECK" + JSON.stringify(result))
    //         console.log("CHECK2" + result)
    //         res.render('pages/update-package', {
    //             result: result,
    //         })
    //         result = modal.getPackagesById(packageid)

    //     res.end()
    //     }

    // }
        
}