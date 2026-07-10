# Slow connection to Ethiris Server after upgrade

Connecting to Ethiris Server from Ethiris Admin and Ethiris Client takes a long time after upgrading to Ethiris 11.0.0.1 or later.

## Introduction

In cases where Ethiris is deployed in an environment without internet access on the devices used for Ethiris Admin and Ethiris Client, and a default gateway and one or more DNS servers have been configured on these devices, a delay occurs when connecting to Ethiris Server. This happens both at startup and at other times when Ethiris Admin/Client needs to connect to Ethiris Server.

The problem has nothing to do with Ethiris itself, but is caused by Windows attempting to update so-called root certificates in order to validate the certificates used for secure communication via SSL. This happens even though the computer has no internet connection, which is why it takes as long as the timeout is set to — a little over 10 seconds.

## Solution 1 – Automatic in version 11.2 or later

From version 11.2 of Ethiris, Ethiris Admin and Ethiris Client will automatically detect the problem and suggest that Ethiris resolve it by updating the settings in Windows.

Click **Yes** to let Ethiris carry out the changes. A UAC prompt is shown — answer **Yes**.

A message confirming that everything went well is displayed, and the problem on this computer is resolved.

If you answer **No** or something fails, you can use Solution 2 or 3 instead.

## Solution 2 – Manual, remove DNS servers

If the network environment allows it, i.e. no local DNS names are used, the simplest solution is to remove the DNS servers specified on the network connection.

Go to the network adapter's TCP/IPv4 properties and clear the DNS server fields.

## Solution 3 – Manual, update the registry

[Download KB2020010901.zip](KB2020010901.zip){ .md-button }

1. Download the **KB2020010901.zip** file above.
2. After downloading, right-click the file and select **Extract All…**, then click **Extract**.
3. Right-click **KB2020010901.reg** and select **Merge** from the menu.
4. Click **Yes** on the UAC dialog that appears.
5. Click **Yes** on the next confirmation dialog.
6. Click **OK**.

No restart is required — the change takes effect immediately.
