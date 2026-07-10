# Sending email via SMTP from Ethiris Server

Settings for Ethiris Server to send email via SMTP.

## Introduction

This documentation contains information about SMTP settings for a number of common email providers, as well as a short example of how to test the SMTP connection.

## Prerequisites

- Ethiris Server must have at least license level **Basic**. It is not possible to send email with license level **Free**.
- You need access to an SMTP server, local or external.
- Intended for Ethiris version **11.2.0.3** or newer.

## Settings for connecting to an SMTP server

In Ethiris Admin, double-click **Email messages** under **Notifications**.

| Field | Description |
|------|-------------|
| Sender name | The name shown as the sender in the email messages. |
| Sender address | The email address shown as the sender address. |
| SMTP server | The name of the email server that handles outgoing email. |
| SMTP port | Normally 25 (default). Some servers use 465 or 587. |
| Use SSL | Check this if the SMTP server requires an encrypted connection on first contact. |
| Username | Used if the email server requires login. |
| Password | Used if the email server requires login. |
| Minimum send interval | Limit for how often email may be sent per defined message. Default: 120 seconds (introduced in Ethiris 13.0.0.1). |

!!! note
    The Ethiris email function supports SSL, TLS, and unencrypted communication.

## Email providers and SMTP settings

| Provider | SMTP server | Port | SSL | Username |
|-----------|-------------|------|-----|--------------|
| Gmail | smtp.gmail.com | 587 | No | Gmail account (xxx@gmail.com) |
| Gmail | smtp.gmail.com | 465 | Yes/No | Gmail account (xxx@gmail.com) |
| Microsoft 365 | smtp.office365.com | 587 | No | Office 365 account |
| Outlook | smtp-mail.outlook.com | 587 | No | Outlook account |
| Hotmail | smtp-mail.outlook.com | 587 | No | Hotmail account |
| Live | smtp-mail.outlook.com | 587 | No | Live account |
| Bahnhof | mailout.privat.bahnhof.se | 465 | Yes/No | Bahnhof email username |
| Telia | mailout.telia.com | 465 | Yes/No | Telia account |
| Telenor | smtp.bredband.net | 587 | No | Telenor account |
| Telenor | smtp.bredband.net | 465 | Yes/No | Telenor account |
| iCloud | smtp.mail.me.com | 587 | No | iCloud account (requires Ethiris 14.0+) |

!!! note
    "Yes/No" under SSL means that the option only needs to be checked for SMTP servers that require SSL initially.

## Testing the SMTP connection

1. Double-click **Users** under **Security** and add an email recipient (you do not need to check **Used**).
2. Double-click **Email messages** under **Notifications** and click **Add new email message**.
3. Configure a name, e.g. "TestMail", with subject, content, and recipient.
4. Save the server configuration in Ethiris Admin.
5. Open the **Script panel** under **Logic**, add the **Send** variable to the **Watch panel**, and double-click **Value** to set it to `true`.
6. Check your inbox (and spam folder).

## Troubleshooting

**Things to consider:**

1. Gmail accounts may be set to disallow "Less secure apps".
2. Some providers require two-factor authentication, which can cause issues.
3. iCloud/Apple requires an app-specific password — create it via your iCloud account.
4. Microsoft 365 may have "SMTP Client Authentication" disabled — this needs to be enabled in your Microsoft account.
5. Most SMTP servers require that the sender address matches the logged-in user account.

**Log for troubleshooting:**

Open the file `C:\Program Files (x86)\Kentima AB\Ethiris\WorkFolder\EthirisServerTrace.log` in a text editor and search for `#Error CMessenger`.

| Error code | Probable cause |
|--------|-------------|
| `SSL connection failed` | Try unchecking **Use SSL** — encryption is still negotiated if the server supports it. |
| `535 5.7.8 Username and Password not accepted` | Incorrect login credentials, or the server requires an app-specific password. |
| `Could not connect to SMTP server ... at port ...` | The SMTP server or SMTP port is configured incorrectly. |
