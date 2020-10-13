const fs = require('fs');
const path = require('path');
var formidable = require('formidable')
var express = require('express');
var router = express.Router();

var sport_track = require('../../sport-track-db');
var activity = sport_track.model.activity;
var activity_dao  = sport_track.activity_dao;
var activityentry = sport_track.model.activityentry;
var activityentry_dao = sport_track.activityentry_dao;

var calculDistanceTrajet = require('../../exo1').calculDistanceTrajet;

verifKeys = function(data) {
	if ('activity' in data && 'data' in data && 'date' in data.activity && 'description' in data.activity) {
		if (data === undefined || data.length == 0) {
			data.forEach(key => { if (
				'time' in key && 
				'cardio_frequency' in key && 
				'latitude' in key && 
				'longitude' in key && 
				'altitude' in key) { 
				return false; 
			} });
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

router.get('/', function (req, res, next) {
	if (req.session.authenticated) {
		res.render('upload');
	} else {
		res.render('connect');
	}
});

router.post('/', function (req, res, next) {

	if (!req.session.authenticated) {
		res.render('connect');
	}

	var form = new formidable.IncomingForm();
	form.parse(req);
	
	form.onPart = part => {
		if (part.filename && part.mime === 'application/json') {
			form.handlePart(part);
		} else {
			res.write('<h1>Bad filetype</h1>');
			res.end('<a href='+'/upload'+'>Back</a>'); 
		}
	}

	form.on('fileBegin', function (name, file){
		file.path = appRoot + '/uploads/' + file.name.split(' ').join('-');
	});

	form.on('file', function (name, file){
		let fileData = JSON.parse(fs.readFileSync(file.path));
		console.log(fileData);

		if (verifKeys(fileData)) {
			let act = new activity.Activity(fileData.)

		}


	});
	
	res.render('upload');
});

module.exports = router;