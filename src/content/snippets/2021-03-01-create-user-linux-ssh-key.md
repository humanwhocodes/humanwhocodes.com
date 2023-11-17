---
title: "Creating a new user with an SSH key on Linux"
author: Nicholas C. Zakas
teaser: "The various steps to successfully setup a new user with the best security."
categories:
  - Tutorial
tags:
  - Linux
  - Users
---

First, create a new user with `useradd`:

```bash
sudo useradd -m -d /home/username -s /bin/bash username
```

Next, set the user's password:

```bash
passwd username
```

**Note:** Even if you don't want the user to have a password, you should set the password to an empty string.

Then, create the user's `.ssh` directory:

```bash
mkdir /home/username/.ssh
```

And copy the user's public key into the `authorized_keys` file. This is a plain text file where you can paste one public key per line. Here's an example of downloading the public key from their GitHub profile:

```bash
curl https://github.com/<username>.keys > /home/username/.ssh/authorized_keys
```

After that, set up the correct permissions for both the `.ssh` directory and the `authorized_keys` file:

```bash
# ensure the directory ir owned by the new user
chown -R username:username /home/username/.ssh

# make sure only the new user has permissions
chmod 700 /home/username/.ssh
chmod 600 /home/username/.ssh/authorized_keys
```

Last, if you want the new user to have sudo access, be sure to add them to the `sudo` group:

```bash
sudo usermod -a -G sudo username
```

If you don't have a `sudo` group,  you can manually edit the `/etc/sudoers` file.
