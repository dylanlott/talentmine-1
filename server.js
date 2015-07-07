var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Track = require('./api/models/Track');

mongoose.connect('mongodb://localhost/talentmine');

var app = express();
app.use(bodyParser.json());

app.get('/api/tracks', function(req, res) {
	Track.find({}).exec().then(function(tracks) {
		return res.json(tracks);
	});
});

app.post('/api/tracks', function(req, res) {
	Track.create({
		name: req.body.name,
		genre: req.body.genre
	}, function(err, new_track) {
		if (err) {
			return res.status(500).end();
		}
		return res.json(new_track)
	});
});

app.get('/api/tracks/:track_id', function(req, res) {
	Track.findOne({_id: req.params.track_id}).exec().then(function(track) {
		if (!track) {
			return res.status(404).end();
		}
		return res.json(track);
	});
});

app.put('/api/tracks/:track_id', function(req, res) {
	return res.json({
		name: "Hooked on a Feeling"
	});
});

app.delete('/api/tracks/:track_id', function(req, res) {
	return res.json({
		name: "Hooked on a Feeling"
	});
});

app.get('/api/artists', function(req, res) {
	return res.json([]);
});

app.get('/api/artists/:artist_id', function(req, res) {
	return res.json({
		name: "Journey"
	});
});

app.get('/api/labels', function(req, res) {
	return res.json([]);
});

app.get('/api/labels/:label_id', function(req, res) {
	return res.json({
		name: "Columbia"
	});
});


app.listen(8888);