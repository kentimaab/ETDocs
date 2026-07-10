
    //***********************************************//
    // The purpose of this script library
    // is to collect data from multiple cameras
    // and present this data through simple
    // function calls from the Main script
    // Version 1.0 (2022-06-13)
    // Copyright © 2022 Kentima AB. No rights reserved.
    //***********************************************//
    
try
{    
    // Check for existance of script library 'scExtensions'
    if(typeof scExtensions == "undefined") 
    {
        throw new Error("Script library 'scExtensions' is missing."); //Script library is missing, we can't continue
    }
    
    //If any camera has an active 'CommunicationError' this function will return 'true'
    this.getCameraCommunicationError = function()
    {
        try
        {
            var globalCommError = false;
            for(var cam in Cameras)
            {
                if(Cameras[cam].CommunicationError) // Check CommunicationError property on all cameras
                {
                    globalCommError = true; //Set variable to 'true' if there is an active communication error
                    break; //Abort for-loop
                }
            }
            return globalCommError; //Return variable
        }
        catch(e)
        {
            Debug.Print("scCameras.getCameraCommunicationError(): " + e);
        }
    }
    
    //Event driven communication error check. Function will fire an event which can be processed in the main script.
    this.CommunicationErrorCheck = function(interval, name)
    {
        try
        {
            var interval      = (typeof interval == "undefined" || typeof interval !== "number") ? 10000 : interval; //Set default interval value to 10s, if parameter interval is missing
            var name          = (typeof name == "undefined"|| typeof name !== "string") ? "<NONAME>" : name; //Set default name value to "", if parameter name is missing
            var commErrorEdge = false; //Variable to to keep track of positive/negative change
            var eventTarget   = new EventTarget(); //Create EventTarget on this object
            
            //Get interval
            this.getInterval = function()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function()
            {
                return eventTarget;
            }
            
            //Event function
            var sendEvent = function(name, status) 
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true);
                
                event.name        = name; //Store name in the event
                event.isCommError = status; //Store comm error status in the event
                event.text        = "Comm error check name '" + name + "', global error is: " + (status ? "Active" : "Inactive"); //Add optional text to the event
                
                if(eventTarget.willTrigger("DataAvailable")) //Check if EventListener exists
                    eventTarget.dispatchEvent(event);
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw Error if EventListener is missing.
            }
            
            //Function to get new data
            this.getData = function()
            {
                try
                {
                    var isCommError = scCameras.getCameraCommunicationError(); //Function will return true/false depending on if there are any active camera communication errors or not
                    if((isCommError && !commErrorEdge) || (!isCommError && commErrorEdge)) //Check if comm error has a different status compared to last timeout
                    {
                        sendEvent(name, isCommError); // Send event to EventTarget
                    }
                    else
                    {
                        //Debug.Print("Script running, isCommError: " + isCommError + ", interval: " + interval); //For debug purposes
                    }
                    commErrorEdge = isCommError; //Store last state for next timeout
                }
                catch(e)
                {
                    Debug.Print("CommunicationErrorCheck.getData(): " + e); //Catch any error from getData() function
                }
            }
            
            //Create timer object to check for new camera comm errors on timeout
            var timer    = new Timer(1000, false); 
            timer.parent = this; //Create reference to this object, to be able to access properties from onTimeout function
            timer.onTimeout = function()
            {
                try
                {
                    this.parent.getData(); //Execute getData() function
                    this.start(this.parent.getInterval()); //Restart timer
                }
                catch(e)
                {
                    Debug.Print("CommunicationErrorCheck.timer.onTimeout(): " + e); //Catch any error from onTimeout function
                }
            }
            
            Debug.Print("Created new instance of object 'scCameras.CommunicationErrorCheck()', name: " + name + ", interval: " + interval/1000 + " seconds");
        }
        catch(e)
        {
            Debug.Print("scCameras.CommunicationErrorCheck(): " + e);
        }
    }
    
    //If any camera has an active 'RecordingError' this function will return 'true'
    this.getCameraRecordingError = function()
    {
        try
        {
            var globalRecError = false;
            for(var cam in Cameras)
            {
                if(Cameras[cam].RecordingError) // Check RecordingError property on all cameras
                {
                    globalRecError = true; //Set variable to 'true' if there is an active recording error
                    break; //Abort for-loop
                }
            }
            return globalRecError; //Return variable
        }
        catch(e)
        {
            Debug.Print("scCameras.getCameraRecordingError(): " + e);
        }
    }
    
    //Event driven recording error check. Function will fire an event which can be processed in the main script.
    this.RecordingErrorCheck = function(interval, name)
    {
        try
        {
            var interval     = (typeof interval == "undefined" || typeof interval !== "number") ? 10000 : interval; //Set default interval value to 10s, if parameter interval is missing
            var name         = (typeof name == "undefined" || typeof name !== "string") ? "<NONAME>" : name; //Set default name value to "", if parameter name is missing
            var recErrorEdge = false; //Variable to to keep track of positive/negative change
            var eventTarget  = new EventTarget(); //Create EventTarget on this object
            
            //Get interval
            this.getInterval = function()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function()
            {
                return eventTarget;
            }
            
            //Event function
            var sendEvent = function(name, status) 
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true);
                
                event.name       = name; //Store name in the event
                event.isRecError = status; //Store recording error status in the event
                event.text       = "Recording error check name '" + name + "', error is: " + (status ? "Active" : "Inactive"); //Add optional text to the event
                
                if(eventTarget.willTrigger("DataAvailable")) //Check if EventListener exists
                    eventTarget.dispatchEvent(event);
                else
                    throw new Error("Event listener for type 'DataAvailable' is missing"); //Throw Error if EventTarget and/or EventListener is missing.
            }
            
            //Function to get new data
            this.getData = function()
            {
                try
                {
                    var isRecError = scCameras.getCameraRecordingError(); //Function will return true/false depending on if there are any active camera recording errors or not
                    if((isRecError && !recErrorEdge)  || (!isRecError && recErrorEdge)) //Check if recording error has a different status compared to last interval
                    {
                        sendEvent(name, isRecError); // Send event to EventTarget
                    }
                    else
                    {
                        //Debug.Print("Script running, isRecError: " + isRecError + ", edge: " + this.recErrorEdge + ", inteval: " + interval); //For debug purposes
                    }
                    recErrorEdge = isRecError; //Store last state for next timeout
                }
                catch(e)
                {
                    Debug.Print("scCameras.RecordingErrorCheck.getData(): " + e);
                }
                
            }
            
            //Create timer object to check for new camera recording errors on timeout
            var timer    = new Timer(1000, false); 
            timer.parent = this; //Create reference to this object, to be able to access properties from onTimeout function
            timer.onTimeout = function()
            {
                try
                {
                    this.parent.getData(); //Execute getData() function
                    this.start(this.parent.getInterval()); //Restart timer
                }
                catch(e)
                {
                    Debug.Print("RecordingErrorCheck.timer.onTimeout(): " + e); //Catch any error from onTimeout function
                }
            }
            
            Debug.Print("Created new instance of object 'scCameras.RecordingErrorCheck()', name: " + name + ", interval: " + interval/1000 + " seconds");
        }
        catch(e)
        {
            Debug.Print("scCameras.RecordingErrorCheck(): " + e);
        }
    }
    
    //This function will return average bandwidth, Bytes/s (last 10s), for all cameras currently enabled and online
    this.getAverageCameraBandwidth = function()
    {
        try
        {
            if(typeof scExtensions == "undefined")
            {
                throw new Error("Script library 'scExtensions' is missing."); //Script library 'scExtensions' is missing, we can't continue
            }
            
            var camAvgBandwidth = []; //Create an Array object to store average bandwidth from all cameras
            for(var cam in Cameras)
            {
                if(Cameras[cam].Statistics.AvgBandwidth > 0)
                    camAvgBandwidth.push(Cameras[cam].Statistics.AvgBandwidth); //Get average bandwidth from all cameras currently streaming video
            }
            
            return (camAvgBandwidth.length > 0 ) ? Math.calculateAverage(camAvgBandwidth) : 0; //Average bandwidth, Bytes/s (last 10s), for all cameras
        }
        catch(e)
        {
            Debug.Print("scCameras.getAverageCameraBandwidth(): " + e); //Catch any error from the function
        }
    }
    
    //Event driven bandwidth check. Function will fire an event which can be processed in the main script.
    this.AverageCameraBandwidthCheck = function(limit, interval, name)
    {
        try
        {
            var limit       = (typeof limit == "undefined" || typeof limit !== "number") ? 5242880 : limit; //Set default limit value to 5.0 MiB/s, if limit parameter is missing
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? 10000 : interval; //Set default interval value to 10s, if interval parameter is missing
            var name        = (typeof name == "undefined" || typeof name !== "string") ? "<NONAME>" : name; //Set default name value to "", if name parameter is missing
            var aboveEdge   = false; //Variable to to keep track of positive/negative change
            var belowEdge   = false; //Variable to to keep track of positive/negative change
            var eventTarget = new EventTarget(); //Create EventTarget on this object
            
            //Get interval
            this.getInterval = function()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function()
            {
                return eventTarget;
            }
            
            //Send event function
            var sendEvent = function(limit, name, isAboveLimit,isBelowLimit, avg)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true);
                
                event.limit                         = limit; //Store limit in the event
                event.name                          = name; //Store name in the event
                event.isAboveLimit                  = isAboveLimit; //Store above limit status in the event
                event.isBelowLimit                  = isBelowLimit; //Store below limit status in the event
                event.currentAverageCameraBandwidth = avg; //Store average camera bandwidth in the event
                event.text                          = "Average bandwidth check name '" + name + "' " + (isAboveLimit ? "above" : "below") + " limit '" + scExtensions.bytesToSize(limit) + "/s', current average camera bandwidth: " + scExtensions.bytesToSize(avg) + "/s"; //Add optional text to the event
                
                if(eventTarget.willTrigger("DataAvailable"))
                    eventTarget.dispatchEvent(event);
                else
                    throw new Error("Event listener for type 'DataAvailable' is missing");
            }
            
            //Function to get new data
            this.getData = function()
            {
                try
                {
                    var avg          = scCameras.getAverageCameraBandwidth(); //Function will return average camera bandwidth for all cameras that are online and currently streaming video
                    var isAboveLimit = avg > limit; //Check if average is above limit
                    var isBelowLimit = avg <= limit; //Check if average is below or equals to limit
                    if((isAboveLimit && !aboveEdge) || (isBelowLimit && !belowEdge))//Check if average bandwidth is above/below the limit at the same time as it was not above/below the limit on last timeout
                    {
                        sendEvent(limit, name, isAboveLimit, isBelowLimit, avg); // Send event to EventTarget
                    }
                    else
                    {
                        //Debug.Print("Script running, avg bw: " + avg + ", limit: " + limit); //For debug purposes
                    }
                    aboveEdge = isAboveLimit; //Store state for next timeout
                    belowEdge = isBelowLimit; //Store state for next timeout
                }
                catch(e)
                {
                    Debug.Print("scCameras.AverageCameraBandwidthCheck.getData(): " + e);
                }
            }
            
            var timer    = new Timer(1000, false); //Create timer object to check if limit is above or below limit on timeout
            timer.parent = this; //Create reference to this object, to be able to access properties from onTimeout function
            timer.onTimeout = function()
            {
                try
                {
                    this.parent.getData(); //Execute getData() function
                    this.start(this.parent.getInterval()); //Restart timer
                }
                catch(e)
                {
                    Debug.Print("AverageCameraBandwidthCheck.timer.onTimeout(): " + e); //Catch any error from onTimeout function
                }
            }
            
            Debug.Print("Created new instance of object 'scCameras.AverageCameraBandwidthCheck()', name: " + name + ", interval: " + interval/1000 + " seconds, limit: " + scExtensions.bytesToSize(limit) + "/s");
        }
        catch(e)
        {
            Debug.Print("scCameras.AverageCameraBandwidthCheck(): " + e);
        }
    }
    
    //This function will return total bandwidth in Bytes/s, based on average over last 10s, for all cameras currently enabled and online
    this.getTotalCameraBandwidth = function()
    {
        try
        {
            if(typeof scExtensions == "undefined")
            {
                throw new Error("Script library 'scExtensions' is missing."); //Script library 'scExtensions' is missing, we can't continue
            }
            
            var camTotBandwidth = 0; //Create a Number variable to store total average bandwidth from all cameras online
            for(var cam in Cameras)
            {
                if(Cameras[cam].Statistics.AvgBandwidth > 0)
                    camTotBandwidth += Cameras[cam].Statistics.AvgBandwidth; //Add average bandwidth from all cameras currently streaming video
            }
            
            return camTotBandwidth; //Total bandwidth, Bytes/s (last 10s), for all cameras currently online and streaming video
        }
        catch(e)
        {
            Debug.Print("scCameras.getTotalCameraBandwidth(): " + e);
        }
    }
    
    //Event driven bandwidth check. Function will fire an event which can be processed in the main script.
    this.TotalCameraBandwidthCheck = function(limit, interval, name)
    {
        try
        {
            var limit       = (typeof limit == "undefined" || typeof limit !== "number") ? 104857600 : limit; //Set default limit value to 1.0 GiB/s, if limit parameter is missing
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? 10000 : interval; //Set default interval value to 10s, if interval parameter is missing
            var name        = (typeof name == "undefined" || typeof name !== "string") ? "<NONAME>" : name; //Set default name value to "", if name parameter is missing
            var aboveEdge   = false; //Variable to to keep track of positive/negative change
            var belowEdge   = false; //Variable to to keep track of positive/negative change
            var eventTarget = new EventTarget(); //Create EventTarget on this object
            
            //Get interval
            this.getInterval = function()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function()
            {
                return eventTarget;
            }
            
            //Send event function
            var sendEvent = function(limit, name, isAboveLimit,isBelowLimit, tot)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true);
                
                event.limit                       = limit; //Store limit in the event
                event.name                        = name; //Store name in the event
                event.isAboveLimit                = isAboveLimit; //Store above limit status in the event
                event.isBelowLimit                = isBelowLimit; //Store below limit status in the event
                event.currentTotalCameraBandwidth = tot; //Store total camera bandwidth in the event
                event.text                        = "Total bandwidth check name '" + name + "' " + (isAboveLimit ? "above" : "below") + " limit '" + scExtensions.bytesToSize(limit) + "/s', current total camera bandwidth(based on average camera bandwidth): " + scExtensions.bytesToSize(tot) + "/s"; //Add optional text to the event
                
                if(eventTarget.willTrigger("DataAvailable")) //Check that EventTarget and EventListener exists
                    eventTarget.dispatchEvent(event);
                else
                    throw new Error("Event listener for type 'DataAvailable' is missing"); //Throw Error if EventTarget and/or EventListener is missing.
            }
            
            //Function to get new data
            this.getData = function()
            {
                try
                {
                    var tot          = scCameras.getTotalCameraBandwidth(); //Function will return total camera bandwidth, based on average for each camera over last 10s, for all cameras that are online and currently streaming video
                    var isAboveLimit = tot > limit; //Check if average is above limit
                    var isBelowLimit = tot <= limit; //Check if average is below or equals to limit
                    if((isAboveLimit && !aboveEdge) || (isBelowLimit && !belowEdge)) //Check if average bandwidth is above/below the limit at the same time as it was not above/below the limit on last timeout
                    {
                        sendEvent(limit, name, isAboveLimit, isBelowLimit, tot); // Send event to EventTarget
                    }
                    else
                    {
                        //Debug.Print("Script running, bw: " + tot + ", limit: " + limit); //For debug purposes
                    }
                    aboveEdge = isAboveLimit; //Store last state for next timeout
                    belowEdge = isBelowLimit; //Store last state for next timeout
                }
                catch(e)
                {
                    Debug.Print("scCameras.TotalCameraBandwidthCheck.getData(): " + e);
                }
            }
            
            //Create timer object to check for new camera recording errors on timeout
            var timer    = new Timer(1000, false); 
            timer.parent = this; //Create reference to this object, to be able to access properties from onTimeout function
            timer.onTimeout = function()
            {
                try
                {
                    this.parent.getData(); //Execute getData() function
                    this.start(this.parent.getInterval()); //Restart timer
                }
                catch(e)
                {
                    Debug.Print("TotalCameraBandwidthCheck.timer.onTimeout(): " + e); //Catch any error from onTimeout function
                }
            }
            
            Debug.Print("Created new instance of object 'scCameras.TotalCameraBandwidthCheck()', name: " + name + ", interval: " + interval/1000 + " seconds, limit: " + scExtensions.bytesToSize(limit) + "/s");
        }
        catch(e)
        {
            Debug.Print("scCameras.TotalCameraBandwidthCheck(): " + e);
        }
    }
    
    //This function will return average recording in Bytes (per hour, last week), for all cameras
    this.getAverageCameraRecordingHour = function()
    {
        try
        {
            if(typeof scExtensions == "undefined")
            {
                throw new Error("Script library 'scExtensions' is missing."); //Script library 'scExtensions' is missing, we can't continue
            }
            
            var camAvgRecordingHour = []; //Create an Array object to store average camera recording from all cameras
            for(var cam in Cameras)
            {
                camAvgRecordingHour.push(Cameras[cam].Statistics.AvgRecordingHour); //Get average bandwidth from all cameras currently streaming video
            }
            
            return Math.calculateAverage(camAvgRecordingHour); //Average recording, Bytes (per hour, last week), for all cameras
        }
        catch(e)
        {
            Debug.Print("scCameras.getAverageCameraRecordingHour(): " + e);
        }
    }
    
    //Event driven recording check. Function will fire an event which can be processed in the main script.
    this.AverageCameraRecordingHourCheck = function(limit, interval, name)
    {
        try
        {
            var limit       = (typeof limit == "undefined" || typeof limit !== "number") ? 104857600 : limit; //Set default limit value to 100.0 MiB, if limit parameter is missing
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? 10000 : interval; //Set default interval value to 10s, if interval parameter is missing
            var name        = (typeof name == "undefined" || typeof name !== "string") ? "<NONAME>" : name; //Set default name value to "", if name parameter is missing
            var aboveEdge   = false; //Variable to to keep track of positive/negative change
            var belowEdge   = false;//Variable to to keep track of positive/negative change
            var eventTarget = new EventTarget(); //Create EventTarget on this object
            
            //Get interval
            this.getInterval = function()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function()
            {
                return eventTarget;
            }
            
            //Send event function
            var sendEvent = function(limit, name, isAboveLimit,isBelowLimit, avg)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true);
                
                event.limit                             = limit; //Store limit in the event
                event.name                              = name; //Store name in the event
                event.isAboveLimit                      = isAboveLimit; //Store above limit status in the event
                event.isBelowLimit                      = isBelowLimit; //Store below limit status in the event
                event.currentAverageCameraRecordingHour = avg; //Store average camera recording in the event
                event.text                              = "Recording check name '" + name + "' " + (isAboveLimit ? "above" : "below") + " limit '" + scExtensions.bytesToSize(limit) + "', current camera recoring per hour(last week): " + scExtensions.bytesToSize(avg); //Add optional text to the event
                
                if(eventTarget.willTrigger("DataAvailable")) //Check if EventListener exists
                    eventTarget.dispatchEvent(event);
                else
                    throw new Error("Event listener for type 'DataAvailable' is missing"); //Throw Error if EventListener is missing.
            }
            
            //Function to get new data
            this.getData = function()
            {
                try
                {
                    var avg          = scCameras.getAverageCameraRecordingHour(); //Function will return average camera recording per hour over last week for all cameras
                    var isAboveLimit = avg > limit; //Check if average is above limit
                    var isBelowLimit = avg <= limit; //Check if average is below or equals to limit
                    if((isAboveLimit && !aboveEdge) || (isBelowLimit && !belowEdge))//Check if average bandwidth is above/below the limit at the same time as it was not above/below the limit on last timeout
                    {
                        sendEvent(limit, name, isAboveLimit, isBelowLimit, avg); // Send event to EventTarget
                    }
                    else
                    {
                        //Debug.Print("Script running, avg rec: " + avg + ", limit: " + limit); //For debug purposes
                    }
                    aboveEdge = isAboveLimit; //Store last state for next timeout
                    belowEdge = isBelowLimit; //Store last state for next timeout
                }
                catch(e)
                {
                    Debug.Print("scCameras.AverageCameraRecordingHourCheck.getData(): " + e);
                }
            }
            
            //Create timer object to check for new camera recording errors on timeout
            var timer    = new Timer(1000, false); 
            timer.parent = this; //Create reference to this object, to be able to access properties from onTimeout function
            timer.onTimeout = function()
            {
                try
                {
                    this.parent.getData(); //Execute getData() function
                    this.start(this.parent.getInterval()); //Restart timer
                }
                catch(e)
                {
                    Debug.Print("AverageCameraRecordingHourCheck.timer.onTimeout(): " + e); //Catch any error from the onTimeout function
                }
            }
            
            Debug.Print("Created new instance of object 'scCameras.AverageCameraRecordingHourCheck()', name: " + name + ", interval: " + interval/1000 + " seconds, limit: " + scExtensions.bytesToSize(limit));
        }
        catch(e)
        {
            Debug.Print("scCameras.AverageCameraRecordingHourCheck(): " + e);
        }
    }
}
catch(e)
{
    Debug.Print("scCameras: " + e);
}


