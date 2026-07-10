
    //***********************************************//
    // The purpose of this script library
    // is to save a jpeg image from all
    // or specific cameras, on a specific
    // time interval.
    // Version 1.1 (2022-11-09)
    // Copyright © 2022 Kentima AB. No rights reserved.
    //***********************************************//
    
try
{    
    //Initialize variables
    var INTERVAL     = 60000;                   // Interval in milliseconds, how often should an image be saved to disk. 60000 = 1 minute.
    var PATH        = "C:/Ethiris/Snapshots";   // Path where images will be saved, it MUST exist!
    var cameraArray = new Array();              // An Array object which will contatain Camera objects
    var success;                                // Variable to save success state
    
    //Option 1, add all Camera objects to a CameraCollection object
    for(var camera in Cameras)
    {
        cameraArray.push(Cameras[camera]);
    }
    var cameraCollection = new CameraCollection(cameraArray);
    
    this.getCameraCollection = function()
    {
        return cameraCollection;
    }
    
    // Option 2, add specific Camera objects to a CameraCollection object.
    // this.cameraCollection = new CameraCollection(Camera_1, Camera_2, Camera_3);
    
    // Create Timer object, parameters for the timer are(timeout in milliseconds, cyclic, stopped).
    // In this case the timer will have a 1 minute timeout, run cyclically(auto-restart) and start once it is created.
    this.timer    = new Timer(INTERVAL, true, false);
    this.timer.parent = this; //Add a reference to the script library, to be able to reach objects from onTimeout function.
    this.timer.onTimeout = function()
    {
        try
        {
            // Go through all the cameras in the CameraCollection object, and try to save an image to the path.
            for(var camera in this.parent.getCameraCollection().Cameras)
            {
                // Check if camera is online and streaming video
                if(!this.parent.getCameraCollection().Cameras[camera].CommunicationError && this.parent.getCameraCollection().Cameras[camera].Statistics.AvgBandwidth > 0)
                {
                    success = this.parent.getCameraCollection().Cameras[camera].SaveImage(PATH); // Try to save an image, return value will be true/false depending on if it succeeded or not.
                    Debug.Print("SaveImage for camera: '" + this.parent.getCameraCollection().Cameras[camera].Name + "', " + (success ? "succeeded." : "failed.")); // Print to Debug Output Panel
                }
                else
                {
                    Debug.Print("Camera: '" + this.parent.getCameraCollection().Cameras[camera].Name + "' is offline, can't save an image.");  // Print to Debug Output Panel
                }
            }
        }
        catch(e)
        {
            Debug.Print("scSaveImage.timer.onTimeout(): " + e);
        }
    }
    
    // Create timer to run once, on startup and/or saving the server configuration.
    var runOnce        = new Timer(10000, false);
    runOnce.parent = this;
    runOnce.onTimeout = function()
    {
        this.parent.timer.onTimeout(); // Wait a while for cameras to connect, then run once on startup/save
    }
}
catch(e)
{
    Debug.Print("scSaveImage: " + e);
}