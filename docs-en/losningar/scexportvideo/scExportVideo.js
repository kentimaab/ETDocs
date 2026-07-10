
    //***********************************************//
    // The purpose of this script library
    // is to automatically export video from cameras 
    // associated with alarms. 
    // Version 1.0 (2024-09-12)
    // Copyright © 2024 Kentima AB. No rights reserved.
    //***********************************************//
    
// Define enums
var states = { "Inactive": 0, "Acked": 1, "Unacked": 2, "Active": 3, "Blocked": 4};

// array of AlarmObjects
var alarms;

// Export path
var exportPath;

// Export when alarm has been acknowledged (otherwise export is done as soon as the alarm is inactive)
var exportWhenAcked;

// Alarm object for activating an error if anything goes wrong when exporting
var exportAlarmObject;

// Init with array of alarm objects
this.Init = function(path, oAlarms, bExportWhenAcked)
{
    alarms          = new Array;
    exportPath      = path;
    exportWhenAcked = bExportWhenAcked;
    
    for (o in oAlarms)
    {
        var ao = new AlarmObject(oAlarms[o]);
        alarms.push(ao);
    }
}

this.SetErrorAlarmObject = function(alarmObject)
{
    exportAlarmObject = alarmObject;
}

function AlarmObject(oAlarm)
{
    this.ao        = oAlarm;
    this.ao.parent = this;

    // Check when state has changed
    this.ao.onStateChange = function(event)
    {
        this.parent.Check(this.State.valueOf());
    }
    
    this.Check = function(state)
    {
        // Check if Active
        if(state == states.Active)
        {
            // Save time of activation for the alarm
            this.alarmTime     = new Date();
            this.alarmStopTime = undefined;
            
            // Set flag that video is to be exported
            this.videoToExport = true;
        }
        
        // Check if Inactive or Unacked (Goes from Active)
        if(state == states.Inactive || state == states.Unacked)
        {
            // Check if video is to be exported (hasn't already been exported)
            if(this.videoToExport)
            {
                // Save time when alarm was inactivated
                if(this.alarmStopTime == undefined)
                    this.alarmStopTime = new Date();
                
                // If alarm is acknowledged or if export shall be done directly when inactive -> Do the export
                if(state == states.Inactive || !exportWhenAcked)
                {
                    // Check if we have to wait until pre and post alarm time have elapsed
                    var timeSinceInactive = new Date().valueOf() - this.alarmStopTime.valueOf();
                    var timeTotal         = (this.GetPreAlarmTime() + this.GetPostAlarmTime()) * 1000;
                    var timerValue        = timeTotal - timeSinceInactive;
                    
                    if(timerValue < 0)
                    {
                        this.Export();
                    }
                    else
                    {
                        // Create timer for making sure all pre alarm and post alarm video has been saved to disk
                        this.ti = new Timer(timerValue);
                        
                        // Save reference to this AlarmObject
                        this.ti.parent = this;

                        this.ti.onTimeout = function(ev)
                        {
                            ev.target.parent.Export();
                        }
                    }
                }
            }
        }
    }
    
    this.Export = function()
    {
        var startTime = new Date(this.alarmTime.valueOf() - this.GetPreAlarmTime() * 1000);
        var stopTime  = new Date(this.alarmStopTime.valueOf() + this.GetPostAlarmTime() * 1000);
        var path      = exportPath + "\\" + this.alarmTime.toString() + ".ethe";
        var cams      = new CameraCollection();
        cams.Add(this.ao);
        
        try
        {
            this.ej = new ExportJob(path, startTime, stopTime, cams);
            this.ej.Start();
        }
        catch(ex)
        {
            Debug.Print("Export failed: " + ex.message);
            
            // Activate error alarm if defined
            if(exportAlarmObject != undefined)
            {
                exportAlarmObject.SetActive();
            }
        }
        
        this.videoToExport = false;

        this.ej.onError = function(ev)
        {
            Debug.Print("Error: " + ev.target.ErrorMessage);
            
            // Activate error alarm if defined
            if(exportAlarmObject != undefined)
            {
                exportAlarmObject.SetActive();
            }
        }

        this.ej.onFinished = function(ev)
        {
            // Inactivate error alarm if defined
            if(exportAlarmObject != undefined)
            {
                exportAlarmObject.SetInactive();
            }
        }

        this.ej.onProgress = function(ev)
        {
            //Debug.Print("Export at " + ev.target.PercentDone + " %");
        }
    }
    
    
    this.GetPreAlarmTime = function()
    {
        var preAlarmTime = 0;
        
        // Create a camera collection object and initialize it with the alarm object to get all associated cameras
        var cams = new CameraCollection();
        cams.Add(this.ao);
        
        // Find the longest pre alarm time
        for (cam in cams.Cameras)
        {
            if(cams.Cameras[cam].PreEventTime > preAlarmTime)
                preAlarmTime = cams.Cameras[cam].PreEventTime;
        }
        
        return preAlarmTime;
    }

    this.GetPostAlarmTime = function()
    {
        var postAlarmTime = 0;
        
        // Create a camera collection object and initialize it with the alarm object to get all associated cameras
        var cams = new CameraCollection();
        cams.Add(this.ao);
        
        // Find the longest post alarm time
        for (cam in cams.Cameras)
        {
            if(cams.Cameras[cam].PostEventTime > postAlarmTime)
                postAlarmTime = cams.Cameras[cam].PostEventTime;
        }
        
        return postAlarmTime;
    }
}