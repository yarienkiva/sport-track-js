class CalculDistance { };

CalculDistance.prototype.calculDistance2PointsGPS = function(lat1, long1, lat2, long2){
    convertionRadian = function(degre){
        return (Math.PI * degre) / 180;
    }
    var lat1Rad = convertionRadian(lat1);
    var lat2Rad = convertionRadian(lat2);
    var long1Rad = convertionRadian(long1);
    var long2Rad = convertionRadian(long2);

    var diffLong = long2Rad - long1Rad;
    var sinLatRad = Math.sin(lat1Rad) * Math.sin(lat2Rad);
    var cosLatRad = Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(diffLong);
    return 6378137 * Math.acos(sinLatRad + cosLatRad);
}


CalculDistance.prototype.calculDistanceTrajet = function (activite){
    var parcours = activite['data'];
    var dist = 0;
    for (let i = 0; i<parcours.length-1; i++){
        var pos1 = parcours[i];
        var pos2 = parcours[i+1];
        var dist = dist + this.calculDistance2PointsGPS(pos1['latitude'],pos1['longitude'],pos2['latitude'],pos2['longitude']);
    }
    return dist;
}

var calcul = new CalculDistance()

var activite = {
    "activity": {
        "date": "01/09/2018",
        "description": "IUT -> RU"
    },
    "data": [
        { "time": "13:00:00", "cardio_frequency": 99, "latitude": 47.644795, "longitude": -2.776605, "altitude": 18 },
        { "time": "13:00:05", "cardio_frequency": 100, "latitude": 47.646870, "longitude": -2.778911, "altitude": 18 },
        { "time": "13:00:10", "cardio_frequency": 102, "latitude": 47.646197, "longitude": -2.780220, "altitude": 18 },
        { "time": "13:00:15", "cardio_frequency": 100, "latitude": 47.646992, "longitude": -2.781068, "altitude": 17 },
        { "time": "13:00:20", "cardio_frequency": 98, "latitude": 47.647867, "longitude": -2.781744, "altitude": 16 },
        { "time": "13:00:25", "cardio_frequency": 103, "latitude": 47.648510, "longitude": -2.780145, "altitude": 16 }
    ]
}


console.log(calcul.calculDistanceTrajet(activite))