var express = require('express');
var expressHbs = require('express3-handlebars');
var http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser')

var app = express();
var server = http.createServer(app);

server.listen(process.env.PORT || 3000);
app.engine('hbs', expressHbs({extname:'hbs', defaultLayout: 'main.hbs'}));
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

var uri = 'mongodb://leo:leo@ds115798.mlab.com:15798/testing';
var db = mongoose.connect(uri);

var Schema = mongoose.Schema;

var confessSchema = new Schema({
	content: String,
	forgive: {type: Number, default: 0},
	condemn: {type: Number, default: 0},
	created: {type: Date, default: Date.now}
});


var Confession = mongoose.model('Confession',confessSchema);
var confess = new Confession({content:" i hate code in C#", forgive: 10, condemn: 5});

console.log('confess: ' + confess);

// fs.readdirSync(__dirname + '/model').forEach(function(file){
// 	if (file.indexOf('.js')) require(__dirname + '/model/' + file);
// });

console.log('server is running...');

var createConfession = function(confession){
	var data = new Confession({content:confession});
	data.save(function(err, doc){
		if (err){
			return console.error(err);
		}
		console.log('Saved...');
	});
};

app.get('/',function(req, res){
	res.render('index');
});

app.post('/postConfession', function(req, res){
	var confession = req.body.confession;
	createConfession(confession);
	res.redirect('/');
});

app.get('/save',function(req,res){
	confess.save(function(err, test){
		console.log('saved?');
		if (err){
			console.log('error');
			return console.error(err);
		}
		console.log('saved!');
	});
	console.log('after save');
});

app.get('/read',function(req, res){
	Confession.find(function(err, test){
		res.send(test);
	});
});
