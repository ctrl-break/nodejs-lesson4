var express = require('express');
var bodyParser = require('body-parser');
var template = require('consolidate').handlebars;

const PORT = 8000;

var app = express();

// prepare server
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

// Определяем обработчик шаблонов
app.engine('hbs', template);

// Устанавливаем переменные для обработки шаблонов
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Разбираем application/x-www-form-urlencoded
app.use( bodyParser.urlencoded() );

// Разбираем application/json
app.use( bodyParser.json() );

app.get('/', function (req, res) {
  // Рендеринг шаблона
  res.render('index', {
    moment: new Date(),
    action: ['спать'],
  });
});

app.get('/worker', function (req, res) {
  res.render('index', {
    moment: new Date(),
    action: ['брать дрель'],
  });
});

app.listen(8000, function () {
  console.log(`Server was running on: http://localhost:${PORT}`);
});
