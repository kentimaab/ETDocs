# scCameras – Usage

`scCameras` can be used in two ways: either with simple function calls that return the current status directly (Method 1), or with event-driven monitoring objects that trigger a callback when status changes (Method 2).

---

## getCameraCommunicationError

Returns `true` if any camera in the system currently has a communication error.

**Return value:** `Boolean`

```js
var harFel = scCameras.getCameraCommunicationError();
if(harFel)
    Debug.Print("One or more cameras are offline.");
```

---

## CommunicationErrorCheck

Event-driven monitor for communication errors. Creates an object that periodically checks whether a communication error has occurred or been resolved, and sends an event on every change.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `interval` | `Number` | `10000` | Check interval in milliseconds |
| `name` | `String` | `"<NONAME>"` | Name of the instance, visible in the event object |

**Event properties**

| Property | Type | Description |
|----------|-----|-------------|
| `event.isCommError` | `Boolean` | `true` if a communication error is active |
| `event.name` | `String` | The instance name |
| `event.text` | `String` | Descriptive text |

```js
var ce1 = new scCameras.CommunicationErrorCheck(10000, "ce1");
ce1.getEventTarget().onDataAvailable = function(event)
{
    if(event.isCommError)
        Debug.Print("Communication error active – one or more cameras are offline.");
    else
        Debug.Print("Communication error resolved – all cameras are online.");
}
```

---

## getCameraRecordingError

Returns `true` if any camera in the system currently has a recording error.

**Return value:** `Boolean`

```js
var harInspelningsfel = scCameras.getCameraRecordingError();
```

---

## RecordingErrorCheck

Event-driven monitor for recording errors. Works the same way as `CommunicationErrorCheck`.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `interval` | `Number` | `10000` | Check interval in milliseconds |
| `name` | `String` | `"<NONAME>"` | Name of the instance |

**Event properties**

| Property | Type | Description |
|----------|-----|-------------|
| `event.isRecError` | `Boolean` | `true` if a recording error is active |

```js
var re1 = new scCameras.RecordingErrorCheck(10000, "re1");
re1.getEventTarget().onDataAvailable = function(event)
{
    if(event.isRecError)
        Debug.Print("Recording error active.");
    else
        Debug.Print("Recording error resolved.");
}
```

---

## getAverageCameraBandwidth

Returns the average bandwidth per camera in Bytes/s, based on the last 10 seconds. Cameras that are offline are not included.

**Return value:** `Number` – average bandwidth in Bytes/s, or `0` if no cameras are streaming.

```js
var bw = scCameras.getAverageCameraBandwidth();
Debug.Print("Average bandwidth: " + scExtensions.bytesToSize(bw) + "/s");
```

---

## AverageCameraBandwidthCheck

Event-driven limit monitor for average bandwidth per camera.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `limit` | `Number` | `5242880` (5 MiB/s) | Limit in Bytes/s |
| `interval` | `Number` | `10000` | Check interval in milliseconds |
| `name` | `String` | `"<NONAME>"` | Name of the instance |

**Event properties**

| Property | Type | Description |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` if the bandwidth exceeds the limit |
| `event.isBelowLimit` | `Boolean` | `true` if the bandwidth is below the limit |
| `event.limit` | `Number` | Configured limit in Bytes/s |
| `event.currentAverageCameraBandwidth` | `Number` | Current average bandwidth in Bytes/s |

```js
var bw1 = new scCameras.AverageCameraBandwidthCheck(10485760, 10000, "bw1"); // 10 MiB/s
bw1.getEventTarget().onDataAvailable = function(event)
{
    if(event.isAboveLimit)
        Debug.Print("Average bandwidth exceeds " + scExtensions.bytesToSize(event.limit) + "/s");
    else
        Debug.Print("Average bandwidth is below " + scExtensions.bytesToSize(event.limit) + "/s");
}
```

---

## getTotalCameraBandwidth

Returns the total bandwidth for all cameras in Bytes/s (the sum of each camera's average value over the last 10 seconds).

**Return value:** `Number` – total bandwidth in Bytes/s.

```js
var tot = scCameras.getTotalCameraBandwidth();
Debug.Print("Total bandwidth: " + scExtensions.bytesToSize(tot) + "/s");
```

---

## TotalCameraBandwidthCheck

Event-driven limit monitor for total bandwidth. Works the same way as `AverageCameraBandwidthCheck`.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `limit` | `Number` | `104857600` (100 MiB/s) | Limit in Bytes/s |
| `interval` | `Number` | `10000` | Check interval in milliseconds |
| `name` | `String` | `"<NONAME>"` | Name of the instance |

**Event properties**

| Property | Type | Description |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` if the total bandwidth exceeds the limit |
| `event.isBelowLimit` | `Boolean` | `true` if the total bandwidth is below the limit |
| `event.currentTotalCameraBandwidth` | `Number` | Current total bandwidth in Bytes/s |

---

## getAverageCameraRecordingHour

Returns the average amount of data recorded per hour for all cameras, based on the last week. The value is given in Bytes.

**Return value:** `Number` – average amount of data recorded per hour, in Bytes.

```js
var rec = scCameras.getAverageCameraRecordingHour();
Debug.Print("Average recording per hour: " + scExtensions.bytesToSize(rec));
```

---

## AverageCameraRecordingHourCheck

Event-driven limit monitor for average recording per hour.

**Parameters**

| Parameter | Type | Default value | Description |
|-----------|-----|---------------|-------------|
| `limit` | `Number` | `104857600` (100 MiB) | Limit in Bytes per hour |
| `interval` | `Number` | `10000` | Check interval in milliseconds |
| `name` | `String` | `"<NONAME>"` | Name of the instance |

**Event properties**

| Property | Type | Description |
|----------|-----|-------------|
| `event.isAboveLimit` | `Boolean` | `true` if the recording exceeds the limit |
| `event.isBelowLimit` | `Boolean` | `true` if the recording is below the limit |
| `event.currentAverageCameraRecordingHour` | `Number` | Current average recording per hour, in Bytes |

---

## The script

<a href="scCameras.js" download="scCameras.js" class="md-button md-button--primary">Download scCameras.js</a>

```js
--8<-- "skriptbibliotek/sccameras/scCameras.js"
```
