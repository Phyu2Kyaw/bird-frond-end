import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

var setup = require('./config/setup');
var router = require('./routes/index');
//create own server
var app = express();

app.use(logger('dev'));
//limit file size
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(setup.accessControlAllow);

app.use('/api', router);

var port = process.env.PORT || '5000';

if(!module.parent){
  app.listen(port);//listen port 5000
}

module.exports = app;
