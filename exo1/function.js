function calculDistance2PointsGPS(lat1, long1, lat2, long2){
    var lat1Rad = convertionRadian(lat1);
    var lat2Rad = convertionRadian(lat2);
    var long1Rad = convertionRadian(long1);
    var long2Rad = convertionRadian(long2);

    var diffLong = long2Rad - long1Rad;
    var sinLatRad = Math.sin(lat1Rad) * Math.sin(lat2Rad);
    var cosLatRad = Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(diffLong);
    return 6378137 * Math.acos(sinLatRad + cosLatRad);
}

function convertionRadian(degre){
    return (Math.PI * degre) / 180;
}

function calculDistanceTrajet(parcours){
    var dist = 0;
    for (let i = 0; i<parcours.length-1; i++){
        var pos1 = parcours[i];
        var pos2 = parcours[i+1];
        var dist = dist + calculDistance2PointsGPS(pos1['lat'],pos1['long'],pos2['lat'],pos2['long']);
    }
    return dist;
}

module.exports = calculDistanceTrajet;