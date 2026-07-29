
//***********************************************//
// The purpose of this script library
// is to collect data from one or more
// Synology NAS and/or HP/Aruba switches
// using SNMP and MIBs' defined by Synology and
// HP/Aruba documentation
// Version 1.3 (2024-03-04)
// Copyright © 2022-2024 Kentima AB. No rights reserved.
//***********************************************//

try
{    
    //SYNOLOGY-SYSTEM-MIB. Get system status Tested on Synology RS1219+
    this.SynologySystemMIB = function (ipAddress, name, poll, interval, port, community)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.SynologySystemMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var port        = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var snmpReader  = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            var propName    = oids[oid].name;
                            var value       = snmpReader.Results[oid]; 
                            var description = oids[oid].description;
                            var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status[snmpReader.Results[oid]] != "undefined") ? oids[oid].status[snmpReader.Results[oid]] : null;
                            data[propName] = 
                            {
                                name: propName,
                                oid: oid,
                                value: value,
                                description: description,
                                status: status
                            }; //Add data to data Object
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.SynologySystemMIB.getData(): " + e); //Catch any Error
                }
            }
            var oids = {} //Store OIDs
            
            var systemStatus = "1.3.6.1.4.1.6574.1.1.0";
            oids[systemStatus] = {};
            oids[systemStatus].name = "systemStatus";
            oids[systemStatus].description = "Synology system status";
            oids[systemStatus].status = ["Not Used(0)", "Normal(1): System is functioning normally", "Failed(2): Volume has crashed"];
            snmpReader.AddOID(systemStatus);
            
            var temperature = "1.3.6.1.4.1.6574.1.2.0";
            oids[temperature] = {};
            oids[temperature].name = "temperature";
            oids[temperature].description = "Synology system temperature (Celsius)";
            snmpReader.AddOID(temperature);
            
            var powerStatus = "1.3.6.1.4.1.6574.1.3.0";
            oids[powerStatus] = {};
            oids[powerStatus].name = "powerStatus";
            oids[powerStatus].description = "Synology power status";
            oids[powerStatus].status = ["Not Used(0)", "Normal(1): All power supplies are functioning normally", "Failed(2): One of the power supplies have failed"];
            snmpReader.AddOID(powerStatus);
            
            var fan             = {};
            fan.systemFanStatus = "1.3.6.1.4.1.6574.1.4.1.0";
            oids[fan.systemFanStatus] = {};
            oids[fan.systemFanStatus].name = "systemFanStatus";
            oids[fan.systemFanStatus].description = "Synology system fan status";
            oids[fan.systemFanStatus].status = ["Not Used(0)", "Normal(1): All internal fans are functioning normally", "Failed(2): One of the internal fans have stopped"];
            snmpReader.AddOID(fan.systemFanStatus);
            
            fan.cpuFanStatus = "1.3.6.1.4.1.6574.1.4.2.0";
            oids[fan.cpuFanStatus] = {};
            oids[fan.cpuFanStatus].name = "cpuFanStatus";
            oids[fan.cpuFanStatus].description = "Synology cpu fan status";
            oids[fan.cpuFanStatus].status = ["Not Used(0)", "Normal(1): All CPU fans functioning normally", "Failed(2): One of the CPU fans have stopped"];
            snmpReader.AddOID(fan.cpuFanStatus);
            
            var dsmInfo       = {};
            dsmInfo.modelName = "1.3.6.1.4.1.6574.1.5.1.0";
            oids[dsmInfo.modelName] = {};
            oids[dsmInfo.modelName].name = "modelName";
            oids[dsmInfo.modelName].description = "The model name of this NAS";
            snmpReader.AddOID(dsmInfo.modelName);
            
            dsmInfo.serialNumber = "1.3.6.1.4.1.6574.1.5.2.0";
            oids[dsmInfo.serialNumber] = {};
            oids[dsmInfo.serialNumber].name = "serialNumber";
            oids[dsmInfo.serialNumber].description = "The serial number of this NAS";
            snmpReader.AddOID(dsmInfo.serialNumber);
            
            dsmInfo.version = "1.3.6.1.4.1.6574.1.5.3.0";
            oids[dsmInfo.version] = {};
            oids[dsmInfo.version].name = "version";
            oids[dsmInfo.version].description = "The version of this DSM";
            snmpReader.AddOID(dsmInfo.version);
            
            dsmInfo.upgradeAvailable = "1.3.6.1.4.1.6574.1.5.4.0";
            oids[dsmInfo.upgradeAvailable] = {};
            oids[dsmInfo.upgradeAvailable].name = "upgradeAvailable";
            oids[dsmInfo.upgradeAvailable].description = "This oid is for checking whether there is a newer version of DSM.";
            oids[dsmInfo.upgradeAvailable].status = ["Not Used(0)", "Available(1): There is version ready for download.", "Unavailable(2): The DSM is latest version.", "Connecting(3): Checking for the latest DSM.", "Disconnected(4): Failed to connect to server.", "Others(5): If DSM is upgrading or downloading, the status will show others."];
            snmpReader.AddOID(dsmInfo.upgradeAvailable);
            
            var systemStats   = {};
            systemStats.ssCpuSystem = "1.3.6.1.4.1.2021.11.10.0";
            oids[systemStats.ssCpuSystem] = {};
            oids[systemStats.ssCpuSystem].name = "ssCpuSystem";
            oids[systemStats.ssCpuSystem].description = "percentages of system CPU time";
            snmpReader.AddOID(systemStats.ssCpuSystem);
            
            var memory               = {};
            memory.memTotalReal = "1.3.6.1.4.1.2021.4.5.0";
            oids[memory.memTotalReal] = {};
            oids[memory.memTotalReal].name = "memTotalReal";
            oids[memory.memTotalReal].description = "Total RAM in machine";
            snmpReader.AddOID(memory.memTotalReal);
            
            memory.memAvailReal = "1.3.6.1.4.1.2021.4.6.0";
            oids[memory.memAvailReal] = {};
            oids[memory.memAvailReal].name = "memAvailReal";
            oids[memory.memAvailReal].description = "Total RAM used";
            snmpReader.AddOID(memory.memAvailReal);
            
            memory.memCached = "1.3.6.1.4.1.2021.4.15.0";
            oids[memory.memCached] = {};
            oids[memory.memCached].name = "memCached";
            oids[memory.memCached].description = "Total Cached Memory";
            snmpReader.AddOID(memory.memCached);
            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.SynologySystemMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.SynologySystemMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes");
        }
        catch (e)
        {
            Debug.Print("scSNMP.SynologySystemMIB: " + e); //Catch error
        }
    }
    
    //SYNOLOGY-DISK-MIB. Get disk status. Tested on Synology RS1219+
    this.SynologyDiskMIB = function (ipAddress, name, disks, poll, interval, port, community)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.SynologySystemMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var disks       = (typeof disks == "undefined" || typeof disks !== "object") ? [1, 2, 3, 4, 5, 6, 7, 8] : disks; //Store disk
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var port        = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var snmpReader  = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init event
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.data = data; //Store data in the event
                event.name = name; //Store name in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener for type 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    for(var disk in diskEntry)
                    data[disk] = {}; //Create object for each disk
                    
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            for(var disk in diskEntry)
                            {
                                var propName    = oids[oid].name;
                                
                                if(diskEntry[disk][propName] != oid) //Only add data for relevant OID
                                    continue; 
                                
                                var value       = snmpReader.Results[oid];
                                var description = oids[oid].description; 
                                var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status[snmpReader.Results[oid]] != "undefined") ? oids[oid].status[snmpReader.Results[oid]] : null;
                                data[disk][propName] = 
                                {
                                    name: propName,
                                    oid: oid,
                                    value: value,
                                    description: description,
                                    status: status
                                }; //Add data to data Object
                            }
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.SynologyDiskMIB.getData(): " + e); //Catch any Error
                }
            }
            
            var oids      = {}; //Create Object to store 'oid' information
            var diskEntry = {}; //Create Object to store 'disk' information
                    
            //Go through all available disks
            for (var disk in disks)
            {
                var d = "Disk " + disks[disk];
                diskEntry[d] = {};
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.2." + (disks[disk] - 1);
                diskEntry[d].diskID = oid;
                oids[oid] = {};
                oids[oid].name = "diskID";
                oids[oid].description = "Synology disk ID (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.3." + (disks[disk] - 1);
                diskEntry[d].diskModel = oid;
                oids[oid] = {};
                oids[oid].name = "diskModel";
                oids[oid].description = "Synology disk model name (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.4." + (disks[disk] - 1);
                diskEntry[d].diskType = oid;
                oids[oid] = {};
                oids[oid].name = "diskType";
                oids[oid].description = "Synology disk type (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.5." + (disks[disk] - 1);
                diskEntry[d].diskStatus = oid;
                oids[oid] = {};
                oids[oid].name = "diskStatus";
                oids[oid].description = "Synology disk status (" + disks[disk] + "): ";
                oids[oid].status = ["Not Used(0)", "Normal(1): The hard disk functions normally.", "Initialized(2): The hard disk has system partition but no data.", "NotInitialized(3):    The hard disk does not have system in system partition.", "SystemPartitionFailed(4): The system partitions on the hard disks are damaged.", "Crashed(5): The hard disk has damaged."];
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.6." + (disks[disk] - 1);
                diskEntry[d].diskTemperature = oid;
                oids[oid] = {};
                oids[oid].name = "diskTemperature";
                oids[oid].description = "Synology disk temperature (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.7." + (disks[disk] - 1);
                diskEntry[d].diskRole = oid;
                oids[oid] = {};
                oids[oid].name = "diskRole";
                oids[oid].description = "Synology disk role (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.8." + (disks[disk] - 1);
                diskEntry[d].diskRetry = oid;
                oids[oid] = {};
                oids[oid].name = "diskRetry";
                oids[oid].description = "Synology disk retry (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.9." + (disks[disk] - 1);
                diskEntry[d].diskBadSector = oid;
                oids[oid] = {};
                oids[oid].name = "diskBadSector";
                oids[oid].description = "Synology disk bad sector (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.10." + (disks[disk] - 1);
                diskEntry[d].diskIdentifyFail = oid;
                oids[oid] = {};
                oids[oid].name = "diskIdentifyFail";
                oids[oid].description = "Synology disk identify fail (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.11." + (disks[disk] - 1);
                diskEntry[d].diskRemainLife = oid;
                oids[oid] = {};
                oids[oid].name = "diskRemainLife";
                oids[oid].description = "The estimated remaining life of disk (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.12." + (disks[disk] - 1);
                diskEntry[d].diskName = oid;
                oids[oid] = {};
                oids[oid].name = "diskName";
                oids[oid].description = "The disk name (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.2.1.1.13." + (disks[disk] - 1);
                diskEntry[d].diskHealthStatus = oid;
                oids[oid] = {};
                oids[oid].name = "diskHealthStatus";
                oids[oid].description = "Synology disk status (" + disks[disk] + "): ";
                oids[oid].status = ["Not Used(0)", "Normal(1): The disk health status is normal.", "Warning(2): The disk health status is warning", "Critical(3): The disk health status is critical.", "Failing(4): The disk health status is failing."];
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.101.1.1.8." + (disks[disk]);
                diskEntry[d].storageIOLA = oid;
                oids[oid] = {};
                oids[oid].name = "storageIOLA";
                oids[oid].description = "The disk load (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.101.1.1.14." + (disks[disk]);
                diskEntry[d].storageIODeviceSerial = oid;
                oids[oid] = {};
                oids[oid].name = "storageIODeviceSerial";
                oids[oid].description = "The disk serial (" + disks[disk] + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.6574.101.1.1.2." + (disks[disk]);
                diskEntry[d].storageIODevice = oid;
                oids[oid] = {};
                oids[oid].name = "storageIODevice";
                oids[oid].description = "The name of the device we are counting/checking";
                snmpReader.AddOID(oid);
            }
            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer       = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent    = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.SynologyDiskMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.SynologyDiskMIB()', name: " + name + ", ipAddress: " + ipAddress + ", disks: " + disks.toString() + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes");
        }
        catch (e)
        {
            Debug.Print("scSNMP.SynologyDiskMIB: " + e); //Catch error
        }
    }
    
    //HH3C-COMMON-SYSTEM-MIB, entityMIB. Get system status. Tested on HPE OfficeConnect 1950 12XGT 4SFP+ Switch
    this.HPSystemMIB = function (ipAddress, name, poll, interval, port, community)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.HPSystemMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var port        = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var snmpReader = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            var propName    = oids[oid].name;
                            var value       = snmpReader.Results[oid]; 
                            var description = oids[oid].description;
                            var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status[snmpReader.Results[oid]] != "undefined") ? oids[oid].status[snmpReader.Results[oid]] : null;
                            data[propName] = 
                            {
                                name: propName,
                                oid: oid,
                                value: value,
                                description: description,
                                status: status
                            }; //Add data to data Object
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.HPSystemMIB.getData(): " + e); //Catch any Error
                }
            }
            var oids = {} //Store OIDs
            
            var hh3cEntityExtCpuUsage = "1.3.6.1.4.1.25506.2.6.1.1.1.1.6.212";
            oids[hh3cEntityExtCpuUsage] = {};
            oids[hh3cEntityExtCpuUsage].name = "hh3cEntityExtCpuUsage";
            oids[hh3cEntityExtCpuUsage].description = "The CPU usage for this entity. Generally, the overall CPU usage on the entity is calculated, independent of the number of CPUs on the entity.";
            snmpReader.AddOID(hh3cEntityExtCpuUsage);
            
            var hh3cEntityExtMemUsage = "1.3.6.1.4.1.25506.2.6.1.1.1.1.8.212";
            oids[hh3cEntityExtMemUsage] = {};
            oids[hh3cEntityExtMemUsage].name = "hh3cEntityExtMemUsage";
            oids[hh3cEntityExtMemUsage].description = "The memory usage for the entity. This object indicates what percent of memory are used.";
            snmpReader.AddOID(hh3cEntityExtMemUsage);
            
            var hh3cEntityExtUpTime = "1.3.6.1.4.1.25506.2.6.1.1.1.1.11.2";
            oids[hh3cEntityExtUpTime] = {};
            oids[hh3cEntityExtUpTime].name = "hh3cEntityExtUpTime";
            oids[hh3cEntityExtUpTime].description = "The uptime for the entity. The meaning of uptime is when the entity is up, and the value of the object will add 1 seconds while the entity is running.";
            snmpReader.AddOID(hh3cEntityExtUpTime);
            
            var hh3cEntityExtManuSerialNum = "1.3.6.1.4.1.25506.2.6.1.2.1.1.2.2";
            oids[hh3cEntityExtManuSerialNum] = {};
            oids[hh3cEntityExtManuSerialNum].name = "hh3cEntityExtManuSerialNum";
            oids[hh3cEntityExtManuSerialNum].description = "Manufacture serial number. The manufacture serial number of the entity such as chassis, module, and so on.  It is got from the device when manufacturing. For low level box-device, the manufacture serial number is the device-number of System Control Board(SCB for short), it is written into the SCB directly; for middle level or high level frame-device, the manufacture serial number is the device-numbers of SCB and Service Board, because the SCB, Service Board and chassis are separate to sale and the device-number of chassis cannot be written into board.";
            snmpReader.AddOID(hh3cEntityExtManuSerialNum);
            
            var entPhysicalHardwareRev = "1.3.6.1.2.1.47.1.1.1.1.8.2";
            oids[entPhysicalHardwareRev] = {};
            oids[entPhysicalHardwareRev].name = "entPhysicalHardwareRev";
            oids[entPhysicalHardwareRev].description = "The vendor-specific hardware revision string for the physical entity.  The preferred value is the hardware revision identifier actually printed on the component itself (if present). Note that if revision information is stored internally in a non-printable (e.g., binary) format, then the agent must convert such information to a printable format, in an implementation-specific manner. If no specific hardware revision string is associated with the physical component, or if this information is unknown to the agent, then this object will contain a zero-length string.";
            snmpReader.AddOID(entPhysicalHardwareRev);
            
            var entPhysicalFirmwareRev = "1.3.6.1.2.1.47.1.1.1.1.9.2";
            oids[entPhysicalFirmwareRev] = {};
            oids[entPhysicalFirmwareRev].name = "entPhysicalFirmwareRev";
            oids[entPhysicalFirmwareRev].description = "The vendor-specific firmware revision string for the physical entity. Note that if revision information is stored internally in a non-printable (e.g., binary) format, then the agent must convert such information to a printable format, in an implementation-specific manner. If no specific firmware programs are associated with the physical component, or if this information is unknown to the agent, then this object will contain a zero-length string.";
            snmpReader.AddOID(entPhysicalFirmwareRev);
            
            var entPhysicalSoftwareRev = "1.3.6.1.2.1.47.1.1.1.1.10.2";
            oids[entPhysicalSoftwareRev] = {};
            oids[entPhysicalSoftwareRev].name = "entPhysicalSoftwareRev";
            oids[entPhysicalSoftwareRev].description = "The vendor-specific software revision string for the physical entity. Note that if revision information is stored internally in a non-printable (e.g., binary) format, then the agent must convert such information to a printable format, in an implementation-specific manner. If no specific software programs are associated with the physical component, or if this information is unknown to the agent, then this object will contain a zero-length string.";
            snmpReader.AddOID(entPhysicalSoftwareRev);
            
            var entPhysicalDescr = "1.3.6.1.2.1.47.1.1.1.1.2.2";
            oids[entPhysicalDescr] = {};
            oids[entPhysicalDescr].name = "entPhysicalDescr";
            oids[entPhysicalDescr].description = "A textual description of physical entity.  This object should contain a string that identifies the manufacturer's name for the physical entity, and should be set to a distinct value for each version or model of the physical entity.";
            snmpReader.AddOID(entPhysicalDescr);
            
            var hh3cEntityExtTemperature = "1.3.6.1.4.1.25506.2.6.1.1.1.1.12.212";
            oids[hh3cEntityExtTemperature] = {};
            oids[hh3cEntityExtTemperature].name = "hh3cEntityExtTemperature";
            oids[hh3cEntityExtTemperature].description = "The temperature for the entity.";
            snmpReader.AddOID(hh3cEntityExtTemperature);
            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.HPSystemMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.HPSystemMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes");
        }
        catch (e)
        {
            Debug.Print("scSNMP.HPSystemMIB: " + e); //Catch error
        }
    }
    
    //ifMIB. Get different kinds of port status. Tested on HPE OfficeConnect 1950 12XGT 4SFP+ Switch
    this.HPPortMIB = function (ipAddress, name, poll, interval, port, community, ports)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.HPPortMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var port        = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var ports       = (typeof ports == "undefined" || typeof ports !== "object") ? [1,2,3,4] : ports; //Number of ports to monitor
            var snmpReader  = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    for(var port in portEntry)
                        data[port] = {}; //Create object for each port
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            for(var port in portEntry)
                            {
                                var propName    = oids[oid].name;
                                
                                if(portEntry[port][propName] != oid) //Only add data for relevant OID
                                    continue; 
                                
                                var value       = snmpReader.Results[oid];
                                var description = oids[oid].description; 
                                var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status[snmpReader.Results[oid]] != "undefined") ? oids[oid].status[snmpReader.Results[oid]] : null;
                                data[port][propName] = 
                                {
                                    name: propName,
                                    oid: oid,
                                    value: value,
                                    description: description,
                                    status: status
                                }; //Add data to data Object
                            }
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.HPPortMIB.getData(): " + e); //Catch any Error
                }
            }
            var oids = {} //Store OIDs
            
            var portEntry = {}; //Create Object to store 'port' information
                    
            //Go through all available disks
            for (var port in ports)
            {
                var p = "Port " + ports[port];
                portEntry[p] = {};
                
                var oid = "1.3.6.1.2.1.10.7.2.1.19." + (ports[port]);
                portEntry[p].dot3StatsDuplexStatus = oid;
                oids[oid] = {};
                oids[oid].name = "dot3StatsDuplexStatus";
                oids[oid].description = "The current mode of operation of the MAC entity. 'unknown' indicates that the current duplex mode could not be determined. (" + p + "): ";
                oids[oid].status = ["not used(0)", "unknown(1)", "halfDuplex(2)", "fullDuplex(3)"];
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.2.1.2.2.1.5." + (ports[port]);
                portEntry[p].ifSpeed = oid;
                oids[oid] = {};
                oids[oid].name = "ifSpeed";
                oids[oid].description = "An estimate of the interface's current bandwidth in bits per second. For interfaces which do not vary in bandwidth or for those where no accurate estimation can be made, this object should contain the nominal bandwidth. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.2.1.31.1.1.1.15." + (ports[port]);
                portEntry[p].ifHighSpeed = oid;
                oids[oid] = {};
                oids[oid].name = "ifHighSpeed";
                oids[oid].description = "An estimate of the interface's current bandwidth in units of 1,000,000 bits per second. If this object reports a value of `n' then the speed of the interface is somewhere in the range of `n-500,000' to `n+499,999'. For interfaces which do not vary in bandwidth or for those where no accurate estimation can be made, this object should contain the nominal bandwidth. For a sub-layer which has no concept of bandwidth, this object should be zero. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.25506.2.40.2.1.2.1.1.1." + (ports[port]);
                portEntry[p].hh3cIfStatFlowInterval = oid;
                oids[oid] = {};
                oids[oid].name = "hh3cIfStatFlowInterval";
                oids[oid].description = "Sampling interval(s) for in/out flow of interface. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.25506.2.40.2.1.2.1.1.2." + (ports[port]);
                portEntry[p].hh3cIfStatFlowInBits = oid;
                oids[oid] = {};
                oids[oid].name = "hh3cIfStatFlowInBits";
                oids[oid].description = "Flow in bits in the specific interval. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.25506.2.40.2.1.2.1.1.3." + (ports[port]);
                portEntry[p].hh3cIfStatFlowOutBits = oid;
                oids[oid] = {};
                oids[oid].name = "hh3cIfStatFlowOutBits";
                oids[oid].description = "Flow out bits in the specific interval. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.25506.2.40.2.1.2.1.1.6." + (ports[port]);
                portEntry[p].hh3cIfStatFlowInBytes = oid;
                oids[oid] = {};
                oids[oid].name = "hh3cIfStatFlowInBytes";
                oids[oid].description = "Flow in bytes in the specific interval. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.25506.2.40.2.1.2.1.1.7." + (ports[port]);
                portEntry[p].hh3cIfStatFlowOutBytes = oid;
                oids[oid] = {};
                oids[oid].name = "hh3cIfStatFlowOutBytes";
                oids[oid].description = "Flow out bytes in the specific interval. (" + p + "): ";
                snmpReader.AddOID(oid);
            }

            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.HPPortMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.HPPortMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes");
        }
        catch (e)
        {
            Debug.Print("scSNMP.HPPortMIB: " + e); //Catch error
        }
    }
    
    //HH3C-ENTITY-MIB. Get fan status. Tested on HPE OfficeConnect 1950 12XGT 4SFP+ Switch
    this.HPFanMIB = function (ipAddress, name, fans, poll, interval, port, community)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.HPFanMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var fans        = (typeof fans == "undefined" || typeof fans !== "object") ? [1, 2] : fans; //Store fans
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var port        = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var snmpReader = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    for(var fan in fanEntry)
                    data[fan] = {}; //Create object for each disk
                    
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            for(var fan in fanEntry)
                            {
                                var propName    = oids[oid].name;
                                
                                if(fanEntry[fan][propName] != oid) //Only add data for relevant OID
                                    continue; 
                                
                                var value       = snmpReader.Results[oid];
                                var description = oids[oid].description;
                                var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status["_" + snmpReader.Results[oid]] != "undefined") ? oids[oid].status["_" + snmpReader.Results[oid]] : null;
                                data[fan][propName] = 
                                {
                                    name: propName,
                                    oid: oid,
                                    value: value,
                                    description: description,
                                    status: status
                                }; //Add data to data Object
                            }
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.HPFanMIB.getData(): " + e); //Catch any Error
                }
            }           
            
            var oids      = {}; //Create Object to store 'oid' information
            var fanEntry = {}; //Create Object to store 'fan' information
                    
            //Go through all available disks
            for (var fan in fans)
            {
                var f = "Fan " + fans[fan];
                fanEntry[f] = {};
                
                var oid = "1.3.6.1.4.1.25506.2.6.1.1.1.1.3." + (fans[fan] + 215);
                fanEntry[f].operStatus = oid;
                oids[oid] = {};
                oids[oid].name = "operStatus"; //"hh3cEntityExtOperStatus";
                oids[oid].description = "HP fan operating status (" + fans[fan] + "): ";
                oids[oid].status = {_1:f + ": Not Supported(1)",_2:f + ": Disabled(2)",_3:f + ": Enabled(3)",_4:f + ": Dangerous(4)"};
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.25506.2.6.1.1.1.1.19." + (fans[fan] + 215);
                fanEntry[f].errorStatus = oid;
                oids[oid] = {};
                oids[oid].name = "errorStatus"; //"hh3cEntityExtErrorStatus";
                oids[oid].description = "HP fan error status (" + fans[fan] + "): ";
                oids[oid].status = {_1:f + ": Not supported(1)",_2:f + ": Normal(2)",_3:f + ": Post failure(3)",_4:f + ": Entity absent(4)",_41:f + ": Fan error(41)"};
                snmpReader.AddOID(oid);
            }
            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.HPFanMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.HPFanMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes, Fans: " + fans.toString());
        }
        catch (e)
        {
            Debug.Print("scSNMP.HPFanMIB: " + e); //Catch error
        }
    }
    
    //HPE-Physicaldescription-MIB, HPE-rndMng, rfc1213-mib, power-ethernet-mib. Get system status. Tested on Aruba Instant On 1930 24G Class4 PoE 4SFP/SFP+ 195W Switch JL683B
    this.ArubaSystemMIB = function (ipAddress, name, poll, interval, port, community)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.ArubaSystemMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var port        = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var snmpReader = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            var propName    = oids[oid].name;
                            var value       = snmpReader.Results[oid]; 
                            var description = oids[oid].description;
                            var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status["_" + snmpReader.Results[oid]] != "undefined") ? oids[oid].status["_" + snmpReader.Results[oid]] : null;
                            data[propName] = 
                            {
                                name: propName,
                                oid: oid,
                                value: value,
                                description: description,
                                status: status
                            }; //Add data to data Object
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.HPSystemMIB.getData(): " + e); //Catch any Error
                }
            }
            var oids = {} //Store OIDs
            
            var rlPhdUnitEnvParamTempSensorValue = "1.3.6.1.4.1.11.2.53.15.1.10.1";
            oids[rlPhdUnitEnvParamTempSensorValue] = {};
            oids[rlPhdUnitEnvParamTempSensorValue].name = "rlPhdUnitEnvParamTempSensorValue";
            oids[rlPhdUnitEnvParamTempSensorValue].description = "Current value for the Sensor being instrumented.";
            snmpReader.AddOID(rlPhdUnitEnvParamTempSensorValue);

            var rlPhdUnitEnvParamTempSensorStatus = "1.3.6.1.4.1.11.2.53.15.1.11.1";
            oids[rlPhdUnitEnvParamTempSensorStatus] = {};
            oids[rlPhdUnitEnvParamTempSensorStatus].name = "rlPhdUnitEnvParamTempSensorStatus";
            oids[rlPhdUnitEnvParamTempSensorStatus].description = "Status value for the Sensor being instrumented.";
            oids[rlPhdUnitEnvParamTempSensorStatus].status = {_1:"Ok(1)", _2:"Unavailable(2)", _3:"Non-operational(3)"};
            snmpReader.AddOID(rlPhdUnitEnvParamTempSensorStatus);

            var rlPhdUnitEnvParamMonitorTemperatureStatus = "1.3.6.1.4.1.11.2.53.15.1.16.1";
            oids[rlPhdUnitEnvParamMonitorTemperatureStatus] = {};
            oids[rlPhdUnitEnvParamMonitorTemperatureStatus].name = "rlPhdUnitEnvParamMonitorTemperatureStatus";
            oids[rlPhdUnitEnvParamMonitorTemperatureStatus].description = "Display environment monitoring chassis temperature status";
            oids[rlPhdUnitEnvParamMonitorTemperatureStatus].status = {_1:"Ok(1)", _2:"Over temperature threshold(2)", _3:"Over critical temperature threshold(3)"};
            snmpReader.AddOID(rlPhdUnitEnvParamMonitorTemperatureStatus);
            
            var rlCpuUtilDuringLastSecond = "1.3.6.1.4.1.11.2.1.7.0";
            oids[rlCpuUtilDuringLastSecond] = {};
            oids[rlCpuUtilDuringLastSecond].name = "rlCpuUtilDuringLastSecond";
            oids[rlCpuUtilDuringLastSecond].description = "Percentage of the device CPU utilization during last second. The value 101 is a dummy value, indicating that the CPU utilization was not measured (since measurement is disabled or was disabled during last second).";
            snmpReader.AddOID(rlCpuUtilDuringLastSecond);
            
            var rlCpuUtilDuringLastMinute = "1.3.6.1.4.1.11.2.1.8.0";
            oids[rlCpuUtilDuringLastMinute] = {};
            oids[rlCpuUtilDuringLastMinute].name = "rlCpuUtilDuringLastMinute";
            oids[rlCpuUtilDuringLastMinute].description = "Percentage of the device CPU utilization during last minute. The value 101 is a dummy value, indicating that the CPU utilization was not measured (since measurement is disabled or was disabled during last minute).";
            snmpReader.AddOID(rlCpuUtilDuringLastMinute);
            
            var rlCpuUtilDuringLast5Minutes = "1.3.6.1.4.1.11.2.1.9.0";
            oids[rlCpuUtilDuringLast5Minutes] = {};
            oids[rlCpuUtilDuringLast5Minutes].name = "rlCpuUtilDuringLast5Minutes";
            oids[rlCpuUtilDuringLast5Minutes].description = "Percentage of the device CPU utilization during the last 5 minutes. The value 101 is a dummy value, indicating that the CPU utilization was not measured (since measurement is disabled or was disabled during last 5 minutes).";
            snmpReader.AddOID(rlCpuUtilDuringLast5Minutes);
            
            var rlPhdUnitGenParamModelName = "1.3.6.1.4.1.11.2.53.14.1.11.1";
            oids[rlPhdUnitGenParamModelName] = {};
            oids[rlPhdUnitGenParamModelName].name = "rlPhdUnitGenParamModelName";
            oids[rlPhdUnitGenParamModelName].description = "Model name.";
            snmpReader.AddOID(rlPhdUnitGenParamModelName);
            
            var rlPhdUnitGenParamSoftwareVersion = "1.3.6.1.4.1.11.2.53.14.1.2.1";
            oids[rlPhdUnitGenParamSoftwareVersion] = {};
            oids[rlPhdUnitGenParamSoftwareVersion].name = "rlPhdUnitGenParamSoftwareVersion";
            oids[rlPhdUnitGenParamSoftwareVersion].description = "Software version.";
            snmpReader.AddOID(rlPhdUnitGenParamSoftwareVersion);
            
            var rlPhdUnitGenParamSerialNum = "1.3.6.1.4.1.11.2.53.14.1.5.1";
            oids[rlPhdUnitGenParamSerialNum] = {};
            oids[rlPhdUnitGenParamSerialNum].name = "rlPhdUnitGenParamSerialNum";
            oids[rlPhdUnitGenParamSerialNum].description = "Serial number.";
            snmpReader.AddOID(rlPhdUnitGenParamSerialNum);
            
            var sysUpTime = "1.3.6.1.2.1.1.3.0";
            oids[sysUpTime] = {};
            oids[sysUpTime].name = "sysUpTime";
            oids[sysUpTime].description = "The time (in hundredths of a second) since the network management portion of the system was last re-initialized.";
            snmpReader.AddOID(sysUpTime);
            
            var sysDescr = "1.3.6.1.2.1.1.1.0";
            oids[sysDescr] = {};
            oids[sysDescr].name = "sysDescr";
            oids[sysDescr].description = "The time (in hundredths of a second) since the network management portion of the system was last re-initialized.";
            snmpReader.AddOID(sysDescr);
            
            var pethMainPsePower = "1.3.6.1.2.1.105.1.3.1.1.2.1";
            oids[pethMainPsePower] = {};
            oids[pethMainPsePower].name = "pethMainPsePower";
            oids[pethMainPsePower].description = "The nominal power of the PSE expressed in Watts.";
            snmpReader.AddOID(pethMainPsePower);
            
            var pethMainPseOperStatus = "1.3.6.1.2.1.105.1.3.1.1.3.1";
            oids[pethMainPseOperStatus] = {};
            oids[pethMainPseOperStatus].name = "pethMainPseOperStatus";
            oids[pethMainPseOperStatus].description = "The operational status of the main PSE.";
            oids[pethMainPseOperStatus].status = {_1:"On(1)", _2:"Off(2)", _3:"Faulty(3)"};
            snmpReader.AddOID(pethMainPseOperStatus);
            
            var pethMainPseConsumptionPower = "1.3.6.1.2.1.105.1.3.1.1.4.1";
            oids[pethMainPseConsumptionPower] = {};
            oids[pethMainPseConsumptionPower].name = "pethMainPseConsumptionPower";
            oids[pethMainPseConsumptionPower].description = "Measured usage power expressed in Watts.";
            snmpReader.AddOID(pethMainPseConsumptionPower);
            
            var pethMainPseUsageThreshold = "1.3.6.1.2.1.105.1.3.1.1.5.1";
            oids[pethMainPseUsageThreshold] = {};
            oids[pethMainPseUsageThreshold].name = "pethMainPseUsageThreshold";
            oids[pethMainPseUsageThreshold].description = "The usage threshold expressed in percents for comparing the measured power and initiating an alarm if the threshold is exceeded.";
            snmpReader.AddOID(pethMainPseUsageThreshold);

            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.ArubaSystemMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.ArubaSystemMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes");
        }
        catch (e)
        {
            Debug.Print("scSNMP.ArubaSystemMIB: " + e); //Catch error
        }
    }
    
    //HPE-Physicaldescription-MIB. Get fan status. Tested on Aruba Instant On 1930 24G Class4 PoE 4SFP/SFP+ 195W Switch JL683B
    this.ArubaFanMIB = function (ipAddress, name, fans, poll, interval, port, community)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.ArubaFanMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var fans        = (typeof fans == "undefined" || typeof fans !== "object") ? [1, 2] : fans; //Store fans
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var port        = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var snmpReader = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    for(var fan in fanEntry)
                        data[fan] = {}; //Create object for each fan
                    
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            for(var fan in fanEntry)
                            {
                                var propName    = oids[oid].name;
                                
                                if(fanEntry[fan][propName] != oid) //Only add data for relevant OID
                                    continue; 
                                
                                var value       = snmpReader.Results[oid];
                                var description = oids[oid].description;
                                var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status["_" + snmpReader.Results[oid]] != "undefined") ? oids[oid].status["_" + snmpReader.Results[oid]] : null;
                                data[fan][propName] = 
                                {
                                    name: propName,
                                    oid: oid,
                                    value: value,
                                    description: description,
                                    status: status
                                }; //Add data to data Object
                            }
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.ArubaFanMIB.getData(): " + e); //Catch any Error
                }
            }           
            
            var oids      = {}; //Create Object to store 'oid' information
            var fanEntry = {}; //Create Object to store 'fan' information
                    
            //Go through all available disks
            for (var fan in fans)
            {
                var f = "Fan " + fans[fan];
                fanEntry[f] = {};
                
                var index = Number(fans[fan]) + 3; //Fan 1 == 4
                var oid = "1.3.6.1.4.1.11.2.53.15.1." + index + ".1";
                fanEntry[f].fanStatus = oid;
                oids[oid] = {};
                oids[oid].status = {};
                oids[oid].name = "fanStatus"; //"rlPhdUnitEnvParamFanXStatus";
                oids[oid].description = "Aruba fan operating status (" + fans[fan] + "): ";
                oids[oid].status = {_1:"Normal(1)",_2:"Warning(2)",_3:"Critical(3)",_4:"Shutdown(4)",_5:"Not present(5)",_6:"Not functioning(6)",_7:"Not available(7)",_8:"Backing up(8)",_9:"Reading failed(9)"};
                snmpReader.AddOID(oid);
                
                var index = Number(fans[fan]) + 17; //Fan 1 == 18
                var oid = "1.3.6.1.4.1.11.2.53.15.1." + index + ".1";
                fanEntry[f].fanSpeed = oid;
                oids[oid] = {};
                oids[oid].status = {};
                oids[oid].name = "fanSpeed"; //"rlPhdUnitEnvParamFanXSpeed";
                oids[oid].description = "Aruba fan speed (" + fans[fan] + "): ";
                snmpReader.AddOID(oid);
            }
            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.ArubaFanMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.ArubaFanMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes, Fans: " + fans.toString());
        }
        catch (e)
        {
            Debug.Print("scSNMP.ArubaFanMIB: " + e); //Catch error
        }
    }
    
    //rfc2233, IF-MIB. Get different kinds of port status. Tested on 
    this.ArubaPortMIB = function (ipAddress, name, poll, interval, port, community, ports)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.ArubaPortMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var sPort       = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var ports       = (typeof ports == "undefined" || typeof ports !== "object") ? [1,2,3,4] : ports; //Number of ports to monitor
            var snmpReader  = new SNMPReader(ipAddress, sPort, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    for(var port in portEntry)
                        data[port] = {}; //Create object for each port
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            for(var port in portEntry)
                            {
                                var propName    = oids[oid].name;
                                
                                if(portEntry[port][propName] != oid) //Only add data for relevant OID
                                    continue; 
                                
                                var value       = snmpReader.Results[oid];
                                var description = oids[oid].description; 
                                var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status["_" + snmpReader.Results[oid]] != "undefined") ? oids[oid].status["_" + snmpReader.Results[oid]] : null;
                                data[port][propName] = 
                                {
                                    name: propName,
                                    oid: oid,
                                    value: value,
                                    description: description,
                                    status: status
                                }; //Add data to data Object
                            }
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.ArubaPortMIB.getData(): " + e); //Catch any Error
                }
            }
            var oids = {} //Store OIDs
            
            var portEntry = {}; //Create Object to store 'port' information
                    
            //Go through all available disks
            for (var port in ports)
            {
                var p = "Port " + ports[port];
                portEntry[p] = {};
                
                var oid = "1.3.6.1.2.1.10.7.2.1.19." + (ports[port]);
                portEntry[p].dot3StatsDuplexStatus = oid;
                oids[oid] = {};
                oids[oid].name = "dot3StatsDuplexStatus";
                oids[oid].description = "The current mode of operation of the MAC entity. 'unknown' indicates that the current duplex mode could not be determined. (" + p + "): ";
                oids[oid].status = { _1:"unknown(1)", _2:"halfDuplex(2)", _3:"fullDuplex(3)" };
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.2.1.31.1.1.1.15." + (ports[port]);
                portEntry[p].ifHighSpeed = oid;
                oids[oid] = {};
                oids[oid].name = "ifHighSpeed";
                oids[oid].description = "An estimate of the interface's current bandwidth in units of 1,000,000 bits per second. If this object reports a value of `n' then the speed of the interface is somewhere in the range of `n-500,000' to `n+499,999'. For interfaces which do not vary in bandwidth or for those where no accurate estimation can be made, this object should contain the nominal bandwidth. For a sub-layer which has no concept of bandwidth, this object should be zero. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.2.1.2.2.1.7." + (ports[port]);
                portEntry[p].ifAdminStatus = oid;
                oids[oid] = {};
                oids[oid].name = "ifAdminStatus";
                oids[oid].description = "The desired state of the interface. The testing(3) state indicates that no operational packets can be passed.  When a managed system initializes, all interfaces start with ifAdminStatus in the down(2) state.  As a result of either explicit management action or per configuration information retained by the managed system, ifAdminStatus is then changed to either the up(1) or testing(3) states (or remains in the down(2) state). (" + p + "): ";
                oids[oid].status = { _1:"Up(1)", _2:"Down(2)", _3:"Testing(3)"};
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.2.1.2.2.1.8." + (ports[port]);
                portEntry[p].ifOperStatus = oid;
                oids[oid] = {};
                oids[oid].name = "ifOperStatus";
                oids[oid].description = "The current operational state of the interface. The testing(3) state indicates that no operational packets can be passed.";
                oids[oid].status = { _1:"Up(1)", _2:"Down(2)", _3:"Testing(3)"};
                snmpReader.AddOID(oid);

                //ifHCInOctets
                //ifHCOutOctets
            }

            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.ArubaPortMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.ArubaPortMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + sPort + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes");
        }
        catch (e)
        {
            Debug.Print("scSNMP.ArubaPortMIB: " + e); //Catch error
        }
    }            
    
    //HPE-POE. Get different kinds of port status. Tested on 
    this.ArubaPoeMIB = function (ipAddress, name, poll, interval, port, community, ports)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.ArubaPoeMIB: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress   = ipAddress; //Store IP address
            var name        = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var poll        = (typeof poll == "undefined" || typeof poll !== "boolean") ? true : poll; //Store poll status
            var interval    = (typeof interval == "undefined" || typeof interval !== "number") ? (60000 * 60) : interval; //Store interval(how often to poll)
            var sPort       = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store Port number
            var community   = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //store community
            var ports       = (typeof ports == "undefined" || typeof ports !== "object") ? [1,2,3,4] : ports; //Number of ports to monitor
            var snmpReader  = new SNMPReader(ipAddress, sPort, community); //Create new SNMPReader object
            var eventTarget = new EventTarget(); //Create an EventTarget
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            //Define function to send an Event
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, data)
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event, (type, canBubble, cancelable)
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.data = data; //Store data in the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event); //Send event
                else
                    throw new Error("Event listener 'DataAvailable' is missing"); //Throw an Error if Event listener 'DataAvailable' is missing
            }
            
            //Define function to get new data
            this.getData = function ()
            {
                try
                {
                    var data = {}; //Create new Struct object
                    for(var port in portEntry)
                        data[port] = {}; //Create object for each port
                    snmpReader.Get(); //Get new data from SNMPReader object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        for (var oid in snmpReader.Results) //Iterate Results
                        {
                            for(var port in portEntry)
                            {
                                var propName    = oids[oid].name;
                                
                                if(portEntry[port][propName] != oid) //Only add data for relevant OID
                                    continue; 
                                
                                var value       = snmpReader.Results[oid];
                                var description = oids[oid].description; 
                                var status      = (typeof oids[oid].status != "undefined" && typeof oids[oid].status["_" + snmpReader.Results[oid]] != "undefined") ? oids[oid].status["_" + snmpReader.Results[oid]] : null;
                                data[port][propName] = 
                                {
                                    name: propName,
                                    oid: oid,
                                    value: value,
                                    description: description,
                                    status: status
                                }; //Add data to data Object
                            }
                        }
                        sendEvent(false, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget, data); //Execute sendEvent() function
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error status, if Results Object is empty
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.ArubaPoeMIB.getData(): " + e); //Catch any Error
                }
            }
            var oids = {} //Store OIDs
            
            var portEntry = {}; //Create Object to store 'port' information
                    
            //Go through all available ports
            for (var port in ports)
            {
                var p = "Port " + ports[port];
                portEntry[p] = {};
                
                var oid = "1.3.6.1.4.1.11.2.108.1.1.3.1." + (ports[port]);
                portEntry[p].rlPethPsePortOutputVoltage = oid;
                oids[oid] = {};
                oids[oid].name = "rlPethPsePortOutputVoltage";
                oids[oid].description = "This variable indicates on the output voltage level in millivolts from rlPethPsePortIndex. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.11.2.108.1.1.4.1." + (ports[port]);
                portEntry[p].rlPethPsePortOutputCurrent = oid;
                oids[oid] = {};
                oids[oid].name = "rlPethPsePortOutputCurrent";
                oids[oid].description = "This variable indicates on the output current level in milliampere from rlPethPsePortIndex. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.11.2.108.1.1.5.1." + (ports[port]);
                portEntry[p].rlPethPsePortOutputPower = oid;
                oids[oid] = {};
                oids[oid].name = "rlPethPsePortOutputPower";
                oids[oid].description = "This variable indicates on the output power level in milliwatts from rlPethPsePortIndex. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.11.2.108.1.1.6.1." + (ports[port]);
                portEntry[p].rlPethPsePortPowerLimit = oid;
                oids[oid] = {};
                oids[oid].name = "rlPethPsePortPowerLimit";
                oids[oid].description = "This variable indicates on the user configured power level in milli watts which is available from rlPethPsePortIndex. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.11.2.108.1.1.8.1." + (ports[port]);
                portEntry[p].rlPethPsePortStatusDescription = oid;
                oids[oid] = {};
                oids[oid].name = "rlPethPsePortStatusDescription";
                oids[oid].description = "This variable indicates the description of the hardware status of rlPethPsePortIndex. (" + p + "): ";
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.11.2.108.1.1.11.1." + (ports[port]);
                portEntry[p].rlPethPsePortOperStatus = oid;
                oids[oid] = {};
                oids[oid].name = "rlPethPsePortOperStatus";
                oids[oid].description = "This Read-Only variable indicates PoE port current status affected by time range active/inactive and admin status. (" + p + "): ";
                oids[oid].status = {_1:"True(1)",_2:"False(2)"};
                snmpReader.AddOID(oid);
                
                var oid = "1.3.6.1.4.1.11.2.108.1.1.14.1." + (ports[port]);
                portEntry[p].rlPethPsePortLinkPartnerPoeType = oid;
                oids[oid] = {};
                oids[oid].name = "rlPethPsePortLinkPartnerPoeType";
                oids[oid].description = "This variable indicates the link partner PoE type. (" + p + "): ";
                oids[oid].status = {_1:"None(1)",_2:"Poe(2)",_3:"Poe plus(3)",_4:"Poe 60w(4)",_5:"Poe BT type 3(5)",_6:"Poe BT type 4(6)"};
                snmpReader.AddOID(oid);
            }

            
            //Create timer if 'poll' is 'true'
            if (poll)
            {
                var timer = new Timer(1000, false); //Run once on startup, after 1 second timeout
                timer.parent = this; //Create reference to this object for access from timer object
                timer.onTimeout = function ()
                {
                    try
                    {
                        this.parent.getData(); //Execute getData() function
                        this.start(this.parent.getInterval()); //Restart timer object
                    }
                    catch (e)
                    {
                        Debug.Print("scSNMP.ArubaPoeMIB.timer.onTimeout: " + e); //Catch error
                    }
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.ArubaPoeMIB()', name: " + name + ", ipAddress: " + ipAddress + ", port: " + sPort + ", community: " + community + ", interval: " + interval / 1000 / 60 + " minutes");
        }
        catch (e)
        {
            Debug.Print("scSNMP.ArubaPoeMIB: " + e); //Catch error
        }
    }
            
    //Event driven system temperature check. Function will fire an event which can be processed in the main script.
    this.SynologySystemTemperatureCheck = function (ipAddress, limit, name, port, community, interval)
    {
        try
        {
            if (typeof ipAddress == "undefined" || ipAddress == "")
                throw new Error("scSNMP.SynologySystemTemperatureCheck: parameter ipAddress is missing"); //Throw an Error if ip address is missing
            
            var ipAddress = ipAddress; //Store IP address
            var limit = (typeof limit == "undefined" || typeof limit !== "number") ? 50 : limit; //Store limit
            var name = (typeof name == "undefined" || typeof name !== "string" || name == "") ? "<NONAME>" : name; //Store name
            var port = (typeof port == "undefined" || typeof port !== "number") ? 161 : port; //Store poll
            var community = (typeof community == "undefined" || typeof community !== "string" || community == "") ? "public" : community; //Store community
            var interval = (typeof interval == "undefined" || typeof interval !== "number") ? 10000 : interval; //Store interval(how often to poll)
            var OID = "1.3.6.1.4.1.6574.1.2.0";
            var snmpReader = new SNMPReader(ipAddress, port, community); //Create new SNMPReader object
            snmpReader.AddOID(OID); //Add system temperature oid
            var aboveEdge = false; //Variable to to keep track of positive/negative change
            var belowEdge = false; //Variable to to keep track of positive/negative change
            var eventTarget = new EventTarget(); //Create an EventTarget object
            
            //Get interval
            this.getInterval = function ()
            {
                return interval;
            }
            
            //Get EventTarget
            this.getEventTarget = function ()
            {
                return eventTarget;
            }
            
            var sendEvent = function (error, errorCode, errorMessage, name, eventTarget, limit, isAboveLimit, isBelowLimit, temp) //Define function to send an Event
            {
                var event = new Event(); //Create new Event object
                event.initEvent("DataAvailable", true, true); //Init Event
                
                event.error = error; //Store error in the event
                event.errorCode = errorCode; //Store errorCode in the event
                event.errorMessage = errorMessage; //Store errorMessage in the event
                event.name = name; //Store name in the event
                event.limit = limit; //Store limit in the event
                event.isAboveLimit = isAboveLimit; //Store above limit status in the event
                event.isBelowLimit = isBelowLimit; //Store below limit status in the event
                event.currentTemperature = temp; //Store currentTemperature
                event.text = "System temperature for '" + name + "' is " + (isAboveLimit ? "above" : "below or equal to") + " limit '" + limit + "C', current temperature: " + temp + "C"; //Add optional text to the event
                
                if (eventTarget.willTrigger("DataAvailable")) //Check if 'onDataAvailable()' function has been defined in the main script
                    eventTarget.dispatchEvent(event);
                else
                    throw new Error("Event listener 'DataAvailable' is missing");
            }
            
            //Function to get new data
            this.getData = function ()
            {
                try
                {
                    snmpReader.Get(); //Create new Struct object
                    if (snmpReader.Results.length != 0) //Check if Results is not empty
                    {
                        var temp = snmpReader.Results[OID]; //Get current system temperature
                        var isAboveLimit = temp > limit; //Check if temperature is above limit
                        var isBelowLimit = temp <= limit; //Check if temperature is below or equals to limit
                        if ((isAboveLimit && !aboveEdge) || (isBelowLimit && !belowEdge)) //Check if temperature is above/below the limit at the same time as it was not above/below the limit on last timeout
                        {
                            sendEvent(false, 0, "", name, eventTarget, limit, isAboveLimit, isBelowLimit, temp); // Send event to EventTarget
                        }
                        else
                        {
                            //Debug.Print("Script running, current system temperature: " + temp + ", limit: " + this.limit); //For debug purposes
                        }
                        aboveEdge = isAboveLimit; //Store state for next interval
                        belowEdge = isBelowLimit; //Store state for next interval
                    }
                    else
                    {
                        sendEvent(true, snmpReader.Error, snmpReader.ErrorMessage, name, eventTarget); //Send error
                    }
                }
                catch (e)
                {
                    Debug.Print("scSNMP.SynologySystemTemperatureCheck.getData(): " + e); //Catch error
                }
            }
            
            //Create timer object to check if limit is above or below limit on timeout
            var timer = new Timer(1000, false);
            timer.parent = this; //Create reference to this object, to be able to access properties from onTimeout function
            timer.onTimeout = function ()
            {
                try
                {
                    this.parent.getData(); //Execute getData() function
                    this.start(this.parent.getInterval()); //Restart timer
                }
                catch (e)
                {
                    Debug.Print("scSNMP.SynologySystemTemperatureCheck.timer.onTimeout(): " + e); //Catch any error from onTimeout function
                }
            }
            
            Debug.Print("Created new instance of object 'scSNMP.SynologySystemTemperatureCheck()', name: " + name + ", ipAddress: " + ipAddress + ", limit: " + limit + ", port: " + port + ", community: " + community + ", interval: " + interval / 1000 + " seconds, OID: " + OID);
        }
        catch (e)
        {
            Debug.Print("scSNMP.SynologySystemTemperatureCheck(): " + e);
        }
    }
}
catch (e)
{
    Debug.Print("scSNMP: " + e);
}

