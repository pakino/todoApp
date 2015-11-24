var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('tasks',['tasks']);
var bodyParser = require('body-parser');


//to make the server use the public dir
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/tasks', function (req, res) {
	console.log("I received a GET request")

	db.tasks.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/tasks', function (req, res) {
	console.log(req.body);
	db.tasks.insert(req.body, function (err,doc) {
		res.json(doc);
	});
});

app.delete('/tasks/:id', function (req,res) {
	var id = req.params.id;
	console.log(id);
	db.tasks.remove({_id: mongojs.ObjectId(id)}, function (err,doc) {
		res.json(doc);
	});
});

app.get('/tasks/:id', function (req,res) {
	var id = req.params.id;
	console.log(id);
	db.tasks.findOne({_id: mongojs.ObjectId(id)}, function (err,doc) {
		res.json(doc);
	});
});

app.put('/tasks/:id', function (req,res) {
	var id = req.params.id;
	console.log(id);
	db.tasks.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update:  {$set: {description: req.body.description}},
						new: true}, function(err,doc){
							res.json(doc);
						});
	
});

app.listen(3000);
console.log("Server running on port 3000 --> http://localhost:3000");