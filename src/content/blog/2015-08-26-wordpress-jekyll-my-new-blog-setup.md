---
title: "From Wordpress to Jekyll: My new blog setup"
date: 2015-08-26 00:00:00
categories:
- professional
tags:
- Blog
- Jekyll
- Nginx
- AWS
- S3
---

I had been thinking about moving my blog from Wordpress to Jekyll for a while. I was hesitant because I didn't know a lot about how Jekyll worked and wasn't sure if I'd ultimately want to have my site hosted on GitHub or not. I also was concern about not having the ability to schedule posts in the future. I used this feature quite frequently in Wordpress, especially as my energy goes up and down while battling Lyme disease. To me, not being able to schedule a post for later publishing was a deal-breaker, as I didn't want to manually push posts live all the time.

Looking over my hosting bill, however, made me realize I was severely overpaying for hosting my mostly-static-already site using Wordpress. I was paying $50 per quarter, or about $17 per month. In this day and age, that's an insane amount of money to pay for hosting a site that barely ever changes. I had been with this webhost for over a decade and the price had remained the same the entire time. Plus, the numerous Wordpress upgrades and countless security flaws were making me feel it was time to abandon Wordpress for a static site generator. So, I set about creating a plan to move my Wordpress-driven site to Jekyll.

## Migrating comments

