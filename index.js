"use strict";
var makenews = require('./news.js');

var express = require('express');
var bodyParser = require('body-parser');
var template = require('consolidate').handlebars;

const PORT = 8000;

var result = makenews.meduza( function(data){ console.log(data); }, 5);

console.log(typeof result + "****++++");

var app = express();

// Определяем обработчик шаблонов
app.engine('hbs', template);

// Устанавливаем переменные для обработки шаблонов
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// prepare server
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Разбираем application/x-www-form-urlencoded
app.use( bodyParser.urlencoded() );

// Разбираем application/json
app.use( bodyParser.json() );

app.get('/', function (req, res) {
  // Рендеринг шаблона
  res.render('index', {
    moment: new Date(),
    news: makenews
    //action: result( function(data){ return data; }, 5)
  });
});

app.listen(8000, function () {
  console.log(`Server was running on: http://localhost:${PORT}`);
});
