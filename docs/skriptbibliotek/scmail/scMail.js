
    //***********************************************//
    // The purpose of this script library
    // is to send an E-mail containing all
    // currently active alarms in the system.
    // Version 1.1 (2022-11-09)
    // Copyright © 2022 Kentima AB. No rights reserved.
    //***********************************************//
    
try
{    
    //Initialize variables
    var MAILNAME              = "Mail1";                                                  // Name of the Email you want to use, this has to be created and can be found in the variable browser.
    var SEVERITY              = 10;                                                       // The specific severity you are interested in
    var CHECK_INTERVAL        = 10000;                                                    // How often to check for active alarms, in milliseconds. 10000 = 10 seconds.
    var ACTIVATEDMAILHEADER   = "\n\nThe following alarms have been activated:\n";        // Set header for e-mail body, when alarms are activated.
    var INACTIVATEDMAILHEADER = "\n\nThe following alarms have been inactivated:\n";      // Set header for e-mail body, when alarms are inactivated.
    var ACTIVEMAILHEADER      = "\n\n\n\nThe following alarms are active:\n";             // Set header for e-mail body, when alarms are already active.
    var alarms                = new Array();                                              // Create a list of alarms in the system.
    
    // Check for existance of E-mail '<MAILNAME>'
    if(typeof DataStore[MAILNAME] == "undefined")
    {
        throw new Error("E-Mail '" + MAILNAME + "' is missing from the configuration");
    }
    
    // Check for existance of script library 'scExtensions'
    if(typeof scExtensions == "undefined") 
    {
        throw new Error("Script library 'scExtensions' is missing."); //Script library is missing, we can't continue
    }
    
    // Select ONE of the following options for finding alarms.
    scExtensions.FindAllAlarms(alarms, "", DataStore);                  //Get all alarms available
    //scExtensions.FindAllAlarms(alarms, "", DataStore, SEVERITY);      //Get all alarms available, with a specific severity.

    // Create a cyclic timer for sending e-mails, interval is set in the constant <CHECK_INTERVAL>
    this.timer = new Timer(CHECK_INTERVAL, true);
    
    // On timeout, check if any alarm has been activated
    this.timer.onTimeout = function()
    {
        try
        {
            var activatedMailBody     = ACTIVATEDMAILHEADER; // Set header to mail body
            var activatedAlarmCount   = 0; // Variable to keep track of how many alarms where activated since last check
            var inactivatedMailBody   = INACTIVATEDMAILHEADER; // Set header to mail body
            var inactivatedAlarmCount = 0; // Variable to keep track of how many alarms where inactivated since last check
            var activeMailBody        = ACTIVEMAILHEADER; // Set header to mail body
           
            for(var alarm in alarms)
            {
                // Check if alarm has been activated since last check
                if (alarms[alarm].Alarm && !alarms[alarm].Active)
                {
                    // Add to activated mail body
                    activatedMailBody += "\n" + alarms[alarm].Name; // Add alarm name to mail body.
                    activatedAlarmCount++; // Add 1 to count.
                    //Remove comment below for debugging.
                    //Debug.Print(alarms[alarm].Name + " has been activated");
                }
                else if (!alarms[alarm].Alarm && alarms[alarm].Active)  // Check if alarms has returned to inactive state.
                {
                    // Add to inactivated mail body
                    inactivatedMailBody += "\n" + alarms[alarm].Name; // Add alarm name to mail body.
                    inactivatedAlarmCount++;  // Add 1 to count.   
                    //Remove comment below for debugging.
                    //Debug.Print(alarms[alarm].Name + " is no longer active");
                }

                if (alarms[alarm].Alarm && alarms[alarm].Active)
                {    
                    // Add to active
                    activeMailBody += "\n" + alarms[alarm].Name; // Add alarm name to mail body.
                    //Remove comment below for debugging.
                    //Debug.Print(alarms[alarm].Name + " is active");
                }

                // Remember last state of alarm
                alarms[alarm].Active = Boolean(alarms[alarm].Alarm);    // Force conversion to Boolean value
            }
            
            // If any alarms have been activated, format and send e-mail
            if (activatedAlarmCount > 0)
            {
                DataStore[MAILNAME].Body = activatedMailBody + activeMailBody;  // Add message to body of mail
                DataStore[MAILNAME].Send(); //Execute e-mail Send() function.
            }
            
            // If any alarms have been inactivated, format and send mail
            if (inactivatedAlarmCount > 0)
            {
                DataStore[MAILNAME].Body = inactivatedMailBody + activeMailBody;  //Add message to body of mail
                DataStore[MAILNAME].Send(); //Execute e-mail Send() function.
            }
        }
        catch(e)
        {
            Debug.Print("scMail.timer.onTimeout(): " + e);
        }
    }
}
catch(e)
{
    Debug.Print("scMail: " + e);
}