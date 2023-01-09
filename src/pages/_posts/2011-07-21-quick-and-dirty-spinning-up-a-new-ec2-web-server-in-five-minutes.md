---
title: "Quick and dirty: Spinning up a new EC2 web server in five minutes"
author: Nicholas C. Zakas
permalink: /blog/2011/07/21/quick-and-dirty-spinning-up-a-new-ec2-web-server-in-five-minutes/
categories:
  - Web Development
tags:
  - Amazon
  - EC2
  - Web Development
  - Web Server
---
One of the things I've become more adept at in my new life is dealing with the dizzying array of Amazon web services. The two parts of the Amazon kingdom that I've really enjoyed using are S3, their RESTful redundant storage solution, and EC2, the on-demand virtual machine system. Recently, I was in a situation where a bunch of us needed a web server quickly and I was able to get an EC2 instance up and running in a few minutes. Okay, to be fair, it took me a little longer than it will take you because I made a couple of mistakes, but now I can easily spin up a new EC2 instance with a basic web server in five minutes.

## Create a security group (1st time only)

Go to the AWS console and click on the EC2 tab. On the lower-left is an option called Security Groups, click on that to bring up your current security groups. There is usually a default security group that allows SSH and nothing else.

<div style="text-align: center;">
  <img src="/images/posts/2011/07/securitygroup.png" alt="Create Security Group button" width="460" height="110" />
</div>

Click the &#8220;Create Security Group&#8221; button and give the group a name and description. When it shows up in the list, click the name and you'll see two tabs towards the bottom of the screen. Click on the Inbound tab, which is where you create the security rules. You want to enable SSH and HTTP only at this point (you may choose to add more later).

  1. Select &#8220;HTTP&#8221; from the dropdown and then click &#8220;Add Rule&#8221;. You'll see the rule added to the right side of the panel.
  2. Select &#8220;SSH&#8221; from the dropdown and click &#8220;Add Rule&#8221;.
  3. Click the &#8220;Apply Rule Changes&#8221; button to apply both of these rules.

Now this security group is ready for your new web server.

<div style="text-align: center;">
  <img src="/images/posts/2011/07/securitygroupinfo.png" alt="Setting up security group ports" width="500" height="221" />
</div>

<span style="font-size: 20px; font-weight: bold;">Create keypairs (1st time only)</span>

On the same EC2 tab, there's an option on the lower-left called &#8220;Keypairs&#8221;. Keypairs are used to secure your EC2 instance so that only you can access them. If you don't have an existing keypair to use, you can create a new one by clicking the &#8220;Create Keypair&#8221; button. This will prompt you for a name and then immediately start a file download of a file with .pem as its extension. Keep this file safe because you'll need it to access your EC2 instance.

<div style="text-align: center;">
  <img src="/images/posts/2011/07/keypair.png" alt="Create keypair button" width="460" height="110" />
</div>

Keep in mind that you will never be able to retrieve this .pem file if you lose it. You'll need to delete the keypair and create a new one.

## Create the virtual machine

Click the Instances option on the right side of the EC2 tab. Click the Launch Instance button after which you'll be asked to select which AMI to use. I always just use the first one, Basic Amazon Linux 32-bit AMI, though you may choose another if your needs are different.

<div style="text-align: center;">
  <img src="/images/posts/2011/07/instance.png" alt="Create new EC2 instance button" width="460" height="110" />
</div>

If you don't have any special needs for this box, you can keep all of the defaults on the two Instance Details screens. The one you may want to change is the type of VM (Micro, Small, Large), depending on your memory and computing needs. When it comes to the screen for adding tags, just fill in the name with something that makes sense (i.e. &#8220;Test Server&#8221;) so you can identify this instance in the AWS console.

The next steps are to to select the keypair  and the security group. These should be the ones you already created previously (you can create new ones on the fly, but usually you won't need to).

The last screen has a button called &#8220;Launch&#8221;, which will create and start up the VM. Watch the console to see when your VM is ready.

## Setting up your virtual machine

Now that the VM is up and running, you can log in using the .pem file saved from creating the keypair. Amazon will automatically assign a domain name to the VM, which you can see by right-clicking on the instance in the AWS console and selecting the &#8220;Connect&#8221; menu option. This will show you to connect to the VM using a command similar to this:

    ssh -i yourfile.pem ec2-user@<span>ec2XX-YYY-ZZZ-X.compute-1.amazonaws.com</span>

If all went well, you'll now be in the command prompt for the VM.The first thing to do is update yum:

    sudo yum -y update

Both Apache and MySQL are already installed on the VM, so you don't need to do anything for those. If you want PHP and PHP support for MySQL, then run the following:

    sudo yum install php
    sudo yum install php-mysql

With those installed, it's now time to start Apache running this command:

    sudo service httpd start

The root of your web server is in `/var/www/html/`, so just drop an index.html file into this directory and you should be able to access the site by typing in the name of your EC2 instance into a browser.

That's really all there is to it. You can now put additional files into `/var/www/html/` and build up your site.

## Set services to start automatically (optional)

If you plan on shutting down and starting up the VM on a regular basis, you may want to set Apache and/or MySQL to automatically when the system boots up. To ensure Apache automatically starts, use:

    sudo /sbin/chkconfig httpd on

If you also want to start MySQL at boot time, run this:

    sudo /sbin/chkconfig mysqld on

Now, both Apache and MySQL will start up when you start up the VM.

## Wrap up

Creating new instances on Amazon EC2 is incredibly easy and fast when you need a development server in a hurry. The best part is that you pay only for what you use, so running a server for a few hours means paying a very low fee for that usage. I'm now in the habit of spinning up new servers that I may use for a day, or a few days, and then deleting them when I no longer need them. Having this flexibility is an incredibly powerful tool for development, and I hope this post helps you come to this same conclusion.
