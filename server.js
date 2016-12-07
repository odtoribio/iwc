var express = require('express');
var expressHbs = require('express3-handlebars');
var http = require('http');

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT || 3000);
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');

console.log('server is running...');

app.get('/',function(req,res){
  res.render('index',{message:'Hello World...'});
});
