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

Then, copy the contents of the user's public key into `/home/username/.ssh/authorized_keys`. This is a plain text file where you can paste one public key per line.

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
