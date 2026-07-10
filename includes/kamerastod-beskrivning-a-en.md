### ONVIF

Ethiris supports video, PTZ, I/O, and events via ONVIF.

Kentima has not tested every camera model on the market, but cameras that support **ONVIF Profile S** can likely be connected to Ethiris.

### Generic

Ethiris also supports video via RTSP. This means that cameras with RTSP support can be connected to Ethiris by selecting the **Generic** type and then specifying a URL for retrieving video from the camera.

!!! note
    Ethiris also supports probing against certain camera brands (currently Axis, with firmware **4.40** or later), but this connection type was not yet included as its own row in the comparison table in this version of the document.

    This means that even if a specific camera model cannot be found, the camera can likely still be connected to Ethiris via ONVIF or RTSP.
