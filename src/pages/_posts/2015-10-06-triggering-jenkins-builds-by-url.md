---
title: Triggering Jenkins builds by URL
date: 2015-10-06 00:00:00
categories:
- Tutorial
tags:
- Jenkins
- Automation
- Builds
---

As you might have read not too long ago, I recently moved my site from Wordpress to Jekyll[1]. In so doing, I ended up using Jenkins[2] to periodically build and upload my site to S3. Having a Jenkins instance running turns out to be quite useful for all sorts of tasks and so I've been trying to take advantage of it to automate more of my routine tasks.

## The goals

Recently, I received some useful feedback from readers of my newsletter:

1. The default URL for archived newsletters looks suspicious. Here's an example: <a href="http://us11.campaign-archive2.com/?u=06398d19c8d37d8d6ba9d9cf7&id=7ab9b1fc75">http://us11.campaign-archive2.com/?u=06398d19c8d37d8d6ba9d9cf7&id=7ab9b1fc75</a>. Yeah, that looks pretty scary to anyone who knows anything about web security. I decided I'd try to figure out a way to generate an archive on my site.
1. Some folks wanted to subscribe via RSS instead of email. While Mailchimp does provide an RSS feed, it's of everything you send to a particular list. That means both my blog posts and newsletter updates are merged into the same feed, so I didn't have a feed of just newsletter updates. It seemed like having a feed could also help me with generating an archive page, so I decided this would be a nice first step.

Mailchimp supports webhooks, so it will post to any URL you want when it sends out an email. I wanted that to trigger generation of the archive page on my site so it would be available as soon as the email was sent. Jenkins allows you to trigger a build by posting to a URL, but it took me a little while to figure out exactly how to get this to work correctly.

**Note:** This assumes you're using Jenkins' own user database for user management rather than LDAP or another directory service.

## Step 1: Setting up a new user

Trigger a build via URL means that the Jenkins endpoint is open to anyone who can hit the server. Naturally, that means you want to ensure you've secured this endpoint as much as possible and the first step is to create a user with limited access to Jenkins. To create a new user:

1. Click on **Manage Jenkins**
1. Click on **Manage Users**
1. Click on **Create User**
1. Fill in the information for your user (I'll assume you've called this user "auto")
1. Click the **Sign Up** button

This will take you back to the user list.

## Step 2: Enable the URL job trigger

Go to the job that you want to trigger and click Configure to edit the job. Under Build Triggers, check the box next to "Trigger Builds Remotely". You'll be asked to provide a secure token for validation. This should not in any way be related to the "auto" user, so don't reuse the password. You might want to generate a new key using a tool like the Random Key Generator[3]. Click Save to save the job information.

![Jenkins User List]({{ site.url }}/images/posts/blog-jenkins-triggers.png);

## Step 3: Enable permission for "auto"

In order to allow "auto" to trigger the build, the user needs to have the following permissions set:

* Overall - Read
* Job - Build
* Job - Read
* Job - Workspace

To configure these permissions:

1. Click on **Manage Jenkins**
1. Click on **Configure Global Security**
1. Assuming you're using matrix-based security: add "auto" to the list and check off the boxes for the necessary permissions
1. Click **Save**

If you are not using matrix-based security, then this step is likely not necessary. Just make sure the "auto" user has the correct permissions.

## Step 4: Create the URL

In order to make an external call using the "auto" user, you'll need to use an API token. From the user list, click on the "configure" icon (the wrench and screw driver) next to the "auto" user.

![Jenkins User List]({{ site.url }}/images/posts/blog-jenkins-users.png);

Underneath the user's full name and description is a section labeled "API Token". Click on the "Show API Token" button. This will reveal the API token you need to provide when triggering a job by URL.

![Jenkins User Token]({{ site.url }}/images/posts/blog-jenkins-user-token.png);

With this information, you can now create a URL that looks like this:

```
http://auto:8702d1cb53a83f8748d9433ebca494fb@your-jenkins.com/job/JobName/build?token=iFBDOBhNhaxL4T9ass93HRXun2JF161Z
```

Note that "JobName" should be replaced with the job name you're triggering. The correctly escaped version of this URL is shown when you set the authentication token (step 2).

This URL has three key pieces of information:

1. The username "auto"
1. The API token (after the colon)
1. The authentication token

All three must be correct, and the permissions for the user must be correct in Jenkins, in order for this URL to trigger the job. In order to trigger the job, you must send a POST request. You can test it out using cURL:

```
curl -X POST http://auto:8702d1cb53a83f8748d9433ebca494fb@your-jenkins.com/job/JobName/build?token=iFBDOBhNhaxL4T9ass93HRXun2JF161Z
```

Once you send the request, log in to Jenkins and verify that the job is running. You can then use this URL for most webhooks.

## Conclusion

I now have a job triggered remotely whenever Mailchimp sends an email. The script downloads the newsletter RSS feed, filters out blog posts, and generates an HTML archive page on my site. The most time-consuming part of the process was going setting up Jenkins to build via URL, as the resources I found online all had pieces of information missing. I hope that this post helps others make progress faster.


1. [From Wordpress to Jekyll: My new blog setup](https://nczonline.net/blog/2015/08/wordpress-jekyll-my-new-blog-setup/) by me (nczonline.net)
1. [Jenkins](https://jenkins-ci.org/) (jenkins-ci.org)
1. [Random Key Generator](http://randomkeygen.com/) (randomkeygen.com)
