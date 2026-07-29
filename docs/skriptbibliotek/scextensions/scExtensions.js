
    //***********************************************//
    // The purpose of this script library
    // is to provide extensions to the script
    // engine.
    // Version 1.0 (2022-06-13)
    // Copyright © 2022 Kentima AB. No rights reserved.
    //***********************************************//
    
try
{    
    //Calculate average for Array of Numbers
    Math.calculateAverage = function (ary)
    {
        if(ary.length === 0)
            return 0;
        
        var totalSum = 0;
        for(var i in ary) //Iterate Array object
        {
            if(isNaN(ary[i]))
                throw new Error("Value: '" + ary[i] + "' is not a Number.");
            else
                totalSum += ary[i];
        }
        var average = totalSum / ary.length; //Calculate average
        
        return average;
    };
    
    //Check if 'value' is odd
    Math.isOdd = function(value)
    {
        if(isNaN(value))
            throw new Error("Math.isOdd(): value: '" + value + "' is not a Number"); //Throw error if value is not a number
        
        return (value % 2 == 1); //return if value is odd or not(true/false)
    };
    
    //Check if 'value' is even
    Math.isEven = function(value)
    {
        if(isNaN(value))
            throw new Error("Math.isEven(): value: '" + value + "' is not a Number");
        
        return (value % 2 == 0); //return if value is even or not(true/false)
    };
    
    //Extend String object with split function
    String.prototype.split = function (delimiter)
    {
        if (arguments.length < 1)
        {
            return [this];
        }
        var result = []; //Create Array object
        var buffer = this.slice();
        var dlen   = Math.max(1, delimiter.length);
        while (true) //Do work until nothing left to split
        {
            var ind = buffer.indexOf(delimiter);
            if (ind != -1 && buffer != "")
            {
                result.push(buffer.slice(0, ind));
                buffer = buffer.slice(ind + dlen);
            }
            else
            {
                result.push(buffer);
                return result; //Return Array object
            }
        }
    };
    
    //Locate all possible alarms in the system
    this.FindAllAlarms = function(alarms, parent, obj, severity)
    {
        for(prop in obj) //Iterate the object you want to find all alarms in, most likely 'DataStore'
        {
            if (obj[prop] instanceof Object)
            {
                this.FindAllAlarms(alarms, parent + prop + ".", obj[prop], severity);
            }
            else
            {
                if(obj.hasOwnProperty("Severity"))
                {
                    //Only add Alarm objects
                    //we can detect them as they have a property named 'Acknowledged'
                    if(((severity == undefined) ? true : (obj.Severity == severity)) && (prop == "Acknowledged"))
                    {
                        alarms[alarms.length] = { "Alarm" : obj, "Name" : parent.substring(0, parent.length-1), "Active" : false };
                    }
                }
            }
        }
    };
    
    //Get number of milliseconds left until midnight
    this.msLeftUntilMidnight = function()
    {
        var milliseconds = ((23 - System.Clock.Hour) * 3600000) + ((60 - System.Clock.Minute) * 60000) + ((60 - System.Clock.Second) * 1000); //Figure out how many milliseconds there are left until midnight.
        //Debug.Print("msl: " + milliseconds); //For debugging
        return milliseconds;
    };
    
    //Format bytes
    this.bytesToSize = function(bytes)
    {
        var sizes = ['B', 'KiB', 'MiB', 'GiB', 'TiB' , 'PiB', 'EiB', 'ZiB', 'YiB'];
        if  (bytes == 0) return '0 B';
        if  (isNaN(bytes)) throw new Error ("Value: '" + bytes + "' is not a number");
        var i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
    };
}
catch(e)
{
    Debug.Print("scExtensions: " + e);
}