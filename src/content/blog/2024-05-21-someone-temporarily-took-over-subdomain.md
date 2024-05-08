---
title: "How someone temporarily took over my subdomain"
teaser: "How an old DNS record set up my subdomain to be occupied by someone else."
author: Nicholas C. Zakas
categories:
  - Software
tags:
  - AWS
  - Cloud
  - DNS
  - Security
---

It all began with an email from Google Analytics. I tend to ignore most emails but the subject line drew my attention: “New owner for http://feeds.nczonline.net/”. I found this strange as my old domain, nczonline.net, just redirects to humanwhocodes.com. I opened the email to find the following:

![Email with subject "New owner for http://feeds.nczonline.net"](/public/images/posts/2024/ga-email.png)

I clicked on “Manage Users” and didn’t see this other email address listed. I clicked on “Don’t know this person” and was brought to a wonderfully useless documentation page. I tried posting a question in the forum but it was never answered. So, I decided this must not be anything to worry about and promptly forgot about it.

A week later, I started getting Google Analytics email warnings about the content of feeds.nczonline.net. That was the first time I actually typed feeds.nczonline.net into my browser and was met with the following:

![Page with "Slotgacor" as a heading and a cartoon panda with a "Register Now" button](/public/images/posts/2024/takeover-site.png)

That’s when it hit me: someone had taken over my subdomain. 

## What was going on?

At this point, my theory was that I might have forgotten to renew my nczonline.net domain. I thought this was unlikely because I do have it set to auto renew, but if my account had been hacked, who knew what might have happened? So I logged into my registrar to see that, in fact, my domain was still mine. 

Next, I checked the DNS records. I didn’t realize it, but the feeds CNAME was still up and pointing to an S3 domain (something like feeds.nczonline.net.s3-website-us-west-2.amazonaws.com). Ah ha! A couple of weeks ago I finally deleted my AWS account after being unable to figure out why I kept getting charged 21 cents each month. S3 buckets are globally unique so no one else could create a bucket with the same name until I deleted my bucket.

So, this person somehow discovered that feeds.nczonline.net was pointing to an S3 bucket that didn’t exist. Then, they created the bucket and started hosting their content under my subdomain.

## Google Analytics to the rescue

The scariest part of this whole situation is that I never would have found out about this takeover if the person hadn’t signed up for Google Analytics. Because I have a Google Analytics account for nczonline.net, I was automatically notified when someone registered feeds.nczonline.net. That’s the only reason I knew something was up.

Google Analytics lets anyone claim ownership of a site so long as they can insert a `<meta>` tag into the HTML that is hosted on that site.[^1] So all this person had to do after setting up their S3 bucket was insert the correct `<meta>` tag into the page and Google Analytics verified them as an owner. That’s the point at which I received the email from Google Analytics.

Now, the email was confusing and should have told me that someone had registered feeds.nczonline.net, a subdomain I had not registered with Google Analytics. Thanks to Owen Melbourne who let me know on Twitter[^2] to register the subdomain in Google Analytics to see this rogue user. It worked perfectly and also showed me how they managed to get verified as an owner (using the `<meta>` tag).

## Conclusion

It was a strange couple of days tracking down what exactly was going on with this old subdomain. I’m grateful that Google Analytics let me know that something was going on with my site, but I do wish there were more details in that email (or, at the least, some helpful documentation). I’m still curious as to how this person found my subdomain, as I just deleted my AWS account recently.

If you’ve ever done any website hosting on S3, or any other service that requires a CNAME record to a domain that you deleted, it’s a good idea to review your DNS settings to ensure you don’t have any zombie settings remaining.


[^1]: [Google Analytics Help - Verify your site ownership](https://support.google.com/webmasters/answer/9008080?hl=en#choose_method)
[^2]: [Owen Melbourne's tweet about registering subdomain in Google Analytics](https://x.com/OwenMelbz/status/1786666218650214617)
