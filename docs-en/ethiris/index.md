# Ethiris

A video surveillance system needs to be open enough to work with any cameras, scalable enough to grow along with the facility, and integrable enough to be connected with alarm, access control, and process systems. That is the starting point for Ethiris.

Ethiris is Kentima's product family for professional video surveillance. It consists of the software **Ethiris Video Management Software (VMS)** together with associated hardware – Network Video Recorders (NVR), Network Video Clients (NVC), Network Video Panels (NVP), and complete rack solutions (NVRN Rack Solutions).

The products are used in all types of facilities, from smaller installations to very large and complex systems with thousands of cameras – for example airports, ports, shopping malls, process industry, public buildings, alarm centrals, and traffic systems.

This page covers the system in four parts: **product and licensing** (components, license model), **hardware** (NVR/NVC/NVP, rack solutions, camera support), **client functions** (live viewing, video wall, playback, alarms, audio), and **administration and integration** (scripting, SDK, server operation, ONVIF).

## Ethiris VMS – open, flexible, and powerful

Ethiris is a component-based and scalable 64-bit software. The user and system integrator select the desired components and adapt the software to the needs of the specific installation. The component-based architecture means the system can be installed at several geographically separate facilities, and each client can connect to an unlimited number of servers.

### Components in an Ethiris system

A complete basic system requires only one Ethiris Server, one Ethiris Client, and one Ethiris Admin – in smaller systems, all three can run on the same computer.

