# EthirisMonitor64.sys detected by antivirus protection

Actions to take when antivirus software flags the file `EthirisMonitor64.sys` in Ethiris VMS 16.x.

## Introduction

This document addresses a problem that can occur when Ethiris VMS **16.0.0.1 or 16.0.0.3** is running on **third-party hardware** — i.e. not on Kentima's Ethiris NVR, NVC, or NVP devices.

Version 16.x of Ethiris VMS includes a hardware monitoring feature (e.g. fan speeds and temperatures) to enable alarms on abnormal deviations. To read out hardware information, Ethiris VMS creates a file named `EthirisMonitor64.sys`, which is temporarily installed on the computer. This file contains a so-called **Winring0 driver**, which antivirus software, including Microsoft Windows Defender, may react to.

Microsoft Windows Defender has updated its list of potential threats and now detects files containing a Winring0 driver.

!!! note
    On Kentima's devices (Ethiris NVR, NVC, and NVP), the Ethiris VMS installation directory is excluded in Windows Defender, which means the problem does not occur on these devices.

## Prerequisites

The problem can occur if:

- Ethiris VMS version **16.0.0.1 or 16.0.0.3** is installed
- The system is running on **third-party hardware** (not Kentima's NVR/NVC/NVP)
- An active antivirus program is present on the computer

## Solutions

### Solution 1 – Allow the file in the antivirus software (recommended)

The file `EthirisMonitor64.sys` is created by Kentima and poses no threat. The best solution is to allow it.

**For Microsoft Windows Defender:**

1. Open **Windows Security**: click the Start button, type "Windows Security", and open the app.
2. Go to **Virus & threat protection**: click the shield icon.
3. Click **Protection history** to see identified threats and actions taken.
4. Select the action **Allow on device**.

### Solution 2 – Let the antivirus software remove the file

If you do not want to allow the file, you can let the antivirus software remove it or place it in quarantine. The consequence is that certain hardware monitoring features will not work. These features are in any case limited on third-party hardware compared to Kentima's devices — for example, monitoring of fans and temperatures is only available on Ethiris NVR, NVC, and NVP.

!!! warning
    `EthirisMonitor64.exe` is started automatically by the Ethiris service and creates a new `EthirisMonitor64.sys` every time it runs. Windows Defender cannot remove the file without a restart, which causes it to reappear.

**Alternatively:** Manually remove the file `EthirisMonitor64.exe`. On a computer running only Ethiris Client, this will disable the clock synchronization feature via the Ethiris monitor service — this can instead be handled via Windows' built-in time synchronization features.
