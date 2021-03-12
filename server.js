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
  // .get('/packages', (req, res) => res.render('pages/packages'))
  .get('/login', (req, res) => res.render('pages/login', {message: message}))
  .get('/packageManagement', functions.pmDisplay)
  
  .post('/auth', modal.authLogin)

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  
if (typeof message == 'undefined' || message == null){
  message = "";
}