---
title: Setting up Apache as a SSL front end for Play
author: Nicholas C. Zakas
permalink: /blog/2012/08/08/setting-up-apache-as-a-ssl-front-end-for-play/
categories:
  - Web Development
tags:
  - Apache
  - Play Framework
  - SSL
---
We&#8217;ve been using the Play Framework<sup>[1]</sup> on WellFurnished since the beginning and have been delighted with the results. If you&#8217;re unfamiliar with Play, it&#8217;s a Java based MVC framework that allows for rapid application development. I&#8217;ve honestly never use a framework that let me get up and running so quickly. It&#8217;s been a pleasure to work with and we generally use the recommended setup of having Apache as a front end to the Play server.

Recently, I have begun working on a WellFurnished login to store our own usernames and passwords, thus eliminating the need to have a Facebook account to login. We put this off initially because it was easier to use somebody else&#8217;s login system (and security) to start getting users onto the site. We always intended to create our own login system, but we wanted to make sure that we were spending the majority of our time on features and not on implementing something that you can pretty much get for free. Now that the time has come, I&#8217;ve been investigating SSL and how to use it with Play. It was a little bit trickier than I thought, and so I wanted to share the steps in case anybody else ran into the same issues.

## Basic setup

Before getting into SSL, it&#8217;s helpful to understand the overall setup and why it&#8217;s useful. The Play 1.X server is good but somewhat limited. It only recently gained SSL support and doesn&#8217;t have built-in support for gzipping of assets. As with most application servers, it&#8217;s pretty slow when serving up static content and is not designed to run on port 80 by default (it&#8217;s initially configured to run on port 9000). For all of these reasons, the documentation suggests using another server as a front end that listens to port 80, serves static assets, in general he talks to the world for Play. 

I chose to use Apache because I&#8217;m familiar with it but you could easily use nginx instead. Apache is installed on the same box as the Play server and acts as the gatekeeper to the box. Traffic coming in from a browser goes to Apache first and Apache talks to the Play server on behalf of the browser. When the Play server responds, it responds to Apache, which in turn responds to the browser. 

<p style="text-align: center">
  <a href="/images/wp-content/uploads/2012/08/architecture.png"><img src="{{site.url}}/blog/wp-content/uploads/2012/08/architecture.png" alt="" width="600" height="201" /></a>
</p>

This basic architecture works by using Apache as both a forward proxy, which accesses the Play server on behalf of the Internet, and a reverse proxy, which accesses the Internet on behalf of the Play server. Setting this up in Apache is fairly trivial, first make sure that `mod_proxy`<sup>[2]</sup> is enabled for Apache:

    sudo a2enmod proxy

Then add the following into your virtual host:

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:9000/
    ProxyPassReverse / http://127.0.0.1:9000/

Since Apache is acting as a proxy, the `Host` HTTP header sent with the request to the Play server would contain the internal name of the server rather than the original `Host` Header as sent from the browser. By adding `ProxyPreserveHost On`, Apache note is to keep the same `Host` header for the request to the Play server. The next two lines just set up Apache as a forward (`ProxyPass`) and reverse (`ProxyPassReverse`) proxy to the Play server. After that, you just need to reload Apache:

    sudo service apache2 reload

That&#8217;s all that&#8217;s needed to get Apache proxying between the Internet and the Play server.

## Enabling SSL on Apache

Play has built-in SSL support, but there is no reason to talk SSL directly to the Play server. After all, both Apache and the Play server are on the same box. Most setups with a forward proxy terminate the SSL at the proxy. That means a web browser uses SSL to talk to Apache but Apache talks to the Play server using plain old HTTP. Play is capable of determining that the request is secure or not using the `request.secure` flag, such as (Java):

    // in a controller
    if (!request.secure) {
        redirect("https://" + request.domain + request.url);
    }

This snippet of code redirects to the secure version of the page if the insecure version is accessed.

But before you can use that, you have to get SSL traffic going to the Play server. The first step in that process is to make sure that SSL support is enabled for Apache via `mod_ssl`<sup>[3]</sup>:

    sudo a2enmod ssl

After that, you have to make sure that Apache is listening on port 443 for HTTPS traffic (in addition to port 80 for HTTP). Edit the `/etc/apache2/ports.conf` to add the port information. Port 80 should already be listed, you just need to add another line:

    Port 80
    Port 443

Once that&#8217;s complete, restart Apache so that it will listen to port 443:

    sudo service apache restart

You now need to create a separate virtual host entry for port 443:

    <VirtualHost *:443>
        ProxyPreserveHost On
        ServerName www.example.com
    
        ProxyPass / http://127.0.0.1:9000/
        ProxyPassReverse / http://127.0.0.1:9000/
    </VirtualHost>
    

