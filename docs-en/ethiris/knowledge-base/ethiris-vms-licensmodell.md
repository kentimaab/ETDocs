# Ethiris VMS license model

Explanation of the Ethiris VMS license model with regard to the number of camera licenses counted.

## Introduction

The license cost for Ethiris VMS is based on two factors: the **current license level** and the **number of cameras**. To understand how many cameras are counted — i.e. the number of camera licenses used by the configuration — you need to know the concepts of *physical cameras*, *logical cameras*, and *video streams*.

## Definitions

### Physical camera

A **physical camera** is a unique combination of IP address and port in the Ethiris configuration, e.g. IP address `192.168.31.18` and port `554`. In most cases RTSP is used, in which case port 554 applies.

Basic principle: **every physical camera costs one camera license.**

### Logical camera

A **logical camera** is a unique camera name in the Ethiris configuration. Multiple logical cameras can be defined for the same physical camera (same IP address and port).

With license level **Extended or Universal level 3** or higher, you can set up **2 × the number of camera licenses** as logical cameras. Example: 10 camera licenses → max 20 logical cameras, but still max 10 physical cameras.

### Video stream

A **video stream** is a named definition of resolution, frame rate, and video compression format for a given logical camera.

With license level **Advanced or Universal level 5** or higher, you can set up an unlimited number of video streams per logical camera at no extra camera license cost. For lower levels, the maximum is one video stream per logical camera.

## Maximum limits per type

| Type | License requirement | Maximum limit |
|-----|-----------|----------------|
| Physical camera | – | Number of camera licenses in the current license code |
| Logical camera | Extended or Universal level 3 | 2 × number of camera licenses |
| Video stream | Advanced or Universal level 5 | No limit |

## Number of camera licenses

### Traditional license model (one-time fee)

With **Free, Basic**, or **Universal level 1–2**, every row in the camera list is counted as a physical camera and costs one camera license.

With **Extended or Universal level 3** or higher, multiple logical cameras can be defined per physical camera.

Example with an Extended license for 7 cameras: max 7 physical cameras and max 14 logical cameras (2 × 7).

### Universal license (subscription model)

With **Universal**, the system calculates the number of camera licenses based on the current configuration. Billing takes place quarterly in arrears.

With **Universal level 3 or higher**, the number of camera licenses is calculated as the **largest value** of:
- Number of physical cameras, or
- Number of logical cameras / 2 (rounded up)

**Example (Universal level 3+):**

| Physical cameras | Logical cameras | Camera licenses |
|:-:|:-:|:-:|
| 12 | 16 | 12 |
| 12 | 24 | 12 |
| 12 | 25 | 13 |
| 12 | 30 | 15 |

With **Advanced or Universal level 5** or higher, the number of video streams does not affect the calculation of camera licenses.

### Floating camera licenses (Universal level 6)

With Universal level 6, you can define more cameras in the configuration than the number specified under **Max concurrent active physical cameras**. This figure acts as a cap for billing — if the configuration contains fewer cameras, only the actual cameras are billed.

The setting is configured in the **Universal tab** for the server in Ethiris Admin, where you can also see the current number of physical cameras, logical cameras, and camera licenses in use.
