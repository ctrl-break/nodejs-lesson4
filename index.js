"use strict";
var makenews = require('./news.js');

var express = require('express');
var bodyParser = require('body-parser');
var template = require('consolidate').handlebars;

const PORT = 8000;

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
app.use('/css', express.static(__dirname + '/views/css')); // redirect CSS bootstrap
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts')); // redirect fonts

// Разбираем application/x-www-form-urlencoded
app.use( bodyParser.urlencoded() );

app.post('/', function (req, res) {
  // Рендеринг шаблона
  makenews.news( function(data){
        res.render('index', {
          news: data,
          newsNum: req.body.newsNum
        });
    }, req.body.newsNum);
});

app.get('/', function (req, res) {
  res.render('index');

});

app.listen(8000, function () {
  console.log(`Server was running on: http://localhost:${PORT}`);
});
