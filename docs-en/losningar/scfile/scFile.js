
    //***********************************************//
    //  The purpose of this script library
    //  is to add functions for writing 
    //  and reading from a local file.
    // Version 1.0 (2022-06-13)
    // Copyright © 2022 Kentima AB. No rights reserved.
    //***********************************************//

try
{
    //Initialize variables
    var PATH    = "C:/Ethiris/Log/FileName.txt"; //Path to file, folder MUST exist.
    var CREATION = OPEN_ALWAYS; // Value can be CREATE_NEW, CREATE_ALWAYS, OPEN_EXISTING, OPEN_ALWAYS, TRUNCATE_EXISTING
    
    //Define date and time function
    var dateAndTime = function()
    {
        try
        {
            return (new Date()).toString("iso"); //Will return current local date and time in the format 'YYYY-MM-DD HH:mm:ss.zzz'. Format can also be "compact" and "long".
        }
        catch(e)
        {
            Debug.Print("scFile.dateAndTime(): " + e); //Print to Debug Output Panel, if something goes wrong.
        }
    }
    
    //Define write function
    this.writeTo = function(string, path, creation)
    {
        try
        {
            path     = ((path == undefined || path == "") ? PATH : path); //If parameters are empty or not defined, use this.PATH
            creation = ((creation == undefined || creation == "") ? CREATION : creation); //If parameters are empty or not defined, use this.CREATION
            var now  = dateAndTime(); //Get date and time of "now".
            var file = new File(path, creation); //Open file
            file.setFilePointer(FILE_END); //Set file to point at end of file, value can be FILE_BEGIN, FILE_END, FILE_END
            file.write(now + " - " + string + "\r\n"); //Write date(now), data(string) and add carriage return and new line(\r\n)
            file.close(); //Close the file.
        }
        catch(e)
        {
            Debug.Print("scFile.writeTo(): " + e); //Print to Debug Output Panel, if something goes wrong.
        }
    }
    
    //Define read function
    this.readFrom = function(path)
    {
        try
        {
            path         = ((path == undefined || path == "") ? PATH : path); //If parameters are empty or not defined, use this.PATH
            var file     = new File(path, OPEN_EXISTING); //Open an existing file
            var readData = file.read(); //Read all data from file
            file.close(); //Close file
            
            return readData; //Return the data read from file as String
        }
        catch(e)
        {
            Debug.Print("scFile.readFrom(): " + e); //Print to Debug Output Panel, if something goes wrong.
        }
    }
}
catch(e)
{
    Debug.Print("scFile: " + e); //Print to Debug Output Panel, if something goes wrong.
}