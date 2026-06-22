---
title: "Use cloudflared for SSH and close port 20"
teaser: "Cloudflare tunnels can be used for SSH, meaning you don't need any open incoming ports on your VPS."
author: Nicholas C. Zakas
image: /images/posts/2026/cloudflare-tunnel-ssh.png
categories:
  - Networking
tags:
  - Cloudflare Tunnels
  - SSH
  - Security
  - VPS
---

Cloudflare Tunnels[^1] allow you to securely expose systems to the public internet. It works through a service installed on the server that is responsible for handling incoming traffic and associated authentication. Cloudflare stands between the public and your server, ensuring only those who are supposed to have access can actually get in. I personally use it to expose some services from my NAS over the internet so I can access them remotely.

Interestingly, you can also use Cloudflare Tunnels for SSH, meaning you can effectively call all incoming ports and just rely on outgoing ports via your tunnel.

## Step 1: Create the tunnel

The first step is to create tunnel, which you can do through the Cloudflare Dashboard. 

1. SSH into your server as usual -- you'll need to run some commands.
1. Go to the Cloudflare Dashboard[^2], under "Networking", click "Tunnels".
1. Click "Create Tunnel".
1. Type a name and click "Create".
1. Follow the setup instructions for your operating system.
1. Wait for Cloudflare to detect the tunnel is active.
1. Click "Continue".

With the tunnel created and working, the next step is to add your routes.

## Step 2: Add the SSH route

The next step is to set up the SSH route.

1. Click "Add Route".
1. Selected "Published Application".
1. Enter the subdomain you want to use (i.e., `my-saas-ssh`) and select the domain to use.
1. For "Service URL," enter `ssh://localhost:22`.
1. Click "Add Route".

You can also add routes to HTTP/HTTPS services running on the same server at this time.

## Step 3: Set up `cloudflared` locally

You'll need to install `cloudflared` on the machine you want to SSH from. Exit your SSH session and, assuming you are running Linux, run:

```shell
# Add cloudflare gpg key
sudo mkdir -p --mode=0755 /usr/share/keyrings
curl -fsSL https://pkg.cloudflare.com/cloudflare-main.gpg | sudo tee /usr/share/keyrings/cloudflare-main.gpg >/dev/null

# Add this repo to your apt repositories
echo 'deb [signed-by=/usr/share/keyrings/cloudflare-main.gpg] https://pkg.cloudflare.com/cloudflared any main' | sudo tee /etc/apt/sources.list.d/cloudflared.list

# install cloudflared
sudo apt-get update && sudo apt-get install cloudflared
```

**Important:** You don't want to run `cloudflared` as a service because you're not creating a tunnel. You just need it installed to run as your SSH proxy.

Then add a configuration to your `~/.ssh/config` that uses `cloudflared` as a proxy:

```
Host my-saas
    HostName my-saas-ssh.example.com
    User your-vps-sudo-username
    ProxyCommand cloudflared access ssh --hostname %h
```

Now you can SSH to your server via:

```shell
ssh my-saas
```

## Step 4: Block all incoming ports on the server

Now you can SSH back in and lock down your server, leaving no incoming ports open:

```bash
# Reset firewall defaults to block all incoming traffic
sudo ufw default deny incoming
sudo ufw default allow outbound

# OPTIONAL: If you want traditional SSH access as a backup, uncomment this line:
# sudo ufw allow 22/tcp

# Enable the firewall
sudo ufw enable
```

## Optional: Set up Zero Trust authentication

If you want extra security, you can also set up a Cloudflare Access Zero Trust[^3] application. This allows you to specify additional authentication that's required to access your server. Once set up, the first login of the day will be met with a URL to visit for further authentication.

[^1]: [Cloudflare Tunnel · Cloudflare Docs](https://developers.cloudflare.com/tunnel/)
[^2]: [Cloudflare Dashboard](https://dash.cloudflare.com)
[^3]: [Access | Zero Trust Network Access (ZTNA) solution | Cloudflare](https://www.cloudflare.com/sase/products/access/)
