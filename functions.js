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
    }
        
}