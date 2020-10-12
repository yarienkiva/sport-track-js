CREATE TABLE IF NOT EXISTS Users (
    email VARCHAR2(255)
        PRIMARY KEY
        CHECK (email LIKE "%@%.%"),

    password VARCHAR2(255) NOT NULL,
    
    last_name VARCHAR2(255) NOT NULL,
    
    first_name VARCHAR2(255) NOT NULL,
    
    birthday TEXT NOT NULL,
        -- CHECK (birthday BETWEEN DATE '1900-01-01' AND SYSDATE),

    gender VARCHAR2(5) NOT NULL
        CHECK (gender = 'WOMAN' OR gender = 'MAN' OR gender = 'OTHER'),
    
    height INTEGER NOT NULL
        CHECK (height BETWEEN 10 AND 300),

    weight INTEGER NOT NULL
        CHECK (weight BETWEEN 5 AND 300)
);

-- SEPARATOR --

CREATE TABLE IF NOT EXISTS Activities (
    actId INTEGER PRIMARY KEY AUTOINCREMENT,

    emailUser VARCHAR2(255) NOT NULL,

    date TEXT NOT NULL,

    description VARCHAR2(255) NOT NULL,

    distanceTotal FLOAT
        CHECK (distanceTotal >= 0),
    
    duration TEXT,
    
    startHour TEXT,

    endHour TEXT,

    cardioFreqMin INTEGER(3)
        CHECK (cardioFreqMin BETWEEN 0 AND 250),
    
    cardioFreqMax INTEGER(3)
        CHECK (cardioFreqMax BETWEEN 0 AND 250),
    
    cardioFreqAvg INTEGER(3)
        CHECK (cardioFreqAvg BETWEEN 0 AND 250),
    
    FOREIGN KEY (emailUser) REFERENCES users(emailUser)
);

-- SEPARATOR --

CREATE TABLE IF NOT EXISTS ActivitiesData (
    dataId INTEGER PRIMARY KEY AUTOINCREMENT,

    activityId INTEGER NOT NULL,

    hour TEXT NOT NULL,

    cardioFreq INTEGER(3) NOT NULL
        CHECK (cardioFreq BETWEEN 0 AND 250),

    latitude FLOAT NOT NULL
        CHECK (latitude BETWEEN -90 AND 90),

    longitude FLOAT NOT NULL
        CHECK (longitude BETWEEN -180 AND 180),

    altitude FLOAT NOT NULL
        CHECK (altitude BETWEEN -10000 AND 10000),
    
    FOREIGN KEY (activityId) REFERENCES activities(actId)
);

-- SEPARATOR --

CREATE TRIGGER IF NOT EXISTS trig_insertVerifCardioFreq
BEFORE INSERT ON Activities
BEGIN

    SELECT CASE
    WHEN NEW.cardioFreqMin > NEW.cardioFreqAvg THEN
        RAISE(ABORT, 'Error: The minimum heart frequency is greater than the avergage frequency !')
    END;

    SELECT CASE
    WHEN NEW.cardioFreqMax < NEW.cardioFreqAvg THEN
        RAISE(ABORT, 'Error: The maximun heart frequency is lower than the avergage frequency !')
    END;

END;

-- SEPARATOR --

CREATE TRIGGER IF NOT EXISTS trig_updateVerifCardioFreq
AFTER UPDATE ON Activities
BEGIN

    SELECT CASE
    WHEN NEW.cardioFreqMin > NEW.cardioFreqAvg THEN
        RAISE(ABORT, 'Error: The minimum heart frequency is greater than the avergage frequency !')
    END;

    SELECT CASE
    WHEN NEW.cardioFreqMax < NEW.cardioFreqAvg THEN
        RAISE(ABORT, 'Error: The maximun heart frequency is lower than the avergage frequency !')
    END;

END;
