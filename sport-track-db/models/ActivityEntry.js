class ActivityEntry {
    constructor(dataId, hour, cardioFreq, latitude, longitude, altitude, activityId){
        this.dataId = dataId;
        this.hour = hour;
        this.cardioFreq = cardioFreq;
        this.latitude = latitude;
        this.longitude = longitude;
        this.altitude = altitude;
        this.activityId = activityId;
    }

    toString() {
        return `| AE - ${this.activityId} | ${this.hour} pos:${this.latitude}:${this.longitude}:${this.altitude} f:${this.cardioFreq} |`;
    }
}

module.exports = ActivityEntry; 