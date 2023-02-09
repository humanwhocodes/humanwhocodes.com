---
title: "How to regain Jenkins web access after being locked out"
author: Nicholas C. Zakas
teaser: "Jenkins authentication doesn't always perfectly, here's how to get back in when you've been locked out."
date: 2021-02-18
categories:
  - Programming
tags:
  - Jenkins
  - Continuous Integration
  - Automation
---

[Jenkins](https://jenkins.io) is a fantastic continuous integration tool that I've used on a variety of projects. One of its problems, however, is that sometimes authentication can get messed up (frequently via an authentication plugin) and you can end up locked out of the web interface. As long as you have access the Jenkins host, though, it's easy to regain access.

First, SSH into your host with an account that has `sudo` access.

Then, you need to open the `config.xml` file in your editor of choice:

```
$ sudo vi $JENKINS_HOME/config.xml

# or

$ sudo vi /var/lib/jenkins/config.xml
```

Look for this code in the `config.xml` file:

```xml
<useSecurity>true</useSecurity>
```

And change it to this:

```xml
<useSecurity>false</useSecurity>
```

Exit and save `config.xml`.

Keep in mind that this disable all authentication for Jenkins, which means anyone who can access the URL will have complete access. Only proceed to the next step when you are certain it is safe to do so.

The last step is to restart Jenkins:

```
$  sudo service jenkins restart

# or

$  sudo systemctl restart jenkins
```

At this point, your Jenkins instance is up and accessible through the web interface without any security. Go to `/configureSecurity` immediately to set up your security settings.
