---
title: Setting up multi-user Apache on EC2
author: Nicholas C. Zakas
permalink: /blog/2011/11/18/setting-up-multi-user-apache-on-ec2/
categories:
  - Personal
tags:
  - Amazon
  - Apache
  - EC2
  - Linux
  - Web Development
  - Web Server
---
Not too long ago, I wrote about how to [setup an EC2 instance in five minutes][1]. I&#8217;ve grown even more enamored with the how quickly I can create a server, maybe use it for just an hour or two, and then tear it down at a cost of a few cents. In one of my projects, a class needed a public-facing shared web server where people could upload files and access them from mobile devices. 

Knowing that Apache supports multi-user environments, I immediately went towards that solution. Unfortunately, and surprisingly due to the massive amounts of Apache documentation, I didn&#8217;t find an end-to-end tutorial on how to setup Apache for multiple users. I pieced together the configuration options and steps for creating users from multiple tutorials and pieces of documentation I found scattered around the web.

## Enabling user directories

The most useful part of multi-user Apache is the ability for every user to have a directory inside of their home directory where files are served to the public. This is typically done in the `public_html` directory, allowing you to access files via `/~username/` in a web browser. For example, the user `foobot` has a home directory of `/home/foobot` and a publicly-accessible web directory in `/home/foobot/public_html`. So `/home/foobot/public_html/index.html` is accessible from a web browser as `http://www.example.com/~fooboot/index.html`.

The default Apache configuration disables user directories by default, but it&#8217;s pretty simple to turn it back on. It just takes a few changes to the `httpd.conf` file, which is located at `/etc/httpd/conf/httpd.conf` on default EC2 configurations. There&#8217;s already a section in the file for setting up user directories, all you need to do is change the default settings so it looks like this:

    <IfModule mod_userdir.c>
        #
        # UserDir is disabled by default since it can confirm the presence
        # of a username on the system (depending on home directory
        # permissions).
        #
        UserDir enabled all
    
        #
        # To enable requests to /~user/ to serve the user's public_html
        # directory, remove the "UserDir disabled" line above, and uncomment
        # the following line instead:
        #
        UserDir public_html
    
    </IfModule>
    

The section immediately underneath defines any overrides for the user directories. If you want to allow the use of `.htaccess` in these directories, then make sure to provide the options here. This is the configuration I use to allow `.htaccess`:

    <Directory /home/*/public_html>
        AllowOverride All
        Options MultiViews Indexes SymLinksIfOwnerMatch IncludesNoExec
    </Directory>

Once you&#8217;ve made these changes, you need to reload the server configuration:

    sudo service httpd reload

Now the server is ready to support multiple users. All you need now is a few users.

## Creating users

Each user must have a `public_html` directory in their home directory with appropriate permissions set. The permissions necessary are:

  * The user&#8217;s home directory must have `711`.
  * The `public_html` directory must have `755`.

For any users you already have, you&#8217;ll have to manually create the `public_html` directory and set permissions appropriately.

In my case, I was creating completely new users, so I found a [script for creating users][2] and then modified it to create the `public_html` directory and set permissions appropriately (as well as fixing a minor bug). You must use `sudo` to run this script:

    #!/bin/bash
    # Script to add a user to Linux system
    if [ $(id -u) -eq 0 ]; then
            read -p "Enter username : " username
            read -s -p "Enter password : " password
            egrep "^$username:" /etc/passwd >/dev/null
            if [ $? -eq 0 ]; then
                    echo "$username exists!"
                    exit 1
            else
                    pass=$(perl -e 'print crypt($ARGV[0], "password")' $password)
                    useradd -m -p $pass $username
                    if [ $? -eq 0 ]; then
                        mkdir /home/$username/public_html
                        chmod 711 /home/$username
                        chmod 755 /home/$username/public_html
                        cp /home/temp/.htaccess /home/$username/public_html
                        chown -R $username /home/$username/public_html
    
                        echo "User has been added to system!"
                    else
                        echo "Failed to add a user!"
                    fi
            fi
    else
            echo "Only root may add a user to the system"
            exit 2
    fi

When run, this script prompts you to enter a username and password for a new user. It then creates the user as well as the `public_html` directory with the correct permissions. 

Once the user is created using this script, they can ssh into the server and use SCP to copy file into their `public_html` directory.

## Enjoy

Setting up a multi-user Apache environment is incredibly useful in situations where each user needs a separate web space. Common situations are professional and academic classes as well as professional organizations where developers need to be able to share things easily. A multi-user Apache environment behind a firewall is a nice alternative for file sharing as well.

 [1]: {{site.url}}/blog/2011/07/21/quick-and-dirty-spinning-up-a-new-ec2-web-server-in-five-minutes/
 [2]: http://www.cyberciti.biz/tips/howto-write-shell-script-to-add-user.html
