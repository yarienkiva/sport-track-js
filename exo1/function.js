class CalculDistance{

    /**
     * Méthode privée qui convertit un degré en degré radians
     * @param  {float} degre degré
     * @return {float}       degré radian
     */
    #convertionRadian(degre){
        return (Math.PI * degre) / 180;
    }

    /**
     * Calcule la distance entre deux points GPS
     * @param  {float} lat1  
     * @param  {float} long1 
     * @param  {float} lat2  
     * @param  {float} long2 
     * @return {float}       
     */
    calculDistance2PointsGPS(lat1, long1, lat2, long2){
        var lat1Rad   = this.#convertionRadian(lat1);
        var lat2Rad   = this.#convertionRadian(lat2);
        var long1Rad  = this.#convertionRadian(long1);
        var long2Rad  = this.#convertionRadian(long2);

        var diffLong  = long2Rad - long1Rad;
        var sinLatRad = Math.sin(lat1Rad) * Math.sin(lat2Rad);
        var cosLatRad = Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.cos(diffLong);
        return 6378137 * Math.acos(sinLatRad + cosLatRad);
    }

    /**
     * Calcule de la distance totale de l'activité
     * @param  {Array{JSON}} activite l'activité à calculer
     * @return {float}       la distance totale
     */
    calculDistanceTrajet(activite){
        var parcours = activite['data'];
        var dist = 0;
        for (let i = 0; i<parcours.length-1; i++){
            var pos1 = parcours[i];
            var pos2 = parcours[i+1];
            var dist = dist + this.calculDistance2PointsGPS(pos1['latitude'],pos1['longitude'],pos2['latitude'],pos2['longitude']);
        }
        return dist;
    }
}

var calcul = new CalculDistance()

module.exports = calcul;