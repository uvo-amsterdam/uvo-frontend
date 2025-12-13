# Deployment Guide

This guide explains how to deploy the application to our vps and configurations made to achieve this.

---

<!-- TOC -->
* [Deployment Guide](#deployment-guide)
  * [1. Overview](#1-overview)
    * [1.1. Setup](#11-setup)
    * [1.2 Domain Configuration](#12-domain-configuration)
<!-- TOC -->

---

## 1. Overview

For the deployment of our application, we utilize a VPS (Virtual Private Server) on [Hostinger](https://www.hostinger.com/) 
with a [Dokploy](https://dokploy.com/) panel to host the app environment. 
The deployment process involves steps, including setting up the server, configuring the application, and ensuring that 
it runs flawlessly in a 'production' setting.

### 1.1. Setup

**VPS Configuration**: We start by configuring our VPS on Hostinger, nothing specific is required beyond the default 
setup except choosing `Dokploy` as the OS.

**Dokploy Panel**: Next, we set up the Dokploy panel, it's the interface for managing our deployments.
First you will be prompted to create an account to log in to the panel. Once logged in, it's important to head to 
`Settings > Web Server` and add a domain to the webserver settings. This domain will be used to access the deployed 
`Dokploy` application. This is important because we want to ensure we can safely access our panel over https.

Once this is done head over to `Settings > Git` and choose GitHub as git provider. You will be
prompted to authorize `Dokploy` to access your GitHub repositories. It's important you enable the organization flag and
fill in `uvo-amsterdam` as organization name. Then you'll be redirected to GitHub to name & authorize the app.

> Note: Authorizing a GitHub app can only be done as organisation owner.

**Deployment**: Finally, we deploy the application using Dokploy, which handles the build and deployment process. Head 
towards `Projects > UvO Amsterdam > Create Service` to add your service. Select the type, name & create it.
Head over to the created service and under `General > Provider` select `GitHub`, and the created dokploy application as 
GitHub account (Dokploy-uvo-amsterdam) and choose the `main` branch. Configure your other settings as you see fit and 
finally click on `Deploy Settings > Deploy` to start the deployment process.

### 1.2 Domain Configuration

To make your application available via a custom domain, you need to set up DNS records. Wherever your domain is registered,
add 2 A records with name www and @ pointing to the IP address of your VPS. This ensures that when users enter your domain in their browsers, 
they are directed to your application hosted on the VPS.