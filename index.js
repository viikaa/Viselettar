const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');


app.set('view engine', 'ejs');

app.use(express.static('static'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
    secret: 'keyboard cat',
    cookie: {
      maxAge: 600000
    },
    resave: true,
    saveUninitialized: false
}));

require('./route/index')(app);

let server = app.listen(3000, function () {
});