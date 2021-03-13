module.exports = {
    pmDisplay: function (req, res){
        if (req.session.loggedin) {
            loginMessage = 'Welcome back, ' + req.session.username + '!'
            res.render('pages/packageManagement', {
              loginMessage: loginMessage
            })
            res.end();
        } else {
            message = "Please login to view this page!"
            res.render('pages/login', {
              message: message
            })
            res.end();
        }
    },
    
    // handleLogout: function (req, res){
    //     req.session.destroy(function(err){
    //        if(err){
    //           console.log(err);
    //        }else{
    //            console.log(session.loggedin)
    //            req.end();
    //            res.redirect('/login')
    //            message = "You logged out. Log back in!"

    //        }
    //     }
    // }
        
}