//Main Script
/*
try
{
    var init;
    if(init == undefined)
    {
        init      = true;
        
        var snmp1 = new scSNMP.SynologySystemMIB("192.168.20.70", "EthirisNAS_System");
        snmp1.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print("System: " + event.name + " - " + event.data.systemStatus.status);
                    Debug.Print("System: " + event.name + " - System temp: " + event.data.temperature.value);
                }
                else
                    Debug.Print("snmp1 - System: " + event.name + ", Something went wrong, connection to NAS may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
            }
            catch(e)
            {
                Debug.Print("snmp1.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp1.onDataChange = function()
        //{
        //  if(bSnmp1)
        //      snmp1.getData();
        //}
        
        snmp2 = new scSNMP.SynologyDiskMIB("192.168.20.70", "EthirisNAS_Disks");
        snmp2.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print("System: " + event.name + " - Disk 1 status: " + event.data["Disk 1"].diskStatus.status);
                    Debug.Print("System: " + event.name + " - Disk 1 temperature: " + event.data["Disk 1"].diskTemperature.value + "C");
                }
                else
                    Debug.Print("snmp2 - System: " + event.name + ", Something went wrong, connection to NAS may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
            }
            catch(e)
            {
                Debug.Print("snmp2.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp2.onDataChange = function()
        //{
        //  if(bSnmp2)
        //      snmp2.getData();
        //}
        
        var snmp3 = new scSNMP.SynologySystemTemperatureCheck("192.168.20.70", 40, "EthirisNAS");
        snmp3.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print(event.text);
                }
                else
                {
                    Debug.Print("snmp3 - System: " + event.name + ", Something went wrong, connection to NAS may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp3.getEventTarget().onDataAvailable: " + e);
            }
        }
        
        var snmp4 = new scSNMP.HPSystemMIB("192.168.20.60", "HP1950", true, 60000);
        snmp4.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print("System: " + event.name + " - System CPU usage(%): " + event.data.hh3cEntityExtCpuUsage.value);
                    Debug.Print("System: " + event.name + " - System memory usage(%): " + event.data.hh3cEntityExtMemUsage.value);
                }
                else
                {
                  Debug.Print("snmp4 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp4.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp4.onDataChange = function()
        //{
        //  if(bSnmp4)
        //      snmp4.getData();
        //}
        
        var snmp5 = new scSNMP.HPPortMIB("192.168.20.60", "HP1950 - ports 1-6", true, 60000, 161, "public", [1,2,3,4,5,6]);
        snmp5.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print("System: " + event.name + " - Port 1 bandwidth(Mbits/s): " + event.data["Port 1"].ifHighSpeed.value);
                    Debug.Print("System: " + event.name + " - Port 1 duplex status: " + event.data["Port 1"].dot3StatsDuplexStatus.status);
                }
                else
                {
                    Debug.Print("snmp5 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp5.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp5.onDataChange = function()
        //{
        //  if(bSnmp5)
        //      snmp5.getData();
        //}
        
        var snmp6 = new scSNMP.HPPortMIB("192.168.20.60", "HP1950 - ports 7-12", true, 60000, 161, "public", [7,8,9,10,11,12]);
        snmp6.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print("System: " + event.name + " - Port 12 bandwidth(Mbits/s): " + event.data["Port 12"].ifHighSpeed.value);
                    Debug.Print("System: " + event.name + " - Port 12 duplex status: " + event.data["Port 12"].dot3StatsDuplexStatus.status);
                }
                else
                {
                    Debug.Print("snmp6 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp6.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp6.onDataChange = function()
        //{
        //  if(bSnmp6)
        //      snmp6.getData();
        //}
        
        var snmp7 = new scSNMP.HPPortMIB("192.168.20.60", "HP1950 - ports 13-16", true, 60000, 161, "public", [13,14,15,16]);
        snmp7.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print("System: " + event.name + " - Port 16 bandwidth(Mbits/s): " + event.data["Port 16"].ifHighSpeed.value);
                    Debug.Print("System: " + event.name + " - Port 16 duplex status: " + event.data["Port 16"].dot3StatsDuplexStatus.status);
                }
                else
                {
                    Debug.Print("snmp7 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp7.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp7.onDataChange = function()
        //{
        //  if(bSnmp7)
        //      snmp7.getData();
        //}
    
        var snmp8 = new scSNMP.HPFanMIB("192.168.20.60", "HP1950", [1,2], true, 5000);
        snmp8.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    Debug.Print("System: " + event.name + " - Fan 1 status: " + event.data["Fan 1"].operStatus.status);
                    Debug.Print("System: " + event.name + " - Fan 1 error: " + event.data["Fan 1"].errorStatus.status);
                    Debug.Print("System: " + event.name + " - Fan 2 status: " + event.data["Fan 2"].operStatus.status);
                    Debug.Print("System: " + event.name + " - Fan 2 error: " + event.data["Fan 2"].errorStatus.status);
                }
                else
                {
                    Debug.Print("snmp8 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp8.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp8.onDataChange = function()
        //{
        //  if(bSnmp8)
        //      snmp8.getData();
        //}

        var snmp9 = new scSNMP.ArubaFanMIB("192.168.20.60", "Aruba1930", [1,2], true, 5000);
        snmp9.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    for(var i in event.data)
                    {
                        var index = i.split(' ')[1];
                        Debug.Print(event.name + "FanStatus" + index + ": " + event.data[i].fanStatus.value);
                        Debug.Print(event.name + "FanStatusString" + index + ": " + event.data[i].fanStatus.status);
                        Debug.Print(event.name + "FanSpeed" + index + ": " + event.data[i].fanSpeed.value);
                    }
                }
                else
                {
                    Debug.Print("snmp9 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp9.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp9.onDataChange = function()
        //{
        //  if(bSnmp9)
        //      snmp9.getData();
        //}
        
        var snmp10 = new scSNMP.ArubaSystemMIB("192.168.20.90", "Aruba1930");
        snmp10.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    for(var i in event.data)
                    {
                        Debug.Print(event.name + "TempSensorValue1" + ": " + event.data.rlPhdUnitEnvParamTempSensorValue.value);
                        Debug.Print(event.name + "TempSensorStatus1" + ": " + event.data.rlPhdUnitEnvParamTempSensorStatus.status);
                        Debug.Print(event.name + "MonitorTemperatureStatusValue1" + ": " + event.data.rlPhdUnitEnvParamMonitorTemperatureStatus.value);
                        Debug.Print(event.name + "MonitorTemperatureStatus1" + ": " + event.data.rlPhdUnitEnvParamMonitorTemperatureStatus.status);
                        Debug.Print(event.name + "CpuUtilDuringLastSecond1" + ": " + event.data.rlCpuUtilDuringLastSecond.value);
                        Debug.Print(event.name + "CpuUtilDuringLastMinute1" + ": " + event.data.rlCpuUtilDuringLastMinute.value);
                        Debug.Print(event.name + "CpuUtilDuringLast5Minutes1" + ": " + event.data.rlCpuUtilDuringLast5Minutes.value);
                        Debug.Print(event.name + "ModelName1" + ": " + event.data.rlPhdUnitGenParamModelName.value);
                        Debug.Print(event.name + "SoftwareVersion1" + ": " + event.data.rlPhdUnitGenParamSoftwareVersion.value);
                        Debug.Print(event.name + "SerialNum1" + ": " + event.data.rlPhdUnitGenParamSerialNum.value);
                        Debug.Print(event.name + "SysUpTime1" + ": " + event.data.sysUpTime.value);
                        Debug.Print(event.name + "SysDescr1" + ": " + event.data.sysDescr.value);
                        Debug.Print(event.name + "MainPsePower1" + ": " + event.data.pethMainPsePower.value);
                        Debug.Print(event.name + "MainPseOperStatus1" + ": " + event.data.pethMainPseOperStatus.status);
                        Debug.Print(event.name + "MainPseConsumptionPower1" + ": " + event.data.pethMainPseConsumptionPower.value);
                        Debug.Print(event.name + "MainPseUsageThreshold1" + ": " + event.data.pethMainPseUsageThreshold.value);
                    }
                }
                else
                {
                    Debug.Print("snmp10 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp10.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp10.onDataChange = function()
        //{
        //  if(bSnmp10)
        //      snmp10.getData();
        //}
        
        var snmp11 = new scSNMP.ArubaPortMIB("192.168.20.100", "Aruba1930", true, 10000, 161, "public", [1,2,3,4,5,6,7]);
        snmp11.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    for(var i in event.data)
                    {
                        var index = i.split(' ')[1];
                        Debug.Print(event.name + "PortSpeed" + index + ": " + event.data[i].ifHighSpeed.value);
                        Debug.Print(event.name + "PortDuplexValue" + index + ": " + event.data[i].dot3StatsDuplexStatus.value);
                        Debug.Print(event.name + "PortDuplexStatus" + index + ": " + event.data[i].dot3StatsDuplexStatus.status);
                        Debug.Print(event.name + "PortStatusValue" + index + ": " + event.data[i].ifAdminStatus.value);
                        Debug.Print(event.name + "PortStatus" + index + ": " + event.data[i].ifAdminStatus.status);
                        Debug.Print(event.name + "PortOperatingStatusValue" + index + ": " + event.data[i].ifOperStatus.value);
                        Debug.Print(event.name + "PortOperatingStatus" + index + ": " + event.data[i].ifOperStatus.status);
                    }
                    
                }
                else
                {
                    Debug.Print("snmp11 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp11.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp11.onDataChange = function()
        //{
        //  if(bSnmp11)
        //      snmp11.getData();
        //}

        var snmp12 = new scSNMP.ArubaPoeMIB("192.168.20.100", "Aruba1930", true, 10000, 161, "public", [1,2,3,4,5,6]);
        snmp12.getEventTarget().onDataAvailable = function(event)
        {
            try
            {
                if(!event.error)
                {
                    for(var i in event.data)
                    {
                        var index = i.split(' ')[1];
                        Debug.Print(event.name + "PortOutputVoltage" + index + ": " + event.data[i].rlPethPsePortOutputVoltage.value);
                        Debug.Print(event.name + "PortOutputCurrent" + index + ": " + event.data[i].rlPethPsePortOutputCurrent.value);
                        Debug.Print(event.name + "PortOutputPower" + index + ": " + event.data[i].rlPethPsePortOutputPower.value);
                        Debug.Print(event.name + "PortPowerLimit" + index + ": " + event.data[i].rlPethPsePortPowerLimit.value);
                        Debug.Print(event.name + "PortStatusDescription" + index + ": " + event.data[i].rlPethPsePortStatusDescription.value);
                        Debug.Print(event.name + "PortOperStatus" + index + ": " + event.data[i].rlPethPsePortOperStatus.status);
                        Debug.Print(event.name + "PortLinkPartnerPoeType" + index + ": " + event.data[i].rlPethPsePortLinkPartnerPoeType.status);
                    }
                }
                else
                {
                    Debug.Print("snmp12 - System: " + event.name + ", Something went wrong, connection to Switch may be broken. ErrorCode: " + event.errorCode + ", ErrorMessage: " + event.errorMessage);
                }
            }
            catch(e)
            {
                Debug.Print("snmp12.getEventTarget().onDataAvailable: " + e);
            }
        }
        //bSnmp12.onDataChange = function()
        //{
        //  if(bSnmp12)
        //      snmp12.getData();
        //}
    }
}
catch(e)
{
    Debug.Print("Main script: " + e);
}
*/