const fs = require('fs');
const path = require('path');
var formidable = require('formidable');
var moment = require('moment');
var express = require('express');
var router = express.Router();
var sport_track = require('../../sport-track-db');

var Activity = sport_track.activity;
var activity_dao  = sport_track.activity_dao;
var ActivityEntry = sport_track.activityentry;
var activityentry_dao = sport_track.activityentry_dao;

var calcul = require('../../exo1/function');

/**
 * Vérifie que le fichier json a la bonne structure
 * .json
 * 	  |
 * 	  +--activity
 * 	  |		|
 * 	  |		+--data
 * 	  |		|
 * 	  |		+--description
 * 	  |
 * 	  +--data
 * 	  	   |
 * 	  	   +--{time, cardio_frequency, latitude, longitude, altitude}
 * 	  	   +--{time, cardio_frequency, latitude, longitude, altitude}
 * 	  	   +-- ...
 */
verifKeys = function(data) {
	if ('activity' in data && 'data' in data && 'date' in data.activity && 'description' in data.activity) {
		if (data.data !== undefined && data.data.length !== 0) {
			for (key of data.data) {
				if (!('time' in key && 'cardio_frequency' in key && 
					'latitude' in key && 'longitude' in key && 'altitude' in key)) { 
					return false; 
				};
			}
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * Affiche le formulaire d'upload de fichier json 
 */
router.get('/', function (req, res, next) {
	if (req.session.authenticated) {
		res.render('upload', {active: 'upload'});
	} else {
		res.redirect('connect');
	}
});

/**
 * Vérifie que le fichier json est de la bonne forme et que les 
 * informations sont correctes, si elles le sont insère les données
 * dans la base de donnée
 */
router.post('/', function (req, res, next) {

	if (!req.session.authenticated) {
		res.redirect('connect');
	}

	var form = new formidable.IncomingForm();
	form.parse(req);
	
	form.onPart = part => {
		if (part.filename && part.mime === 'application/json') {
			form.handlePart(part);
		}
	}

	form.on('fileBegin', function (name, file){
		file.path = appRoot + '/uploads/' + file.name.split(' ').join('-');
	});

	form.on('file', function (name, file){
		let fileData = JSON.parse(fs.readFileSync(file.path));
		if (verifKeys(fileData)) {
			
			let starttime = fileData.data[0].time;
			let endtime   = fileData.data[fileData.data.length-1].time;
			let timedif   = moment(endtime, 'HH:mm:ss').diff(moment(starttime, 'HH:mm:ss'), 'minutes');

			let dist = calcul.calculDistanceTrajet(fileData);

			let cardioMin = fileData.data.reduce((min, p)   => p.cardio_frequency < min ? p.cardio_frequency : min, fileData.data[0].cardio_frequency);
			let cardioMax = fileData.data.reduce((max, p)   => p.cardio_frequency > max ? p.cardio_frequency : max, fileData.data[0].cardio_frequency);
			let cardioAvg = fileData.data.reduce((total, p) => total + p.cardio_frequency / fileData.data.length, 0);

			console.log('', Activity);
			let act = new Activity(-1, req.session.email, fileData.activity.date, fileData.activity.description, dist, timedif, starttime, endtime, cardioMin, cardioMax, cardioAvg);

			activity_dao.insert(act, function(err) { 
				if (err) res.status(500).render('error', {message: "Couldn't insert activity", error:{status: 500, stack: "Activity probably already exists"}});
				else {
					let lastid = this.lastID;			
					fileData.data.forEach(key => {
						activityentry_dao.insert(new ActivityEntry(lastid, key.time, key.cardio_frequency, key.latitude, key.longitude, key.altitude), function(err) { 
							res.status(500).render('error', {message: "Couldn't insert activity data", error:{status: 500, stack: "Activity data probably already exists"}});
						});
					})
				}
			});

		}
	});
	
	res.render('upload', {active: 'upload'});
});

module.exports = router;
