# Send SMS with Teltonika – Overview

!!! info "License requirement"
    Using the plugin requires an Ethiris Premium license with the .NET plugin option.

Using a .NET plugin, Ethiris can send SMS messages directly from the system, without intermediate services or external SMS gateways. The plugin communicates with a Teltonika router via its built-in REST API and sends SMS through the mobile network the router is connected to.

## Why send SMS from Ethiris?

Email and alarm clients work well as long as someone is actively monitoring them, but an SMS reaches a phone directly even when no one is sitting in front of a screen or logged in to the system. That makes SMS particularly valuable in situations where a fast response matters, for example:

- **An alarm becomes active** – security staff, facility managers, or operations personnel get an immediate notification of an intrusion, fire, or technical alarm, wherever they are.
- **Motion detected outside office hours** – an SMS is sent immediately if motion is detected on the premises during evenings, nights, or weekends, when no one is expected to be present.
- **Escalation of unresolved alarms** – if an alarm remains active longer than expected, a follow-up SMS can be sent to a secondary contact or on-call person.
- **Operational issues** – SMS for things like a lost camera connection, full storage, or other technical deviations that require prompt attention.

Since SMS is sent via the router's own mobile subscription, the solution is also independent of the office's internet connection, making it robust against network outages where email-based notifications would otherwise fail to arrive.

## Which Teltonika routers are supported?

The plugin works with Teltonika routers running RutOS that expose the Web API / REST API. Using the API requires the following minimum firmware version:

| Router family | Minimum firmware version |
|--------------|-------------------------|
| RUT2, RUT9, RUTM, RUTC, TRB, and other families | 7.15 or later |
| RUTX family | 7.12 or later |

The SMS-sending functionality is part of **Mobile Utilities**, a built-in RutOS feature included on all of Teltonika's mobile routers (the RUT, RUTX, and TRB series) – it is not a separate package that needs to be installed via Package Manager, but a standard feature as long as the firmware requirement above is met.
