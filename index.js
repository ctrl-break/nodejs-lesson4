"use strict";
var makenews = require('./news.js'); // Модуль получения новостей

var express = require('express');
var bodyParser = require('body-parser');
var template = require('consolidate').handlebars;
var cookieParser = require('cookie-parser');

const PORT = 8000;
const MONTH = 2678400;

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

app.use(cookieParser());

app.get('/', function (req, res) {
  // Если переданы GET параметры, проверяем их и выводим новости
  if ( req.param('newsnum') ) {
    if ( !isNaN(req.param('newsnum')) && req.param('newsnum') > 0) {
      makenews.news( function(data){
            res.render('index', {
              news: data,
              newsNum: req.param('newsnum')
            });
        }, req.param('newsnum'));
    };
    return;
  }
  // /Если у клиента есть кука то используем её параметры
  else if (req.cookies.params) {
      if ( !isNaN(req.cookies.params) && req.cookies.params > 0) {
          makenews.news( function(data){
                res.render('index', {
                  news: data,
                  newsNum: req.cookies.params
                });
            }, req.cookies.params);
      };
      return;
  };

  res.render('index');  // Иначе пустой шаблон
});

app.get('/forget', function (req, res) {
  // Удаление куки
  res.clearCookie('params');
  res.redirect('back');
});

app.post('/', function (req, res) {
  // Вызываем функцию запроса новостей и передаем результат в шаблон
  if ( !isNaN(req.body.newsNum) && req.body.newsNum > 0) {
      makenews.news( function(data){
            res.render('index', {
              news: data,
              newsNum: req.body.newsNum
            });
        }, req.body.newsNum);

      // Сохраняем куку
      if (req.body.remember) {
          res.cookie('params', req.body.newsNum, { maxAge: MONTH });
      };
  } else {
    res.render('index');
  }
});

app.listen(PORT, function () {
  console.log(`Server was running on: http://localhost:${PORT}`);
});
