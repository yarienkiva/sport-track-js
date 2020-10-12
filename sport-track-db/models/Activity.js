class Activity {
    constructor(emailUser, date, description, distanceTotal, duration, startHour, endHour, cardioFreqMin, cardioFreqMax, cardioFreqAvg){
        this.emailUser = emailUser;
        this.date = date;
        this.description = description;
        this.distanceTotal = distanceTotal;
        this.duration = duration;
        this.startHour = startHour;
        this.endHour = endHour;
        this.cardioFreqMin = cardioFreqMin;
        this.cardioFreqMax = cardioFreqMax;
        this.cardioFreqAvg = cardioFreqAvg;
    }

    toString() {
        return `| A ->${this.emailUser} | ${this.description} |`;
    }
}

module.exports = Activity;
