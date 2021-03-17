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
    }
        
}