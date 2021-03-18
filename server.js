var modal = require('./modal');
var functions = require('./functions');

const express = require('express')
var session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(session({secret: 'secret', resave: true, saveUninitialized: true}))
  .use(bodyParser.urlencoded({extended : true}))
  .use(bodyParser.json())
  
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  
  .get('/', (req, res) => res.render('pages/index'))
  .get('/packages', modal.getPackages)
  .get('/login', (req, res) => res.render('pages/login', {message: message}))
  .get('/packageManagement', modal.pmDisplay)
  .get('/add-package', (req, res) => res.render('pages/add-package'))
  .get('/update-package/:id', (req, res) => res.render('pages/update-package'))
  .get('/delete-package/:id', functions.deleteDisplay)
  .get('/logout', functions.handleLogout)
  .post('/auth', modal.authLogin)
  .post('/add', modal.newPackage)
  .post('/delete/:id', modal.deletePackage)



  .listen(PORT, () => console.log(`Listening on ${ PORT }`));



  // Take care of messages throughout the site. 
  if (typeof message == 'undefined' || message == null){
    message = "";
  }
  if (typeof loginMessage == 'undefined' || loginMessage == null){
    loginMessage = "";
  }
  if (typeof addMessage == 'undefined' || addMessage == null){
    addMessage = "";
  }


 