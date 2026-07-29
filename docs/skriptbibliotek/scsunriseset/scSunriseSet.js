
    //***************************************//
    // The purpose of this script library
    //  is to calculate sunrise/sunset
    // times for a specific position(lat/long).
    // Version 1.0 (2022-06-13)
    // Copyright © 2022 Kentima AB. No rights reserved.
    //***************************************//
    
try
{    
    // Check for existance of script library 'scExtensions'
    if(typeof scExtensions == "undefined") 
    {
        throw new Error("Script library 'scExtensions' is missing."); //Script library is missing, we can't continue
    }
    
    //Calculate local time for sunrise and sunset, based on coordinates for latitude and longitude
    this.calculateSunRiseSet = function(lat, lon) 
    { 
        var altit = -35.0/60.0;
        var upper_limb = 1;

        var year = System.Clock.Year;
        var month = System.Clock.Month;
        var day = System.Clock.Day;

        /* Compute d of 12h local mean solar time */
        var d = (367*year-((7*(year+((month+9)/12)))/4)+((275*month)/9)+day-730530) + 0.5 - lon/360.0;

        /* Compute the local sidereal time of this moment */      
        var tmp1 = (180.0 + 356.0470 + 282.9404) + (0.9856002585 + 0.0000470935) * d;
        var tmp2 = tmp1 - 360.0 * Math.floor(tmp1/360.0);
        var tmp3 = tmp2 + 180.0 + lon;
        var sidtime = tmp3 - 360.0 * Math.floor(tmp3/360.0);

        /* Compute Sun's RA, Decl and distance at this moment */      
        //sun_RA_dec( d, &sRA, &sdec, &sr );
        //sunpos( d, &lon, r ) r=sr, lon lokal
        tmp1 = 356.0470 + 0.9856002585 * d;
        var M = tmp1 - 360.0 * Math.floor(tmp1 / 360.0);   
        var w = 282.9404 + 0.0000470935 * d;
        var e = 0.016709 - 0.000000001151 * d;
        var E = M + e * 180.0/3.14 * Math.sin(M* 3.14/180.0) * (1.0 + e * Math.cos(M*3.14/180.0));
        var x1 = Math.cos(E*3.14/180.0) - e;
        var y1 = Math.sqrt(1.0 - e*e) * Math.sin(E*3.14/180.0);
        var sr = Math.sqrt(x1*x1 + y1*y1);
        var v = Math.atan2(y1, x1) * 180.0/3.14;
        var lon2 = v + w;                   
        if (lon2 >= 360.0) lon2 -= 360.0;            

          
        var x = sr * Math.cos(lon2*3.14/180.0);
        var y = sr * Math.sin(lon2*3.14/180.0);
        var obl_ecl = 23.4393 - 0.0000003563 * d;
        var z = y * Math.sin(obl_ecl*3.14/180.0);
        y = y * Math.cos(obl_ecl*3.14/180.0);
        var sRA = Math.atan2(y, x) * 180.0/3.14;
        var sdec = Math.atan2(z, Math.sqrt(x*x + y*y)) * 180.0/3.14;

        /* Compute time when Sun is at south - in hours UT */      
        tmp1 = sidtime - sRA;
        var tsouth = 12.0 - (tmp1 - 360.0 * Math.floor(tmp1/360.0 + 0.5))/15.0;

        var sradius = 0.2666 / sr;

        if (upper_limb) altit -= sradius;
        
        var cost = (Math.sin(altit*3.14/180.0) - Math.sin(lat*3.14/180.0) * Math.sin(sdec*3.14/180.0)) / (Math.cos(lat*3.14/180.0) * Math.cos(sdec*3.14/180.0));

        var t;
        if (cost >= 1.0)
            t = 0.0;
        else if (cost <= -1.0)
            t = 12.0;
        else
            t = Math.acos(cost)/15.0 * 180.0/3.14;

        //UT
        var SunRising = tsouth - t + (System.Clock.TimezoneOffset/60);    //Adapt for UTC
        var SunSetting  = tsouth + t + (System.Clock.TimezoneOffset/60);;    //Adapt for UTC

        var sunRiseHour = Math.floor(SunRising);
        var sunRiseMinute = Math.round((SunRising - sunRiseHour) * 60);
        var sunSetHour = Math.floor(SunSetting);
        var sunSetMinute = Math.round((SunSetting - sunSetHour) * 60);
        
        //Create object to return
        var sunTime = new Object();
        sunTime["rise"] = ("0" + sunRiseHour).slice(-2) + ":" + ("0" + sunRiseMinute).slice(-2);
        sunTime["set"] = ("0" + sunSetHour).slice(-2) + ":" + ("0" + sunSetMinute).slice(-2);

        return sunTime;
    }
    
    //Create Sunrise sunset object
    this.SunRiseSetCheck = function(latitude, longitude, name)
    {
        try
        {
            var lat         = (typeof latitude == "undefined" || typeof latitude !== "number") ? 55.6405 : latitude; //Set default latitude value to 55.6405, if latitude parameter is missing
            var long        = (typeof longitude == "undefined" || typeof longitude !== "number") ? 13.2134 : longitude; //Set default latitude value to 13.2134, if latitude parameter is missing
            var n           = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Set default name
            var eventTarget = new EventTarget(); //Create EventTarget on the object
            
            this.getEventTarget = function()
            {
                return eventTarget; // return eventTarget
            }
            
            //Create function for sending an Event
            var sendEvent = function(sunrise, sunset, latitude, longitude, date, name)
            {
                try
                {
                    var event = new Event(); //Create new Event object
                    event.initEvent("DataAvailable", true, true);
                    
                    event.sunrise   = sunrise; //Store sunrise in the event
                    event.sunset    = sunset; //Store sunset in the event
                    event.latitude  = latitude; //Store latitude in the event
                    event.longitude = longitude; //Store longitude in the event
                    event.date      = date; //Store date on the event
                    event.name      = name; //Store name on the event
                    event.text      = "Check name: " + name + ", Sunrise: " + sunrise + ", sunset: " + sunset + " local time, for location latitude: " + latitude + ", longitude: " + longitude + ", for date: " + event.date; //Add optional text to the event
                    
                    if(eventTarget.willTrigger("DataAvailable")) //Check if EventListener exists
                        eventTarget.dispatchEvent(event);
                    else
                        throw new Error("Event listener 'DataAvailable' is missing"); //Throw Error if EventListener is missing.
                }
                catch(e)
                {
                    Debug.Print("scSunRiseSet.SunRiseSetCheck.sendEvent(): " + e);
                }
            }
            
            //Function for getting new data
            this.getData = function()
            {
                try
                {
                    var sun = scSunriseSet.calculateSunRiseSet(lat, long); //Function will return a Struct object, containing to values(rise, set).
                    sendEvent(  sun.rise,   //Time for sunrise
                                sun.set,    //Time for sunset
                                lat,        //Latitude
                                long,       //Longitude
                                new Date().toLocaleDateString(), //Get todays' date
                                n);         //Name of instance
                }
                catch(e)
                {
                    Debug.Print("scSunRiseSet.SunRiseSunSetCheck.getData(): " + e);
                }
            }
            
            //Create Timer object
            var timer    = new Timer(1000, false); //Create new Timer object
            timer.parent = this; //Create reference to this object, to get access from Timer object
            timer.onTimeout = function()
            {
                try
                {
                    this.parent.getData(); //Execute getData() function
                    this.start(scExtensions.msLeftUntilMidnight()+60000); //Restart the timer to get an update at midnight
                }
                catch(e)
                {
                    Debug.Print("scSunRiseSet.SunRiseSunSetCheck.timer.onTImeout(): " + e);
                }
            }
        }
        catch(e)
        {
            Debug.Print("SunRiseSetCheck.timer.onTimeout(): " + e); //Catch any error from onTimeout function
        }
    }
}
catch(e)
{
    Debug.Print("scSunriseSet: " + e);
}