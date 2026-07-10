# Service account in Active Directory for Single Sign-On

Setting up a service account in an Active Directory to give Ethiris Server sufficient rights for Single Sign-On (SSO).

## Introduction

Version 13.0 of Ethiris introduced the ability to set up Single Sign-On (SSO) for Ethiris systems. This means that the user currently logged in to Windows, on the computer where Ethiris Client is started, is automatically logged in to Ethiris with the same user.

**Prerequisites for SSO:**

- License level Premium or Universal function level 6.
- Both the Ethiris Client computer and the Ethiris Server computer must be members of the same domain.
- Ethiris Server must have sufficient rights to query Active Directory (AD) for information about the logged-in user.

The recommended method for giving Ethiris Server these rights is to set up a specific service account in AD.

## Step 1 – Add a service account in AD

1. Start **Server Manager**.
2. Select the **Tools** menu.
3. Select the **Active Directory Users and Computers** option.
4. In the dialog, right-click **Service Accounts** in the current domain and select **New → User**.
5. Enter a name for the user account, e.g. `sa-ethiris`. Click **Next**.
6. Enter a password. Recommendation: check **Password never expires** to avoid having to change it in the future. Click **Next** to create the account.

## Step 2 – Delegate control to the account

7. Right-click the **current domain** and select **Delegate Control…**.
8. A wizard starts — click **Next**.
9. Click the **Add** button.
10. Enter the name of the new user account, e.g. `sa-ethiris`. Click **Check Names** to verify, then **OK**.
11. Click **Next**.
12. Select **Delegate control of the following common tasks** and check **Read all user information**. Click **Next**.
13. Finish the wizard by clicking **Finish**.

## Step 3 – Specify the account in Ethiris Admin

14. In Ethiris Admin, double-click the Ethiris Server that should allow SSO.
15. On the **Server** tab, check **Allow clients to log in with SSO**.
16. Enter **Domain\User** and the corresponding **Password** for the service account, e.g. `Kentima\sa-ethiris`.
