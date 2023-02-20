---
title: "How to setup and deploy a web application on Dokku"
author: Nicholas C. Zakas
teaser: "The path to set up a web application on Dokku is straightforward if you know the correct steps."
updated: 2021-05-07
categories:
  - Programming
tags:
  - Dokku
  - Docker
  - Web Applications
---

[Dokku](https://dokku.com) is a lightweight, Heroku-like utility for deploying web applications. While there is a quickstart, web-based UI for getting started, there are a bunch of steps you'll need to go through in order to get your application deployed.

## Create the app

The first step is to SSH into the droplet and create the application. I'll use the name `appname` for this post:

```bash
dokku apps:create appname
```

## Add a domain for the app

Dokku can use virtual hosts to identify which application to route a request to. You can [add a hostname](https://dokku.com/docs/configuration/domains/) to your application like this:

```bash
dokku domains:add appname app.example.com
```

Here, the hostname is set to `app.example.com`, so all requests coming in to that host will route to `appname`.

**Important:** Don't forget to setup the DNS settings for your hostname.

## Add a deploy key

If you are using your Dokku application in production, you probably want to [add a separate key](https://dokku.com/docs/deployment/user-management/#adding-ssh-keys) for a deployment account.

```bash
dokku ssh-keys:add KEY_NAME /path/to/key.pub
```

`KEY_NAME` is just the name of the key so you can refer to it later.

## Setup SSL

By default, your Dokku application will be running over plain HTTP without any SSL certificates. To enable SSL, you'll need to install the [Let's Encrypt Dokku plugin](https://github.com/dokku/dokku-letsencrypt). To enable Let's Encrypt on your Dokku application, follow these steps (credit: [Setup Dokku on Digital Ocean](https://www.robertcooper.me/setup-dokku-digital-ocean)):

```bash
# Install the plugin
sudo dokku plugin:install https://github.com/dokku/dokku-letsencrypt.git

# Set an email address for Let's Encrypt to use
dokku config:set --no-restart appname DOKKU_LETSENCRYPT_EMAIL=name@example.com

# Install Let's Encrypt for the given app
dokku letsencrypt appname

# Set a cron job to automatically renew Let's Encrypt certificates
dokku letsencrypt:cron-job --add
```

## Deploy your application

With all of that setup, you're now ready to deploy your application. To do so, add a Git remote that points to the Dokku location:

```bash
git remote add dokku dokku@app.example.com:appname
```

Then, you can deploy by pushing the code to Dokku:

```bash
git push dokku master
```

Dokku expects the primary branch to be `master`, so if your primary branch is `main`, then use this command:

```bash
git push dokku main:master
```

Enjoy your newly deployed Dokku app!
