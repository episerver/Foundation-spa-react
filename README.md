<a href="https://github.com/episerver/Foundation"><img src="http://ux.episerver.com/images/logo.png" title="Foundation" alt="Foundation"></a>

## Foundation

Foundation offers a starting point that is intuitive, well-structured and modular allowing developers to select Episerver products as projects to include or exclude from their solution. 
Including as of now projects for CMS, Commerce, Personalization, Find and Social, with the rest to follow.

You can request a demo of the project by one of our Episerver experts on [Get a demo](https://www.episerver.com/get-a-demo/).

---

## Table of Contents

- [Foundation](#foundation)
- [Table of Contents](#table-of-contents)
- [System requirements](#system-requirements)
- [Pre-installation set-up](#pre-installation-set-up)
  - [SQL server](#sql-server)
  - [Licenses](#licenses)
  - [IIS settings](#iis-settings)
- [Installation](#installation)
- [Troubleshooting](#troubleshooting)
  - [General Issues](#general-issues)
  - [The installation fails](#the-installation-fails)
  - [The site does not start](#the-site-does-not-start)
- [Contributing](#contributing)

---

## System requirements

* Visual Studio 2017 or higher - [Download](https://visualstudio.microsoft.com/downloads/)
  * With the Node.js development package installed
* Microsoft Visual C++ Redistributable for Visual Studio 2019 - [Download](https://visualstudio.microsoft.com/downloads/)
* SQL Server Express or Developer or SQL Azure Server - [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (If using SQL Azure [download sqlcmd](https://docs.microsoft.com/en-us/sql/tools/sqlcmd-utility?view=sql-server-2017))
* Microsoft SQL Server Management Studio - [Download](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
* Node.js LTS (> 12.16.3) - [Download](https://nodejs.org/en/download/)
* Microsoft Internet Information Server (IIS) - [Download](https://www.iis.net/downloads)
* IIS Url Rewrite module - [Download](https://www.iis.net/downloads/microsoft/url-rewrite)

See also the general [Episerver system requirements](https://world.episerver.com/documentation/system-requirements/) on Episerver World.

---

## Pre-installation set-up

### SQL server

1. In Microsoft SQL Server Management Studio, connect to your SQL server:
![SQL server login](https://i.ibb.co/dW5n5wQ/SQLServer-Log-In.png)
2. Right-click on your server and select Properties.
3. Under **Security**, make sure that **SQL Server and Windows Authentication mode** is selected:
![SQL server authentication](https://i.ibb.co/2Sktyrb/SQLServer-Authentication.png")

### Licenses
1. Want to run the solution through IIS (not IIS Express)? You'll need an appropriate license obtainable from [license center](https://license.episerver.com/default.aspx)
2. The solution comes with Episerver Search & Navigation configured, these can be requested from the [Episerver Partner portal](https://www.episerver.com/partner/client-delivery-support/request-a-demo-account)

### IIS settings

How to find the IIS settings depends on the system where you are running IIS.

1.	Go to your IIS settings. If you are running IIS locally on your Windows machine, you find these under **Control Panel** > **Programs** > **Programs and Features** > **Turn Windows features on or off**. 
2.	Check that the following features have been enabled:
  *	Under Application Development:
    *	ASP .NET
    * NET Extensibility
    * ASP
    * ISAPI Extensions
    *	ISAPI Filters
  *	Common HTTP Features (Installed) node (all are required):
    *	Static Content (Installed)
    *	Default Document (Installed)
    *	Directory Browsing (Installed
    *	HTTP Errors (Installed) (Installed)
    *	HTTP Redirection
  *	Under the Performance (Installed) node:
    *	Static Content Compression (Installed)
    *	Dynamic Content Compression (Installed)
  *	Under the Security (Installed) node:
    *	URL Authorization (Installed)

![IIS settings](https://i.ibb.co/cNTmzc2/ISSSettings.png)

---

## Installation

The installation files on GitHub contain a batch file that will install the Foundation project with all products and set up an empty demo site. After the installation, you can fetch demo content from a remote repository to create a Mosey demo site, a fictitious fashion retail company.

1.	Download the ZIP file from the Foundation project's **master** branch on GitHub and extract the files, or clone the project from GitHub to a local folder using the command prompt and the git command ```git clone https://github.com/episerver/Foundation-spa-react foundation-spa-react``` (the _foundation-spa-react_ part specifies the folder where to put the files):

Download ZIP file

![Download Zip file](https://i.ibb.co/SB38p3z/Git-Hub-Zip.png)

Or clone project using Git

![Clone project](https://i.ibb.co/23tJmNm/Git-Cloning.png)

> **_Note:_** It is recommended that you store the project in a folder directly under C:, in a folder where your user has full access rights:

![Folder access rights](https://i.ibb.co/Wkcbr9m/Folder-Access-Rights.png)

2.	Right-click on the batch file called **setup.cmd** and select **Run as administrator**:

![Run batch file](https://i.ibb.co/SBFfLzt/Run-Batch-File.png)

3.	The installation starts and you are asked to provide the following parameters:

| Parameter | Description |
|-----------|-------------|
|Application name: | The name of the application. Note: The application name should contain only letters and numbers as it used as the prefix to create the website and database components.|
|Public domain name for foundation:| Domain name for the application, for example, foundation.com.|
|Public domain name for static html site: | Domain name for the static html  application, for example, html.foundation.com.|
|License path:| If you have a license file, add the path to it. Otherwise you can add that later.|
|SQL server name:| SQL server instance name. Add the same server name as the one you connected to in the [Pre-installation set-up](#pre-installation-set-up) steps for the SQL server. If using Azure SQL, provide the full dns name for your Azure SQL instance |
|sqlcmd command: | SQL command to execute, by default ```-S . -E ```. This can generally be left as is. If using Azure SQL, pass username and password as ```-U <user> -P <password>```|

![Build parameters](https://i.ibb.co/WcKGLVh/Build-Parameters.png)

4.	The build process executes a number of steps and logs both to the console and to the log files. The automatic build steps are:
```
•	Set permissions on the folder to everyone full control
•	Restore NuGet packages
•	npm install
•	gulp Saas task
•	Build solution
•	Install Databases
•	Create an application pool
•	Create a website
•	Update host file
•	Copy License file
•	Create connectionstrings files
•	Set the authentication to the default admin user, build and deploy the Spa.Frontend (Note:In production you will want to lock down the Foundation.SpaViewEngine.Controllers.DeployFiles API to only users you determine appropriate.)
•	Start the site to finish setup in browser
```
![Build progress](https://i.ibb.co/GvZBcYY/Build-Progress.png)

5. Running the setup command will open the application url in the default browser

## Troubleshooting
### General issues
* Modify src/Foundation/find.config to have your Search & Navigation Index information present
*	If the setup page throws an error, open your host file, found under **C:\Windows\System32\drivers\etc**, and add the domain name you entered during the installation. Reload the page in your browser.
![Example host file](https://i.ibb.co/Ss79b55/Host-File-Example.png)
* To confirm that the frontend is configured correctly:
  Open a terminal/powershell and navigate to the src/Spa.Frontend folder, run the following commands to deploy the first frontend version
    -  npm run-script login
    -  npm run-script build
    -  Restart the website
* If you experience difficulty logging in using /episerver/cms try using the path util/login.aspx and then try /episerver/cms again.
* Developer licenses for evaluation purposes can be obtained from the [Episerver License Center](https://license.episerver.com/). Place the **License.config** file in your webroot. 
* If you are **Building a new site**: Adjust the git repository to your own and .gitignore to include some of the configuration in the repository.
### The installation fails
* Check that you have full access rights to the project folder.
* Check that you meet [the system requirements](#system-requirements).
* Check your SQL authentication settings as described in [SQL Server](#sql-server).
* Check your IIS settings so that they match those specified in [IIS settings](#iis-settings).
* Check the log files:
  ```
  Build\Logs\Build.log
  Build\Logs\Database.log
  Build\Logs\IIS.log
  ```
### The site does not start
* Foundation does not include any website, pages or catalogs in its initial state, so it is not possible to start a site until you have imported or created content. Go to URL http://_yourdomainname_/setup to import content.
* Check that the site is actually running by navigating to http://_yourdomainname_/episerver/cms.

## Contributing
As this is an open-source project, we encourage you to contribute to the source code and the documentation. 

---
