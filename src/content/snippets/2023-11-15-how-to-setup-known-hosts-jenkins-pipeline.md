---
title: "How to setup a known_hosts file for a Jenkins pipeline job"
author: Nicholas C. Zakas
teaser: "The builtin Git Host Key Verification for Jenkins doesn't work in pipeline jobs. Here's what to do instead."
categories:
  - Programming
tags:
  - Jenkins
  - Continuous Integration
  - Automation
---

[Jenkins](https://jenkins.io) pipelines are a great way to programmatically describe your build steps. Unforunately, that power also comes with responsibility, as a lot of the built-in Jenkins functionality may not work the way you imagine. Specifically, the Git Host Key Verification setting for Jenkins isn't used with pipeline jobs, making it common to get "Host key verification errors" when using Git. If you're using Git in a pipeline job, you'll need to set up your own `known_hosts` file.

First, SSH into your host with an account that has `sudo` access.

Then, make sure you have a `known_hosts` file that has all of the host information already present. In my case, I needed to add the keys for `github.com`, so I used this (via [GitHub blog](https://github.blog/2023-03-23-we-updated-our-rsa-ssh-host-key/)):

```sh
curl -L https://api.github.com/meta | jq -r '.ssh_keys | .[]' | sed -e 's/^/github.com /' >> ~/.ssh/known_hosts
```

Next, verify that `/var/lib/jenkins/.ssh` exists. If it doesn't, then create it like this:

```sh
# create directory
sudo mkdir /var/lib/jenkins/.ssh

# ensure the directory is owned by the Jenkins user
chown -R jenkins:jenkins /var/lib/.ssh
```

Copy your `known_hosts` file over:

```sh
sudo cp ~/.ssh/known_hosts /var/lib/jenkins/.ssh
```

At this point, your Jenkins pipeline job has access to the new `known_hosts` file so you should be able to run it without any problem.