| | Component | Description |
|---|---|---|
| ![](images/es.png) | **Ethiris Server** | The core of the system. Handles all communication with cameras and records images to one or more hard disks. Runs as a service with automatic startup. A system can consist of one or more Ethiris Server instances. |
| ![](images/ec.png) | **Ethiris Client** | Displays live images and recorded video. Can connect to one or more Ethiris Server instances. A system can contain several clients. |
| ![](images/ea.png) | **Ethiris Admin** | Configures the various parts of the system. Regardless of the computer's location, it can centrally configure all components of the installation. |
| ![](images/em.png) | **Ethiris Mobile** | App for Android and iOS. Provides access to live video and recorded video, control of PTZ cameras and I/O, and alarm display, via Wi-Fi and 4G/5G. |
| ![](images/os.png) | **Ethiris Server OPC Server** | A separate component that allows other systems to connect to Ethiris Server via **OPC** (an open communication standard for industrial system integration), for example to start recording or control a PTZ camera. |
| ![](images/ex.png) | **Ethiris ActiveX** | A component for displaying live video from any connected camera in any other system that supports ActiveX controls, e.g. **WideQuick** (Kentima's software for supervisory system and process monitoring, so-called SCADA/PSIM – see [WideQuick PSIM](#widequick-psim)), point-of-sale systems, or Microsoft Office. |
| ![](images/sv.png) | **Ethiris Signature Validator** | Separate software for verifying the authenticity of jpg images exported from Ethiris. |
| ![](images/ev.png) | **Ethiris Viewer** | Separate software for viewing exported video in Ethiris's own export format. |
| ![](images/cs.png) | **Ethiris Camera Simulator** | Separate software for simulating cameras using Ethiris export files, which can be used in an Ethiris system e.g. for testing. |

### Key features

- **Cost-effective** – two license models: one subscription-based (Universal, six feature levels) and one where the entire license is paid up front (Free, Basic, Extended, Advanced, Premium). The license cost is based on level and number of cameras; 5 years of free updates can also be selected.
- **High performance and reliability** – developed to communicate with a large number of cameras while handling high image storage rates. Support for both hardware acceleration and adaptive video streams. Automatic backup of configurations.
- **Fast installation** – a configuration wizard with automatic search for cameras on the network speeds up configuration. A clear overview of storage devices and statistics panels facilitates adjustment of recording.
- **Open platform** – support for both individual camera protocols and the general ONVIF protocol.
- **Advanced alarm and event handling** – synchronization of the alarm list, event list, and video player facilitates searching for relevant video linked to a specific event.
- **Powerful flexibility with scripting** – a Java-based script engine opens up virtually unlimited possibilities to adapt the installation to the customer's requirements, through smart links between events and activities.
- **Broad language support** – several languages are supported in the administration tool, the client, and the mobile applications, with new languages continuously being added.
- **Fast integration** – extensive support for OPC, ONVIF, .Net SDK, and database communication.
- **Alarm centrals** – support for sending alarms and events to alarm centrals via **SIA codes** (a common protocol for alarm transmission), see [Alarm centrals](#alarm-centrals).

## Performance and scalability

The goal has been for a single Ethiris Admin and a single Ethiris Client to be able to connect to an installation consisting of **150 Ethiris Server units with a total of 4,500 cameras**, without having to split up the configuration.

- **The tree view in Ethiris Admin** is optimized so that a connected Ethiris Server is not fully loaded until it is clicked. Collapsing a loaded server in the tree (minus sign) unloads it from Ethiris Admin again, and only the icon is shown.
- **Login** can be reused for several servers, so that you only need to log in once instead of separately on each Ethiris Server to be loaded in the tree view.
- **Filtering the camera list** – in contexts where cameras are selected (e.g. when building client views), the list can be filtered by selecting a specific Ethiris Server. In a test with a total of 4,500 cameras, the list was reduced to 30 cameras when selecting one of the 150 servers.
- **Sectioning** – a single large configuration for the whole system is preferable to several smaller ones, since only one configuration can be loaded at a time in Ethiris Admin and Ethiris Client. The installation can be divided into sections with the desired depth (e.g. country → county → city), defined in Ethiris Admin and shown as a tree view in Ethiris Client.
- **Redundancy/cluster** – several Ethiris servers can be combined into an **Ethiris Cluster** that externally behaves as a single server. One of the servers has the **Master** role and has primary responsibility for certain shared functions (e.g. the video wall, see [Ethiris video wall](#ethiris-video-wall)); if the Master server goes down, one of the other member servers automatically takes over the role. If a server goes down, the others automatically take over its cameras, and the clients automatically retrieve images from the correct server. This also provides simpler load balancing (the same configuration is automatically distributed across several server computers).
- **Optimized video storage** – high storage performance is achieved through efficient thread handling that utilizes a NAS or disks supporting multiple simultaneous video streams. Writing to disk is always prioritized over reading; if the disks risk being unable to keep up with writing, Ethiris gradually throttles reading, so that clients have to wait a little longer for recorded video.

!!! info "License requirement"
    Ethiris Cluster requires license level Premium or Universal level 6.

## License model

There are two main variants:

| Model | Description |
|---|---|
| **Universal** | Subscription-based with a monthly cost, six feature levels. Free updates to the latest version are always included. |
| **Free** | Free of charge, but heavily limited: 1 camera, 1 day of video storage, 1 simultaneous client, requires a constant internet connection, no free updates. In practice, it functions as a test level rather than a production license. |
| **Basic / Extended / Advanced / Premium** | The entire license is paid up front based on level and number of cameras, with progressively more features per level. 5 years of free updates can be added. |

**Choice of model:** Universal is the most flexible – feature level, number of cameras, and options can be changed at any time directly in Ethiris Admin without contacting Kentima. The number of cameras is unlimited and is determined by the number set up in the configuration; everything is automatically reported to Kentima and invoiced quarterly in arrears based on usage. This does, however, require a continuous internet connection for automatic reporting (the system can operate for 24 hours without internet contact after the first contact with Kentima).

With Free–Premium, the number of cameras can be increased later and the license level raised (but not lowered) – expansions and upgrades are ordered from Kentima. Large systems can be built by distributing different license levels (Basic–Universal) across several computers in the same system.

**Prerequisites:** Ethiris VMS runs on Windows. Each computer running Ethiris Server needs its own unique Product Code, ordered from Kentima. For Basic–Premium, the number of cameras is specified at the time of ordering and the license is registered via Kentima's partner pages. A Universal code requires no separate registration, since this is handled automatically via the internet connection.

**Hosting and multi-instance:** A Universal license is particularly well suited for hosting services, in combination with the feature multiple instances of Ethiris Server (see [Server administration](#multiple-instances-of-ethiris-server)) – up to 30 parallel instances on the same computer with a shared license.

### License overview

The most common features that require a higher license level or a purchasable option, gathered in one place. The complete and always up-to-date license table is available from Kentima.

| Feature | Minimum requirement |
|---|---|
| Email/SMS notification | Basic |
| OPC client, signed JPG export | Extended |
| Create custom client views directly in the client | Extended or Universal level 3 |
| Ethiris Monitor (hardware monitoring) | Extended or Universal level 3 |
| Script libraries | Advanced or Universal level 4 |
| Ethiris Cluster (redundancy) | Premium or Universal level 6 |
| Encryption of video and data files | Premium |
| Single Sign-On and 2FA | Premium or Universal level 6 |
| Video wall (also requires a purchased option) | Premium or Universal level 6 |
| .Net plug-in (also requires a purchased option) | Premium (option) |
| Ethiris SDK (also requires a purchased option) | Premium or Universal level 6 (option) |
| Automatic export of video (also requires a purchased option) | Premium or Universal level 6 (option) |
| Multiple instances of Ethiris Server | Universal level 6 |

## Hardware – NVR, NVC, and NVP

All Ethiris NVR, NVC, and NVP models are reliable, rugged computers with Ethiris VMS pre-installed and licensed, developed and tested by Kentima. All models have a 120 GB SSD with the operating system and Ethiris VMS pre-installed.

| Product | Description | Max number of cameras | Max internal video storage |
|---|---|---|---|
| **Ethiris NVR-1E** | For smaller, simpler installations. | 32 | 22 TB |
| **Ethiris NVR-4** | High performance, Intel i3/i5/i7. For larger and more demanding installations. | 200 | 44 TB |
| **Ethiris NVRN-2 / NVRN-3 / NVRN-4** | Runs Ethiris Server with external video storage on a NAS – no room for internal video storage disks. NVRN-4 has the same performance as NVR-4 and forms the basis of Ethiris NVRN Rack Solutions. | 200 (NVRN-4) | – (external NAS) |
| **Ethiris NVRC-4** | Runs Ethiris Server and Ethiris Client simultaneously on one and the same computer. | 100 | 22 TB |
| **Ethiris NVC-4S** | Dedicated client computer with Ethiris Client pre-installed, no video disk. Up to 3 monitors. | – | – |
| **Ethiris NVC-4L** | Dedicated client computer with Ethiris Client pre-installed, no video disk. Up to 4 monitors. | – | – |

**Ethiris NVP – touch panels:**

- **NVP-300 series** – NVP-1E-311 (10.1" touch screen) and NVP-E316 (15.6" touch screen), for surface mounting on a wall or arm, supplied with a VESA mount.
- **NVP-500 series** – NVP-1E-516 (15.6" touch monitor), flush mounting in a wall or cabinet with a wall thickness of up to 10 mm.
- **NVP-600 series** – NVP-4-616 (15.6") and NVP-4-621 (21.5") touch monitors with Intel i3/i5/i7, suitable for displaying up to 100 simultaneous cameras in Full HD at 25 fps. Flush mounting in a wall or cabinet with a wall thickness of up to 10 mm.

Several NVR units can work together to handle a large number of cameras in the same installation, and all models can be part of an Ethiris Cluster for redundancy.

## NVRN Rack Solutions

The rack solutions are available in three basic series – Small, Medium, and Large – to cover different installation sizes. The basic idea is that the rack solution should provide everything needed in a video surveillance installation except the cameras themselves; the disks are not included in the base price but are ordered separately as needed. The disk capacity in the table below shows the maximum that each series can be equipped with, not a standard configuration.

The basis is Ethiris NVRN. All included NVRN units have license level **Premium** including 5 years of free updates and are configured in an **Ethiris Cluster** – if one or more NVR units drop out, the others automatically take over the handling of its cameras. Kentima mounts the NVR units in the rack together with a switch, NAS, power supply, and UPS, and configures IP addresses and network settings according to the customer's requirements. Mounting, configuration, and testing of the entire system are included before delivery.

| | Series S (Small) | Series M (Medium) | Series L (Large) |
|---|---|---|---|
| Number of cameras | 32–64 | 64–300 | 128–2,000 |
| Disk capacity RAID 5 | 140 TiB (8 disks) | 220 TiB (12 disks) | 940 TiB (48 disks) |
| Rack cabinet height | 12 U / 635 mm | 18 U / 902 mm | 32 U / 1,610 mm |

## Camera support and ONVIF

Ethiris supports both the general ONVIF protocol and individual protocols from leading camera manufacturers. All ONVIF cameras on the network are automatically discovered by Ethiris's built-in search function. **Ethiris VMS is certified for ONVIF Profile S and ONVIF Profile M.**

- Ethiris handles all resolutions without an upper limit and has been tested with video streams up to **200 MPixel**.
- The three most common video compression formats are supported: **M-JPG, H.264, and H.265**.
- Cameras without ONVIF or native support can often still be connected via RTSP.
- ONVIF support has been expanded successively: I/O via ONVIF (version 7.2), ONVIF Events (version 8), and later ONVIF Metadata, audio in/out, and user management.
- Access control systems can be integrated via **ONVIF Profile C** (see [Integration with other systems](#integration-with-other-systems)).

Examples of camera manufacturers supported in Ethiris: ACTi, Arecont Vision, Avigilon, Axis, Basler, Bosch, Brickcom, Canon, Dahua, D-Link, FLIR, GKB, HIK Vision, IQinVision, Panasonic, Pixord, Samsung, Sanyo, Sony, and Vivotek. An up-to-date and complete list is available at [kentima.com](https://www.kentima.com).

## Ethiris Monitor – hardware monitoring

Ethiris Monitor is a separate process installed together with Ethiris Server and Ethiris Client. Its purpose is to monitor the Ethiris NVR, NVC, or NVP unit that Ethiris VMS is running on, in order to detect problems early and increase operational reliability. The process automatically identifies which hardware the unit consists of and creates corresponding variables and alarms in the data store.

- **Motherboard** – two temperatures and up to three fans are monitored, with automatic alarms for excessive temperature and too low fan speed respectively.
- **Processors** – basic information is retrieved regardless of hardware, but fans/temperatures are only monitored in Kentima's NVX computers. Temperature is read per core, but a single combined alarm (`CoreTempTooHigh`) is created per processor.
- **Graphics cards** – two temperature alarms and one fan alarm, plus variables for data transfer rates.
- **Disks** – basic information (name, serial number), alarm for high temperature, and discrete values for operating hours and number of starts/stops.

Discrete sensor values are accessed one level down in the tree (the **Sensors** node) and can be used for custom alarm limits or history logging, for example a custom-defined alarm that is activated if a temperature exceeds 35 °C.

!!! info "License requirement and compatibility"
    Requires at least license level Extended or Universal level 3. NVX series 1E, 2, 3, and 4 are supported (Series 4 requires Ethiris VMS 17.0 or later).

### Ethiris Monitoring Dashboard (EMD)

EMD is a WideQuick application that monitors the equipment in an Ethiris NVRN Rack Solution (or another Ethiris system) – typically an entire rack solution with several Ethiris NVRN units, a switch, a NAS, and a UPS. EMD can be run as a web application and is thus accessible remotely via a web browser or mobile device, or locally in an operator client mounted directly in the rack for a quick overview on site. Via statistics variables from Ethiris Server, it displays, among other things, network bandwidth, video storage performance, and UPS data, as well as the status of the four LED indicators on each NVR.

See the dedicated solution page for [Ethiris Monitoring Dashboard](../losningar/ethiris-monitoring-dashboard/oversikt.md) for installation and configuration guides.

### SNMP – disk monitoring on NAS

In rack-based solutions with RAID storage (RAID 5 tolerates one failed disk, RAID 6 two), disk problems can be hidden by the RAID system as long as it is still functioning. The script object **SNMPReader** reads status via SNMPv1 directly from the NAS unit (tested against Synology RS1219+) or other network equipment, in order to be able to raise an alarm on abnormal disk status even though the RAID system itself is functioning.

## Use cases

Ethiris's flexible, component-based architecture allows both users and installers to optimize functionality for the specific use case. Examples from industries where Ethiris is used around the world:

- **Transport and infrastructure** – including the airport in Peking, where Ethiris monitors aircraft docking at 125 gates and communicates with the docking system via OPC to control recording. Other examples: tunnels, ports, parking garages, truck terminals, and railway stations.
- **Shopping malls and retail** – for example the Emporia shopping centre in Malmö, with approximately 130 cameras connected to Ethiris.
- **Public spaces** – for example the Opera House in Oslo, monitored with close to 100 cameras.
- **Industrial and process facilities** – used at, among others, ABB and Tetra Pak, often linked with the SCADA/PSIM system WideQuick as well as fire and access control systems. Also mines, manufacturing companies, and process facilities.
- **Arenas and sports facilities** – including Olympia in Helsingborg (approximately 100 cameras) and Borås Arena.
- **Hospitals and schools** – several large hospitals and school buildings, including the emergency department at SUS in Malmö, which chose Ethiris for its scalability, flexibility, and ONVIF support.
- **Alarm centrals** – the city of Helsingborg uses Ethiris together with WideQuick PSIM for its alarm central. The Safe4 alarm central in Oslo has Ethiris Client installed at all of its alarm operators for automatic display of relevant video during an alarm.

## Live viewing

The live panel in Ethiris Client displays current video and audio from the cameras in the installation. Views with a fixed set of cameras are normally predefined and selectable via view buttons in the view selector. Via the camera list, the operator can also create temporary views with any cameras, displayable in the main window or a new window on any monitor, and these can be saved as views directly from the client.

- **Sections** divide an installation into smaller, navigable parts (see [Sectioning](#performance-and-scalability)), e.g. by city or building.
- **Camera list/tree view** – all connected cameras are available; the operator can drag and drop cameras to live view, the video player, and video wall representations.
- **Instant replay** gives the operator several chances to see what happened in front of the cameras a short while earlier.
- **Multi-monitor support** – each client supports up to **eight monitors**.
- **Views** are selected via view buttons in the view selector and predefined in Ethiris Admin (see [Client administration](#client-administration) for a complete definition of what a view can contain).
- **Pop-up windows** are an effective way to present information when something relevant happens.
- **Remote control of clients** enables the construction of video walls, for example for an alarm central.
- **Mobile app** – Ethiris Mobile provides access via Wi-Fi and 3G/4G/5G, with just over 10 different view layouts (from 1×1 to 3×6 camera views) in both portrait and landscape orientation. In the mobile configuration, I/O buttons can be created to activate functions in Ethiris, e.g. opening a gate.

### Ethiris video wall

Video walls can display content controlled automatically or manually by several operators simultaneously, with any number of monitors and any layout per monitor. The concept consists of three sub-components:

- **Video wall object** – defined in Ethiris Server's configuration with a name and properties (e.g. number of monitors). Ethiris Server keeps track of what is displayed on each monitor and sends out updates (manual or automatic, e.g. during an alarm) to the affected clients.
- **Video wall clients** present the content – each client handles one or more video wall monitors, normally one per physical monitor. Several clients can share the workload (e.g. three clients each handling two monitors), and several clients can mirror the same monitors.
- **Operator clients** are used for manual control via a local **video wall representation**, where the operator can drag and drop cameras from the camera list/tree and display recorded video via their local video player. Several operators can work simultaneously against the same video wall.

The video wall can be set to **Autonomous** (no operator at the video wall clients – certain manual functions are hidden and the mouse pointer is turned off). The concept works equally well on a stand-alone Ethiris Server as in an Ethiris Cluster; in a cluster, the Master server manages the video wall, and if the Master goes down, the next member server takes over the role. All video wall functions are scriptable, including automatic presentation during an alarm, customer-adapted layouts, and menus.

!!! info "License requirement"
    Requires an option plus license level Premium or Universal level 6.

### Creating views in the client

By default, all configuration is created via Ethiris Admin, for security reasons. However, operators engaged in active monitoring (e.g. stand monitoring during a match) may need to create their own client views directly in the client. Such views are saved locally for the current Windows user and the client configuration on the local computer, added as view buttons after the predefined ones, and can be deleted manually via right-click. The views are tied to that specific Windows user and that client computer – another user or computer will not see them.

!!! info "License requirement"
    Available from license level Extended or Universal level 3.

## Adaptive video streams

Adaptive video streams adjust to the prevailing hardware conditions in Ethiris Client or Ethiris Mobile in order to maximize performance during live viewing. Several video streams with different resolutions can be defined per camera; when a client displays many cameras simultaneously, a lower resolution is automatically selected to reduce the load.

**Example:** A 4K camera (3,840 × 2,160 px) can have three defined video streams – Primary (4K), Medium (Full HD, 1,920 × 1,080 px), and Mini (VGA, 640 × 480 px). If a 4K monitor displays four simultaneous cameras (each camera view 1,920 × 1,080 px), the Medium stream is automatically selected instead of forcing four full 4K streams.

The client setting controls how the stream is selected in relation to the size of the camera view:

- **None** – the primary stream is always selected, regardless of the size of the camera view (corresponds to the behavior of older Ethiris versions).
- **Performance** – selects the stream with the same or the nearest lower resolution than the camera view.
- **Quality** (default) – selects the stream with the same or the nearest matching resolution (above or below).

Switching video streams happens automatically and seamlessly when the camera view size changes, always at a key frame in the new stream. During digital zoom-in, the Primary stream is always sent for maximum quality.

**Alarm recording:** Scripts can be used to control which video stream should be used at a given time – e.g. lower resolution/frame rate during normal operation and higher during a serious alarm, with a seamless switch at the next key frame. The pre-alarm time is set per camera under the Recording tab in Ethiris Admin – for example, a 30-second pre-alarm provides 30 seconds of high-resolution video already before the alarm was triggered.

**Privacy:** Which video streams may be shown in Live can be restricted via the "Live" column in Ethiris Admin. Used, for example, together with cameras that support Privacy Mask (e.g. Axis Privacy Shield): an unmasked stream is hidden in Live while a masked stream is allowed, and authorization can be required to view the recorded unmasked video.

## Viewing recorded video

The video player in Ethiris Client displays recorded video and audio, and consists of camera views and timelines. Up to **64 simultaneous cameras** can be displayed synchronously, with time spans in the timelines from one minute to six months.

- **Video panel** – standard functions for playback forward/backward, frame-by-frame, segment-by-segment, fast forward/rewind, variable speed, and the ability to specify an exact point in time.
- **Time bar** – marks the current point in time; drag it to fast-forward/rewind, or grab the time marker area to move the entire time interval.
- **Zooming** – fixed intervals from ten minutes to one month, as well as graphical zooming by marking the desired area.
- **Logged data** – history-logged signal values (e.g. a batch number or machine status) can be displayed together with recorded video.

### Timelines – color coding

The base colors in the timelines are:

- Red – event-triggered recording
- Blue – continuous recording
- Dark grey – video that was recorded but subsequently deleted according to the time settings

From version 12.0, the red color can be split into several more specific colors that show *what* triggered an event-driven recording, with supplementary tooltips on hover. The function can be turned off, in which case all event-driven recordings revert to being shown in a single red color as before:

| Color | Meaning |
|---|---|
| Green | Manual recording via the recording button in the client |
| Orange | Event recording according to the recording panel in Ethiris Admin |
| Yellow | Recording for a camera associated with an alarm or event |
| Purple | Event recording via FTP |
| Red | Other event recordings not covered above, e.g. via scripts |

As an alternative to one timeline per camera, a **sum line** can be shown at the bottom of the panel, which summarizes recordings from all cameras and thereby frees up space for more camera views.

### Mini video player

Can be displayed directly in a camera view in live mode, to make the operator's work more efficient. Via the pop-up menu or a button in the control panel, you switch between live and recorded for a camera – a flashing "R" in the corner of the view indicates mini video player mode. Supports navigation between video segments, frame stepping, playback forward/backward, and return to live view.

### Smart search

In addition to manual searching in the timelines, there is:

- **Synchronization with event and alarm** – double-clicking an event or an alarm in the list automatically loads the video player with the associated cameras and the correct point in time.
- **Smart search** – detects motion in one or more marked areas of the image; the first matching image is displayed and the timelines are automatically scrolled forward.

## Export

Video and audio can be exported for further distribution, for example to the police. Export is always based on the time interval in the timelines – the entire interval or a single recording (e.g. via right-clicking on a segment and "Export").

- **Export dialog** – time limits, export format, target directory, which cameras to include, and whether the camera name/timestamp should be displayed.
- **Ethiris native format** (default, since version 7) – retains the original quality and exports up to **1,000 times faster** than other formats. Played back in Ethiris Viewer, which supports synchronized playback of up to nine files.
- **Signing** – the export is digitally signed to prevent tampering and ensure the authenticity of the images.
- **AVI** – can be exported directly, playable in a standard Windows media player, from both Ethiris Client and Ethiris Viewer.
- **Stand-alone** – Ethiris Viewer requires no installation, only .NET 4.0 or later (pre-installed in e.g. Windows 11).

### Automatic export of video

Scripts can be used to automatically export video from selected cameras and time intervals, so that important material is not forgotten. Recorded audio and logged variable values can be included with the export. The function is based on the script class `ExportJob` with methods/properties/events such as `Start()`, `Abort()`, `onProgress`, `onFinished`, and `onError`. The `MaxFileSize` property controls the maximum file size per export file (if the export does not fit, several files are created automatically, which Ethiris Viewer plays back in sequence).

!!! info "License requirement"
    Requires a separate option plus license level Premium or Universal level 6.

## Joystick, keypad, and jog dial

Ethiris VMS has built-in support for joystick, keypad, and jog dial, with full support for Axis's latest devices in this area. Configuration takes place in Ethiris Admin, where Ethiris reads the current layout of the connected hardware (available buttons), which can then be linked to functions, e.g. controlling the video player. A joystick can have up to 128 button functions depending on the connected device. Ethiris supports, among others, the Axis keypad devices TU9002/TU9003, T8312, and the jog dial T8313 (controls playback speed and frame stepping).

## Ethiris Viewer

Standalone software for playing back files in Ethiris's own export format (see [Export](#export) for the format's characteristics). Version 13.2 rebuilt the playback engine for smooth simultaneous playback of several high-resolution cameras (4K/8 MPixel, 360° cameras often 12 MPixel) and added reverse playback (`Shift+Space`). Camera views can be dragged out to separate windows (`Shift` + drag) and placed on any monitor, still synchronized.

## 360° cameras

The dewarping function allows 360° cameras to be used to their full potential – the camera always sends the complete 360° image as a single video stream (and uses only one camera license), and it is Ethiris Client that dewarps the image in live view, the video player, and Instant Replay. Works generally with 360° cameras from various manufacturers, but is primarily developed for cameras with ImmerVision lenses. Zoom/pan works as for a regular PTZ camera.

**Dewarp modes** (selected via right-click in the image):

- **PTZ view** – a view that can be zoomed, panned, and tilted.
- **Panorama view** – covers the full 360° around the camera, works best with a height-to-width ratio of 1:7.5.
- **Panorama view, fixed aspect ratio** – like the panorama view, but the ratio is set automatically.
- **Quad-split view** – four views that can each be zoomed, panned, and tilted separately.
- **Dual panorama view** – two views that each cover 180°.
- **Dual panorama view, fixed aspect ratio** – like the dual panorama view, with the ratio set automatically.

**Virtual cameras** predefine a particular dewarp and PTZ mode (or zoom mode for a digitally zoomed camera) and are used in Ethiris Client just like any other camera, for example in predefined client views. Cannot be created for a physical PTZ camera. Several virtual cameras can be created per physical camera, but they count against the total number of camera licenses – the maximum number of logical cameras (physical + virtual) is twice the number of available camera licenses.

## Alarm management

The alarm list shows all active alarms and is indicated in all connected clients. Alarms can be associated with one or more cameras for automatic recording and easier video searching, and every status change (activated, acknowledged, resolved, by whom, and from which computer) is logged in the event list.

- **Sorting and color coding** – the alarm list can be sorted by status, time, alarm group, severity, and alarm text (default: status, then descending time), with color coding per alarm group.
- **System alarms** – automatically defined, e.g. communication failure with a camera, full storage device, insufficient disk capacity, or script error. Priority can be set per alarm.
- **Custom-defined alarms** – any activation conditions and camera association. A "Maximum length" can limit how long recording continues even if the condition persists.
- **Sum alarms** per alarm group – `SumAlarm` (active until all alarms in the group have both been reset and acknowledged) and `SumAlarmActiveUnacked` (active only while some alarm is active and unacknowledged).
- **Alarm filters** – require a certain number of triggers within a time window, or that a trigger has been active for a certain time, before the alarm is actually activated – reduces false alarms without having to write scripts.
- **Ethiris Mobile** – alarms can be acknowledged directly from the mobile app, with a warning triangle and detail view.

### Alarm centrals

Ethiris can send alarms and events to alarm centrals via **SIA codes** – the protocol most alarm centrals use to receive, distribute, and present alarms to their operators. One example is the Safe4 alarm central, which has Ethiris Client installed locally at all of its operators: when an alarm comes in from a connected installation, the alarm operator can automatically bring up live and recorded video from the cameras at the customer's site that are associated with the alarm. All the information that the Ethiris Client at the alarm central needs to connect to the customer's Ethiris Server and retrieve video is sent encrypted in the SIA message that Ethiris Server sends upon an alarm.

### Alarm operator functions

From version 12.0, there is a special acknowledgment type, "Alarm operator", which ensures that only one alarm operator at a time handles a given alarm. A button is used to "take" the alarm, whereupon it disappears from other operators' alarm lists; a two-split view is then automatically displayed with a mini video player and live view from the associated camera. Two separate authorization privileges control access: one for operators (only see their own alarms) and one for administrators (see all alarms, including those left pending with an absent operator). The alarm list in Ethiris Client can be switched between traditional mode and alarm operator mode.

### Event control

The event list shows all events in the system (system events, custom-defined events, and alarm status changes) and functions as a history log. Events can be associated with cameras for direct access to relevant video via double-click. **Tracking (audit trail)** can be enabled per function (e.g. "View live video from camera") and logs what, who, when, and from which computer – with the option of automatic deletion after a configurable time.

### Automatic time synchronization

Ethiris VMS automatically synchronizes the time on all connected ONVIF cameras, and all Ethiris Client instances synchronize their clock against an Ethiris Server. Ethiris Server also sets the cameras' NTP server to point to itself, and has its own built-in NTP server always enabled. It is recommended to synchronize Ethiris Server's clock against an external NTP server. An alarm is automatically generated if the time difference between two Ethiris units (client or server) exceeds 30 seconds.

## Authorization and security

Ethiris has its own authorization system with users and groups, and can also be integrated with Windows's authorization system (Active Directory, a domain, or the local server). About 20 Ethiris functions can be linked to user groups, and all usage can be tracked and logged in the event list with time and user. Authorization can be set at the server level or specifically per camera/client type (Ethiris Admin, Ethiris Client, Ethiris Mobile, WideQuick Ethiris View) – for example requiring login for mobile connections but not for local network connections.

**Single Sign-On (SSO)** automatically logs in with the Windows user who is already logged in, provided that both the server and client computers are members of the same domain.

**2FA (two-factor authentication)** requires, in addition to username and password, a one-time code from an authenticator app (e.g. Microsoft Authenticator), activated via a QR code at the first login.

**Password security** – the administrator can set a minimum password strength (six levels, Very weak–Extremely strong) or customize complexity requirements (minimum length and character types), require a password change at first login, set a maximum password age (default 180 days if enabled), and enable account lockout (5 incorrect attempts locks the account for 15 minutes, with an additional 15 minutes for each further failed attempt).

**Encryption** – Ethiris supports full encryption in communication between the system's components (e.g. between Ethiris Server, Ethiris Client, and Ethiris Mobile), as well as encrypted communication with cameras that support HTTPS. Encryption of video and data files on disk requires license level Premium.

!!! info "License requirement"
    Single Sign-On and 2FA require license level Premium or Universal level 6.

## Audio

The audio function gives the operator the ability to speak out to one or more speaker units in the installation, as well as to listen live and record audio from cameras with a microphone.

**Audio out:** Supported via a speaker built into or connected to an ONVIF or Axis camera, or a dedicated IP speaker from Axis (e.g. C3003). Audio buttons can be defined in the client configuration and linked to one or more speaker units; active speech is indicated with a flashing microphone symbol.

**Audio in** (from version 12.0): live listening and recording of audio from cameras with a microphone, with support for export to Ethiris native format and playback with audio in Ethiris Viewer. Requires camera support for ONVIF, Axis, or Kentima's simulator cameras, as well as audio format G711. The variables `EnableAudio` and `EnableListen` control whether audio in is allowed and whether live listening is allowed, respectively (recording can continue to work even if live listening is turned off). Three separate user operations control authorization: listening to live audio, listening to recorded audio, and exporting audio.

### Door phone functions

The interaction object "Phone button" (see also [Overview images](#overview-images)) enables a door phone function together with an audio-capable camera. A click activates audio in and audio out on the camera for two-way communication between operator and visitor – for example triggered by a digital input connected to a doorbell, which opens a pop-up window with a camera view and an "Answer" button for the operator.

## Scripts and script libraries

In addition to the automatic recording that the configuration wizard sets up (motion detection and schedules), the scripting function offers a powerful tool for tailoring the system's behavior. Settings from the camera recording panel can be converted directly into a script as a starting point. Objects in Ethiris Server (cameras, schedules, motion detections) automatically receive linked variables that can be used in scripts – a PTZ camera, for example, receives readable and writable variables for pan/tilt/zoom.

The script editor has Intellisense (context-sensitive suggestions), bookmarks (`Ctrl+B` and others for navigating large scripts), a document overview, a **Watch panel** for viewing and editing variable values in real time, and a debug window for troubleshooting.

### Script libraries

Script libraries structure and reuse script code. Kentima provides a number of ready-made, tested, and documented libraries that are imported via the **Script libraries** node under **Logic** in Ethiris Admin (from a file or zip). Libraries run automatically once when Ethiris Server starts, in the order they appear in the tree – a library that uses functions from another library must therefore be placed after it in the list.

!!! info "License requirement"
    Script libraries require license level Advanced or Universal level 4.

The included libraries:

| Library | Function |
|---|---|
| **scExtensions** | Extensions to the script engine: string splitting, average calculation (`calculateAverage`), and `FindAllAlarms` for finding all alarm objects in the configuration. The basis for several of the other libraries. |
| **scFile** | Reads and writes files, e.g. for logging. |
| **scSaveImage** | Saves still images from selected cameras at a given time interval, fully independently. |
| **scMail** | Sends email during an alarm, with filtering by severity. |
| **scCameras** | Retrieves information about configured cameras (event-driven or cyclic), e.g. to monitor bandwidth. |
| **scSunRiseSet** | Calculates sunrise/sunset for a selected date and location. |
| **scSNMP** | Communicates with a NAS (tested against Synology RS1219+) via SNMP, e.g. to read disk status. |
| **scExportVideo** | Simplifies automatic export of video from cameras associated with alarms. |

## Integration with other systems

Ethiris has several standardized ways of communicating with other systems, which simplifies integration in larger installations:

- **OPC** – an OPC client is included in Ethiris Server, and a separate Ethiris Server OPC Server (see [Components in an Ethiris system](#components-in-an-ethiris-system)) allows other systems to connect to Ethiris Server. Example: a card swipe in an access control system starts, via OPC, a recording on preselected cameras; a fire detector directs a PTZ camera to a preset position and opens a live window at the alarm central.
- **ONVIF Profile C (access control)** – plug-in concept for access control systems, from version 7. Ethiris Admin automatically searches for door controllers on the network and reads in the configuration. Alarms and warnings (e.g. "Door forced open") can be associated with cameras for automatic event-driven recording.
- **Database (ODBC)** – Ethiris can both read and write information to/from databases, e.g. logging license plate numbers read via an LPR camera.
- **Ethiris ActiveX** – displays live images from any camera in any system that supports ActiveX controls, e.g. HMI/SCADA/PSIM software, point-of-sale systems, or Microsoft Office.

### .Net plug-in

Enables the import of any .Net SDK directly into the Ethiris script engine, so that classes and functions in the SDK become available from Ethiris scripts with the help of Intellisense. The SDK is delivered as a dll that is placed in the `ScriptPluginAssemblies` directory in Ethiris Server's installation directory; Ethiris Server must be restarted to load the dll, and Ethiris Admin to update Intellisense.

!!! info "License requirement"
    Requires license level Premium plus the .Net Plug-in option.

### Ethiris SDK

Ethiris SDK enables deep integration with Ethiris VMS from other systems – essentially all video functionality in Ethiris VMS is available via the SDK. It is primarily aimed at system developers who need to implement video functionality in their own systems, e.g. to display live video when an access control system detects an invalid card. Supports development for both **Windows Forms** and **Windows Presentation Foundation (WPF)**.

Functions available via the SDK include: login (including OAuth token for automatic login without manual OTP), display of live and recorded video (with playback forward/backward at different speeds and frame stepping), synchronized playback of several cameras via `ViewerControl`, full PTZ control (including preset positions), reading/writing I/O variables (Boolean, Integer, Double, String), audio in/out, export to Ethiris native format for up to 9 cameras simultaneously, and full support for 360° cameras (PTZ and dewarping).

!!! info "License requirement"
    Requires license level Premium or Universal level 6, plus the Ethiris SDK option.

A demo example in C# (.Net) is included with the installation under Samples, and can be run directly or compiled in Visual Studio. Full documentation of the interface is available in the separate manual "Integration with Ethiris SDK".

### Video analysis

In addition to built-in motion and tamper detection (independent of camera model), Ethiris can receive more advanced video analysis from modern cameras (LPR/license plate recognition, object detection and classification, line crossing, people counting, abandoned objects, loitering) via three main methods:

- **TCP/HTTP listener** – the camera sends notifications upon triggering.
- **ONVIF Events** – notifications from the camera are presented as variables in Ethiris, directly usable in scripts.
- **ONVIF Metadata** – opens up more advanced analysis; requires the "M" (metadata) column to be checked for the camera in Ethiris Admin.

### WideQuick PSIM

By combining Ethiris with **WideQuick PSIM** (Kentima's SCADA/PSIM system), the system integrator can create a superordinate security platform, with OPC and Modbus for integrating, e.g., access control systems, fire alarms, and intrusion alarms. WideQuick is used as a superordinate system in, among other things, infrastructure, shopping malls, arenas, alarm centrals, and the monitoring of airports and cities. The components include WideQuick Designer (development tool), WideQuick Runtime (runtime environment), WideQuick Remote (remote control), and WideQuick Web Client (web-based access without plug-ins).

## Other features

- **Schedule** – freely definable weekly and daily schedules for controlling activities, e.g. combined with motion detection.
- **Motion detection** – built in for all connected cameras, with several definitions per camera (area, sensitivity) and a noise reduction algorithm with 9 steps.
- **Email and SMS** – automatic messages linked to events, e.g. SMS to on-call personnel in the event of a communication failure with a camera.
- **UPS support** – Ethiris can read UPS status (directly or via a NAS) and shut down in a controlled manner at low battery level to avoid corrupt video data.
- **Automatic camera search** – cameras with UPnP or ONVIF are found automatically, without manual entry of manufacturer, model, and IP address.
- **Client events in scripts** – four events can be detected from the client and used in scripts: `onButtonPressed`, `onViewClicked`, `onPlayerLoaded`, and `onPlayerTime`.
- **Full-screen mode** – a client configuration can be locked to full screen, or selected manually by the operator (`F11`).
- **Language support** – the administration tool, the client, and the mobile applications support several languages, with new languages continuously being added according to market demand. The language can easily be changed at any time via the menu.

## Server administration

**Ethiris Admin** is the common tool for configuring all parts of an Ethiris system, with the ability to be connected to several Ethiris Server instances simultaneously.

- **Camera configuration** – cameras are easily added via the search function in the Cameras panel, which automatically identifies manufacturer, model, and IP address. Format (M-JPG, MPEG-4, H.264, or H.265), resolution, frame rate, compression, quality, and rotation can be configured directly.
- **Camera groups** – provide a better overview and efficient administration of large systems, with groups within groups and automatically created variables per group for use in scripts.
- **Sorting and filtering** – the camera list can be sorted and filtered by several fields simultaneously (multiple search terms separated by `|`), with the number of hits shown directly in the panel.
- **Multi-update** – several cameras can be selected at the same time and have the same value changed in a single operation.
- **Ethiris Cluster** is created by right-clicking on an Ethiris Server in Ethiris Admin and selecting "Create cluster"; the configuration is then automatically shared between the member servers.
- **Optimized loading** – each server is loaded in parallel in the tree view, and detailed information (e.g. motion detections, PTZ) is only loaded when you click on the camera.
- **Online update** – certain changes (camera settings, scripts, authorizations) can be saved without Ethiris Server going offline or stopping ongoing recording. Other changes require a full update with a brief offline period.
- **Statistics** – the statistics panel shows current image format, resolution, bandwidth, and amount of recording per hour and camera. The recording statistics show stored material per storage device; from license level Advanced/Premium, a server can store to several storage devices simultaneously.
- **History logging** – variable values (from external sensors, other systems, or internal variables) can be recorded together with video and exported together with it, e.g. to an AVI file.
- **OPC browser** – presents available signals in another OPC-compatible system for direct selection into Ethiris Server's data store, with automatic mutual updating.

### Multiple instances of Ethiris Server

Several instances of Ethiris Server can run on the same computer, isolated from each other – particularly useful for hosting where several customers share hardware. Each instance runs in its own working directory and has its own storage location for video, and is shown separately in the list of available Ethiris servers. A checkbox can restrict what can be changed for an instance during a remote connection, in order to protect other customers on the same hardware (e.g. preventing changes to ports or storage configuration).

!!! info "License requirement"
    Requires a Universal license level 6. Maximum 30 instances of Ethiris Server per Windows server.

## Client administration

Ethiris Client can be flexibly configured for an efficient operator environment.

- **Views** – up to 8×8 camera views per view, a free number of rows/columns, or predefined layout templates. A view consists of 1–64 camera views, which can display live, hotspot, round-robin, background image, or a web page.
- **Sections** – the client configuration can be divided into sections with the desired depth (with subsections, see [Sectioning](#performance-and-scalability)) for clarity, usually with their own views and buttons.
- **Interaction objects** in camera views provide information or control: button, LED, camera symbol, text, image, door object, and phone object.
- **Authorization per configuration** – since client configurations are managed centrally by Ethiris Server, authorization requirements can be set per configuration, linked to a user group.
- **Hotspot** – controls which live images are shown in a camera view, manually or automatically via a variable.
- **Round-robin** – a camera view can automatically switch between several cameras, common for example at a checkout.
- **Pop-up windows** – predefined windows with a given size/position, referenceable from other functions.
- **Startup settings** – control window size/position/mode, visible panels and menu, and which views/pop-up windows are shown from startup on all connected monitors.

### Overview images

Interaction objects can be placed on top of live images, overview images, or maps, both as information and control tools – for example a large map on one monitor that controls which live images are displayed on other monitors.

| Object | Function |
|---|---|
| **LED** | Shows the status of a digital signal, e.g. motion, door status, or an active alarm. |
| **Button** | Controls a writable digital signal, e.g. opening a gate, controlling PTZ, or displaying a specific live image. |
| **Camera** | Represents a camera; clicking displays live images in a preconfigured camera view. |
| **Text field** | Displays fixed text or the content of a variable, e.g. a batch number. |
| **Image** | Displays static images, can be linked to a Boolean variable to control visibility. |
| **Door** | Represents a door unit linked via the access control system plug-in; shows status (closed, locked, open, forced) and can be unlocked manually. |
| **Phone** | Establishes two-way communication between operator and visitor, see [Door phone functions](#door-phone-functions). |

## Ethiris Access Service (EAS)

EAS is an optimized DNS service from Kentima, built into Ethiris Server, Ethiris Client, and Ethiris Mobile from version 13.0. Its purpose is to facilitate connecting over the internet to an Ethiris Server that lacks a fixed public IP address. When subscribing, a unique DNS name is chosen; if the server's IP address changes, Ethiris handles this automatically so that clients continue to reach the correct address via the DNS name.

EAS is available for all license levels (Free–Universal) but requires an ordered subscription, which is invoiced quarterly in advance and can be canceled at any time.

## Further reading

- **[Manual](manual/index.md)** – in-depth handbook for Ethiris VMS.
- **[Knowledge base](knowledge-base/index.md)** – solutions to common questions and problems.
- **[Camera support by version](kamerastod/index.md)** – detailed compatibility list per Ethiris version.
- **[Release notes](versionsnyheter/index.md)** – what's new in each Ethiris version.

---

*Summarized from Kentima's product brochures "Products for Professional Video Surveillance" and "Ethiris Video Management Software – Product Information" (version 17).*