That sets up Apache to listen on port 443 for traffic and also sets it up as a forward and reverse proxy for the Play server. Note that there is no mention of HTTPS because Apache is speaking to the Play server using HTTP. 

Next, you need to enable SSL within the virtual host and provide the certificate and key files (assuming you already have them). These files can live anywhere but should not be in a publicly accessible location. You then reference them directly in the virtual host entry:

    <VirtualHost *:443>
        ProxyPreserveHost On
        ServerName www.example.com
    
        <strong>SSLEngine On
        SSLCertificateFile /etc/apache2/ssl/server.crt
        SSLCertificateKeyFile /etc/apache2/ssl/server.key
    
        <Location/>
            SSLRequireSSL
        </Location></strong>
    
        ProxyPass / http://127.0.0.1:9000/
        ProxyPassReverse / http://127.0.0.1:9000/
    </VirtualHost>
    

The `SSLEngine On` directive turns SSL on while the two others simply provide paths for the certificate and key files. After one more Apache reload, the server is now speaking SSL to the outside world and HTTP to the Play server. I&#8217;ve also added in `SSLRequireSSL` to the entire server, ensuring that regular HTTP requests will never be honored on port 443. There are several other options available in `mod_ssl` That you might want to look at, but this is enough to get started.

## One last step

At this point, the Play server is effectively being used over SSL with the SSL connection terminated at Apache. The setup works fine if you&#8217;re not doing anything tricky. However, there is one significant problem: `request.secure` always returns false. This makes sense from the Play server point of view because it is being spoken to using HTTP from Apache. Technically, the Play server is never handling a secure request. However, it&#8217;s important to be able to tell whether or not someone is connecting to your application using SSL or not, so this is not acceptable.

What you actually need is to forward along the protocol that was used to access the server. There is a de facto standard around the `X-Forwarded-Proto` header that is used with proxies. This header contains the original protocol (the forwarded protocol) of the request that the proxy received. The Play framework is smart enough to look for this header as part of its determination of `request.secure`. So you just need to add the header whenever request comes in via SSL.

To do that, make sure that `mod_headers`<sup>[4]</sup> Is enabled:

    sudo a2enmod headers

Then you can specify the header as part of your virtual host configuration:

    <VirtualHost *:443>
        <strong>RequestHeader set X-Forwarded-Proto "https"</strong>
        ProxyPreserveHost On
        ServerName www.example.com
    
        SSLEngine On
        SSLCertificateFile /etc/apache2/ssl/server.crt
        SSLCertificateKeyFile /etc/apache2/ssl/server.key
    
        <Location/>
            SSLRequireSSL
        </Location>
    
        ProxyPass / http://127.0.0.1:9000/
        ProxyPassReverse / http://127.0.0.1:9000/
    </VirtualHost>
    

The first line in the virtual host configuration sets the `X-Forwarded-Proto` Header for every request that comes through. The Play framework can look at this header to determine whether or not the request is secure. You need to reload Apache after making this change.

That might seem like the only change that&#8217;s necessary but there is one more that is a bit tricky to track down. Because it&#8217;s possible for multiple proxies to talk to a server, the server needs to distinguish between requests from a known proxy and an unknown one that might be trying to do harm. By default, the Play server doesn&#8217;t accept any headers beginning with `X-Forwarded` as truth because it can&#8217;t know for sure. You need to edit the Play `application.conf` file to add a list of known proxies in the `XForwardedSupport` key, such as:

    XForwardedSupport = 127.0.0.1

This example includes only localhost as a valid proxy for which `X-Forwarded` headers should be used. Once this is included, `request.secure` reads the `X-Forwarded-Proto` header to determine if the request is secure. Now everything in the stack is behaving correctly.

## Summary

This post took you through setting up Apache as a SSL front end for a Play application. As mentioned earlier, WellFurnished is currently using the 1.x version of Play, though expect to move to the 2.x version in the future. The Apache setup for handling SSL is fairly straightforward. If you would prefer to use nginx or another server as a front end, I suspect that setup would be roughly the same. The biggest sticking point for me when setting this up the first time was the last step, enabling `XForwardedSupport` for the application so that `request.secure` works as expected.

All of this work is going in so that we can have our own WellFurnished login and be less reliant on Facebook for handling that process. Stay tuned to WellFurnished for further details.

## References

  1. [Play Framework][1]
  2. [mod_proxy][2] (Apache)
  3. [mod_ssl][3] (Apache)
  4. [mod_headers][4] (Apache)

 [1]: http://playframework.org
 [2]: http://httpd.apache.org/docs/2.2/mod/mod_proxy.html
 [3]: http://httpd.apache.org/docs/2.2/mod/mod_ssl.html
 [4]: http://httpd.apache.org/docs/2.2/mod/mod_headers.html
