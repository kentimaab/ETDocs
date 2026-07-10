# Script Library

The Ethiris Script Library is a collection of ready-made scripts that extend the functionality of Ethiris VMS. The scripts are written in JavaScript and run directly in the Ethiris built-in scripting environment — no external dependencies or additional software required.

## What is the Script Library?

Ethiris has a powerful built-in scripting engine that enables automation, event-driven responses, and integration with external systems. The Script Library collects proven, well-structured scripts that address common needs in real-world installations.

Each script in the library is:

- **Standalone or composable** – can be used independently or combined with other scripts
- **Event-driven** – reacts to changes in the system rather than polling continuously
- **Configurable** – parameters and thresholds are easily adjusted per installation

## Available Scripts

| Script | Description |
|--------|-------------|
| [scExtensions](scextensions/oversikt.md) | Core helper functions and shared utilities that other scripts depend on |
| [scFile](scfile/oversikt.md) | Read and write files from within the Ethiris scripting environment |
| [scSaveImage](scsaveimage/oversikt.md) | Automatically save still images from cameras when events occur |
| [scMail](scmail/oversikt.md) | Send email notifications directly from Ethiris |
| [scCameras](sccameras/oversikt.md) | Monitor camera status and network performance |
| [scSunRiseSet](scsunriseset/oversikt.md) | Control behaviors based on sunrise and sunset times |
| [scSNMP](scsnmp/oversikt.md) | Fetch and monitor SNMP values from network equipment |
| [scExportVideo](scexportvideo/oversikt.md) | Automatically export video clips when events occur |

## Getting Started

Most scripts require `scExtensions` to be loaded first — it provides the shared helper functions that other scripts rely on. Start by reading the overview for the script you want to use, then follow the installation instructions on its usage page.
