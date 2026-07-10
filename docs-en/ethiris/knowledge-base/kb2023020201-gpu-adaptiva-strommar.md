# Video optimization via GPU or Adaptive video streams

Description of when and how hardware decoding via GPU and Adaptive video streams respectively can be used in Ethiris VMS.

## Introduction

By using a GPU (Graphics Processing Unit) for video decoding, the computer's CPU is offloaded, providing higher performance and the ability to display more cameras on the same hardware.

**Adaptive video streams** is a concept introduced in Ethiris VMS version 13.2. It means that multiple video streams with different resolutions can be defined for one and the same camera. Ethiris Server automatically sends the most suitable stream to clients based on the current size of the camera view and the optimization settings in the client.

## Prerequisites

### Video decoding on GPU

**Ethiris VMS:**

- Version: **11.2** or later
- License level: **Advanced/Universal level 5** or higher

**Cameras:**

- Camera type: All
- Video compression format: **H.264** or **H.265**
- Video resolution:
    - H.265: Max **8,192 × 8,192** (from version 14.2; previously max 4,096 × 4,096)
    - H.264: Max **4,096 × 4,096**

**Recommended graphics cards (tested with Ethiris VMS):**

- Intel 6th generation CPU or later with Intel HD Graphics 530 or later
- NVIDIA:
    - GT 1030
    - GTX 1050 / 1050 Ti
    - GTX 1630¹
    - GTX 1650¹
    - T600¹

¹ These graphics cards support H.265 decoding with higher quality and are preferred.

### Adaptive video streams

**Ethiris VMS:**

- Version: **13.2** or later
- License level: **Advanced/Universal level 5** or higher

**Cameras:**

- Camera type: Not 360 cameras
- Video compression format: All
- Video resolution: All

## Support by context

| Context | GPU decoding | Adaptive streams |
|------------|:-------------:|:-----------------:|
| **Ethiris Client** | | |
| Live | Yes | Yes |
| Video player | Yes | Not relevant |
| Instant replay | Yes | No |
| Mini video player | No | Not relevant |
| Export to AVI | No | Not relevant |
| **Ethiris Mobile** | | |
| Live | No | Yes |
| Video player | No | Not relevant |
| **Ethiris Server** | | |
| Motion detection | No | No |
| Transcoding to Ethiris Mobile | Yes | Yes |
| **Ethiris SDK** | | |
| Live | Yes | Yes |
| Recorded video | Yes | Not relevant |
| **Ethiris ActiveX** | | |
| Live | No | No |
| **WideQuick EthirisView** | | |
| Live | No | No |
| Recorded video | No | No |
| **Ethiris Viewer** | | |
| Playback | Yes | Not relevant |