//Main script, Method 1
/*
try
{
    var anyCameraCommError            = scCameras.getCameraCommunicationError(); //Function will return true or false and store it in variable 'anyCameraCommError'
    var anyCameraRecError             = scCameras.getCameraRecordingError(); //Function will return true or false and store it in variable 'anyCameraRecError'
    var currentAverageCameraBandwidth = scCameras.getAverageCameraBandwidth(); //Function will return current average camera bandwidth(Bytes/s) and store it in variable 'currentAverageCameraBandwidth'
    var currentTotalCameraBandwidth   = scCameras.getTotalCameraBandwidth(); //Function will return current total camera bandwidth(Bytes/s) and store it in variable 'currentTotalCameraBandwidth'
    var currentCameraRecordingHour    = scCameras.getAverageCameraRecordingHour(); //Function will return current average camera recording per hour(Bytes) and store it in variable 'currentCameraRecordingHour' 
    
    Debug.Print("currentAverageCameraBandwidth: " + scExtensions.bytesToSize(currentAverageCameraBandwidth) + "/s");
}
catch(e)
{
    Debug.Print("Main script: " + e);
}
*/

//Main script, Method 2
/*
try
{
    var init;
    if(init == undefined)
    {
        init    = true;
        //var ce1 = new scCameras.CommunicationErrorCheck(10000, "ce1"); //interval, name
        var ce1 = new scCameras.CommunicationErrorCheck(); //interval, name
        ce1.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(event.isCommError) // This will happen if there is any camera which currently has a communication error
                {
                    Debug.Print("Global communication error is Active, meaning one or more cameras are offline.");
                }
                else if(!event.isCommError) // This will happen if there previously was an active communication error, but the error has been reset
                {
                    Debug.Print("Global communication error is Inactive, meaning all cameras are online.");
                }
            }
            catch(e)
            {
                Debug.Print("ce1.getEventTarget().onDataAvailable(): " + e);
            }
        }
        //var re1 = new scCameras.RecordingErrorCheck(10000, "re1"); //interval, name
        var re1 = new scCameras.RecordingErrorCheck(); //interval, name
        re1.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(event.isRecError) // This will happen if there is any camera which currently has a recording error
                {
                    Debug.Print("Global recording error is Active, meaning one or more cameras have a recording error.");
                }
                else if(!event.isRecError) // This will happen if there previously was an active recording error, but the error has been reset
                {
                    Debug.Print("Global recording error is Inactive, meaning all recording errors are reset.");
                }
            }
            catch(e)
            {
                Debug.Print("re1.getEventTarget().onDataAvailable(): " + e);
            }
        }
        //var bw1 = new scCameras.AverageCameraBandwidthCheck(10000, 10000, "bw1"); //limit, interval, name
        var bw1 = new scCameras.AverageCameraBandwidthCheck(); //limit, interval, name
        bw1.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(event.isAboveLimit) // This will happen if average camera bandwidth is above limit
                {
                    Debug.Print("Average camera bandwidth is above limit of: " + scExtensions.bytesToSize(event.limit) + "/s, current average bandwidth: " + scExtensions.bytesToSize(event.currentAverageCameraBandwidth) + "/s");
                }
                else if(event.isBelowLimit) // This will happen if average camera bandwidth is below limit
                {
                    Debug.Print("Average camera bandwidth is below limit of: " + scExtensions.bytesToSize(event.limit) + "/s, current average bandwidth: " + scExtensions.bytesToSize(event.currentAverageCameraBandwidth) + "/s");
                }
            }
            catch(e)
            {
                Debug.Print("bw1.getEventTarget().onDataAvailable(): " + e);
            }
        }
        //var tw1 = new scCameras.TotalCameraBandwidthCheck(50000, 10000, "tw1"); //limit, interval, name
        var tw1 = new scCameras.TotalCameraBandwidthCheck(); //limit, interval, name
        tw1.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(event.isAboveLimit) // This will happen if total camera bandwidth is above limit.
                {
                    Debug.Print("Total camera bandwidth is above limit of: " + scExtensions.bytesToSize(event.limit) + "/s, current total bandwidth: " + scExtensions.bytesToSize(event.currentTotalCameraBandwidth) + "/s");
                }
                else if(event.isBelowLimit) // This will happen if total camera bandwidth is below limit.
                {
                    Debug.Print("Total camera bandwidth is below limit of: " + scExtensions.bytesToSize(event.limit) + "/s, current total bandwidth: " + scExtensions.bytesToSize(event.currentTotalCameraBandwidth) + "/s");
                }
            }
            catch(e)
            {
                Debug.Print("tw1.getEventTarget().onDataAvailable(): " + e)
            }
        }
        //var rh1 = new scCameras.AverageCameraRecordingHourCheck(50000, 10000, "rh1"); //limit, interval, name
        var rh1 = new scCameras.AverageCameraRecordingHourCheck(); //limit, interval, name
        rh1.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(event.isAboveLimit) // This will happen if average camera recording per hour, over last week, is above limit.
                {
                    Debug.Print("Average camera recording per hour, last week, is above limit of: " + scExtensions.bytesToSize(event.limit) + ", current average recording: " + scExtensions.bytesToSize(event.currentAverageCameraRecordingHour));
                }
                else if(event.isBelowLimit) // This will happen if average camera recording per hour, over last week, is below limit.
                {
                    Debug.Print("Average camera recording per hour, last week, is below limit of: " + scExtensions.bytesToSize(event.limit) + ", current average recording: " + scExtensions.bytesToSize(event.currentAverageCameraRecordingHour));
                }
            }
            catch(e)
            {
                Debug.Print("rh1.getEventTarget().onDataAvailable(): " + e);
            }
        }
    }
}
catch(e)
{
    Debug.Print("Main script: " + e);
}*/