The first step in this process was to migrate my comments to [Disqus](https://disqus.com/). While I'm not a huge fan of Disqus, it was the simplest choice due to its ability to quickly integrate with Wordpress and then continue to function on a static site.

I started by installing the [Wordpress Disqus Plugin](https://wordpress.org/plugins/disqus-comment-system/), and it seamlessly integrated into my site. I then kicked off importing the comments into Disqus, only to find that this didn't quite work. I ended up needing to [manually import](https://help.disqus.com/customer/portal/articles/466255-importing-comments-from-wordpress#manual) comments, as the Disqus plugin only seemed to import a small number of comments each time I initiated it.

## Exporting posts

Once I was certain the comments were safely migrated to Disqus, I looked for the best way to export the rest of my content. I eventually ended up using the [Jekyll Exporter Plugin](https://wordpress.org/plugins/jekyll-exporter/) for Wordpress. After installation, you need only click "Export to Jekyll" to download a zip file of all content. I was impressed by this plugin's completeness as it included all tags, categories, permalinks, posts, and pages. Basically, you can unzip the result and serve that as a starting point for your converted site. It even copies files from your `wp-content` directory so you can keep track of images, stylesheets, and more.

The only thing the Jekyll exporter didn't do was provide any sort of layout from Wordpress. That makes sense, since all the layout information in Wordpress is in PHP. So, I had to manually grab the HTML from my Wordpress theme and migrate it over to Jekyll templates. I then put the Disqus JavaScript into the pages and was amazed to find that the comments all appeared.

## Choosing a host

Initially I thought I would take advantage of GitHub Pages to host my site, as I know many others do. However, there were a few things I didn't like:

1. The aforementioned inability to schedule posts to be published in the future. Since GitHub doesn't give you a way to force-regenerate a site, that would mean either holding out posts until the day they are supposed to be published or else creating a dummy commit to force the site to regenerate. Neither of those appealed to me.
1. You can only use Jekyll plugin gems that GitHub has installed, so any additional functionality you want either needs to be hacked together or omitted. In my case, I wanted to generate yearly and monthly archives automatically. There's a [`jekyll-archives`](https://github.com/jekyll/jekyll-archives) gem for that but it's not available on GitHub.
1. I wanted a test area where I could preview changes before pushing live. I could do that locally but since I'm on Windows, setting up Jekyll is pretty difficult (I've tried and given up three times). I could also have a separate GitHub repo for that purpose, but I really didn't want to have to manage two repos.

After doing some research, I realized I could host my static site on Amazon S3 for almost nothing the next year using the free tier. After that, the cost looks to be less than a dollar a month. So far, a significant savings from the $17 per month that I was paying for Wordpress hosting. Plus, S3 would serve as a solid backup for all of my content.

## The deployment pipeline

![Deployment pipeline - GitHub to Jenkins to S3](https://www.nczonline.net/images/posts/blog-deployment-pipeline.png)

Once I decided on S3 hosting, it became a matter of figuring out how to get the posts from the GitHub repository onto S3 and also how to schedule posts. It turned out the solution to both problems was the same: setup a [Jenkins](https://jenkins-ci.org/) server.

In my mind I devised a simple strategy:

1. Check in files to git repo locally
2. Trigger a build when changes are pushed to master
3. The build checks out the remote git repo and runs Jekyll to generate the files
4. The build syncs the generated files with the files already on S3

If I could get that working, I reasoned, then I could set the same build to run automatically at midnight every night. That meant I could schedule posts for any point in the future and they would get generated only when appropriate.

I leaned heavily on the article, [Trigger Jenkins builds by pushing to GitHub](http://fourword.fourkitchens.com/article/trigger-jenkins-builds-pushing-github), to get my setup working. I used a micro instance on AWS because it's free for the first year, though I'll likely switch to DigitalOcean after the first year ($5 per month vs. roughly $10 per month for an on-demand micro AWS instance).

I ended up using [S3Cmd](http://s3tools.org/s3cmd) for syncing with S3. I tried using the [AWS CLI](https://aws.amazon.com/cli/) first, but its syncing capability is limited to file size and last modified date. Since each build is regenerating the entire site, the last modified date was always different and so the files were always being synced even though they were no different. S3Cmd, on the other hand, also checks the content of the file to see if there's a difference before syncing. That one change meant I went from 2,000 PUT requests each build to roughly three PUT requests on average.

Ultimately, the Jenkins setup has worked well. The same build is triggered by a push to the GitHub repo's master branch and automatically at midnight each night. By setting `future: false` in my `_config.yml` file, any future posts I write will not be generated until the correct date. I'm using tha latest GitHub Pages gem, so the configuration is compatible with what's being used on GitHub itself.

## Serving traffic

![Serving Traffic - CloudFlare to Nginx to S3](https://www.nczonline.net/images/posts/blog-serving-traffic.png)

Initially, I thought I'd be able to serve all traffic directly from S3. While possible, S3 does not compress files automatically, so all of my HTML, CSS, and JavaScript would be sent in its original form (thus using more bandwidth and costing me more). I first looked at using Cloudfront, the AWS CDN service, to front S3. However, Cloudfront also does not do any compression of requests (which shocked me).

Several people on Twitter recommended using [CloudFlare](https://cloudflare.com) instead. CloudFlare does compression of assets, along with other optimizations, DDoS protection, and free SSL, and they have a free tier. Even better, CloudFlare caches requests on their CDN for a specified amount of time, meaning that I'll be avoiding more requests to S3 than necessary (another cost savings).

Unfortunately, being new to S3 hosting, I made a rookie mistake: I named my buckets wrong. I was unaware that the bucket name must be the domain name you want to serve the content (a restriction I find strangely arbitrary). My initial bucket was named "nczonline", so I created a new one named "nczonline.net". The big mistake is that I did not create a bucket named "www.nczonline.net", and that was apparent to anyone who visited my site during the transition thanks to some misconfiguration. During that time, someone created a bucket named "www.nczonline.net", and since bucket names are universal, that meant I no longer could. That also meant I couldn't serve traffic directly from `www.nczonline.net` to S3 due to the AWS naming restrictions. I could serve from `nczonline.net`, but I had that setup to redirect to `www.nczonline.net` in order to make use of free email forwarding (that apparently couldn't work with the apex domain set as a CNAME).

I didn't want to abandon the idea of serving from S3, so I realized I needed something in between CloudFlare and S3 to make the S3 requests in such a way that would allow serving from `www.nczonline.net`. I ended up setting up Nginx on the same AWS micro instance and used that as a proxy to S3. After some trial and error, I realized that S3 was simply looking at the `Host` header to determine whether it should serve traffic or not, so I was able to work around that pretty easily with the following configuration:

```
server {

    # Listen for traffic - old school and new
    listen 80 default_server;
    listen [::]:80 default_server ipv6only=on;

    # Setup the hostnames that are allowed for this server
    server_name nczonline.net www.nczonline.net;

    # Proxy all requests to AWS
    location / {
        proxy_set_header Host nczonline.net;
        proxy_pass http://nczonline.net.s3-website-us-west-1.amazonaws.com/;
    }
}
```

With Nginx set up to point to S3, I pointed CloudFlare at Nginx, and my site was finally working correctly. As a bonus, Nginx compresses HTML, CSS, JavaScript, etc. automatically, so I got some additional cost savings.

At this point, I could have simply pointed my domain name to Nginx and used that without CloudFlare. However, CloudFlare's edge caching, DDoS protection, and free SSL features (plus the cost: free) led me to believe that it was still advantageous to use.

## Worth it?

Setting up this system was a bit more work than I expected, but I definitely think the effort was worthwhile. I learned a lot about AWS, GitHub, and Jenkins. I now have a much better understanding of the tradeoffs you make when serving content from S3, as well as the various restrictions. Mostly, though, I'm happy that I'm in complete control of the stack for my blog. Using Wordpress always made me a bit scared - performance issues, database corruption, and security holes were always on my mind. Plus, I hated the idea of my content being stuck in a database somewhere. I do most of my writing in Markdown these days, so having my site content in that format and versioned in a git repository was the idea that most appealed to me. No matter what happens, I'll always have easy access to that content.
