module.exports = {
    pmDisplay: function (req, res){
        if (req.session.loggedin) {
            res.send('Welcome back, ' + req.session.username + '!');
        } else {
            res.send('Please login to view this page!');
        }
        res.end();
    }

}