---
title: Why I'm not using your open source project
date: 2015-12-15 00:00:00
categories:
- Personal
tags:
- Open Source
- Maintainability
- Software Design
---

When you think of open source software, you might think of a few specific projects depending on your area of interest. If you work on web applications, the term "open source" might conjure up visions of Apache or Node.js; if you're into big data, then perhaps Hadoop comes to mind; if you care a lot about security, you might think of OpenSSL; if you're a front-end developer, then maybe jQuery and React pop into your head. In all cases, you're thinking about those projects that have succeeded and, to some degree, achieved a level of ubiquity in their respective arenas. It's with this success in mind that a lot of open source authors venture out, sharing their code with the hopes of reaching a similar level of success and ubiquity.

There's a peculiar mix of altruism and egotism that goes into releasing an open source project. On the one hand, you might be solving a problem that others are struggling with, and sharing your solution will save them a lot of time. On the other, the near-fantastic rock star status of those who have created successful open source projects (think John Resig, Ryan Dahl, and Linus Torvalds) drives people to overshare in the hopes of also achieving such status. This has resulted in a glut of open source projects being released into the wild and their creators venturing out on marketing campaigns to attract users.

You need to be aware of this trend and the reality of open source today: most open source projects are crap, and you need to be careful which ones you use.

**Note:** For the purposes of this post, the term "use" refers to including the project in your application.

## Background

As the maintainer of a reasonably popular open source project (ESLint[1]), and an architect at Box, I make a lot of decisions around which open source projects should be used in some widely-used applications. I end up investigating some open source project roughly once a week, and most of the time, end up pretty disappointed with what I find. I want to use open source code as much as possible, but I can't do it at the expense of maintainability, security, or a whole host of other concerns. Replacing a working custom-built solution with an open source one sounds like an easy win, but in reality, could cause a lot of problems if the wrong open source project is used.

This post contains the top issues I find in open source projects that cause me to reject their usage.

## Your project doesn't have a license

This might seem basic, but there are a significant number of open source projects that are published without a license. Simply saying "this is open source" doesn't make it so, nor does sharing your code publicly on GitHub or BitBucket automatically mean it can be used. Any code that doesn't explicitly have a license specified is considered "all rights reserved" by the author (this is standard copyright law in the United States[2]). That means you don't have any legal right to use, reproduce, distribute, or otherwise use the code without the consent of the author.

If the project seems promising and passes the other checks I use (see below), then I might contact the author and ask for a license to be added. I absolutely won't use a project that doesn't have its license terms explicitly defined in the source code repository, so I also will not accept just an email from the author granting me a license.

**Takeaway:** When you publish your project, make sure you have specified a license. Include a `LICENSE` file in the repository and mention the license in your `README`.

## Your project is GPL/LGPL licensed

Many credit GPL with the rise in popularity of open source as well as the success of Linux. For those unaware, the GPL has a clause that allows anyone to use the project in its compiled form with no repercussions but if you modify the source code or include it in another project then you must open source that as well. The exact text is as follows[3]:

> You must cause any work that you distribute or publish, that in whole or in part contains or is derived from the Program or any part thereof, to be licensed as a whole at no charge to all third parties under the terms of this License.

So when you license code as GPL, that license becomes viral whenever you distribute it, which means including the code in your own open source project. That is a showstopper for businesses wishing to incorporate code from these projects. (You can still safely use the code locally, such as running Linux on a server or using a build-time tool. It's just including the code in your application that can be problematic.)

The LGPL[4] slightly modifies the terms of the GPL such that you can link to the project so long as the application doesn't contain any actual code from the project itself. Here's the relevant clause:

> A program that contains no derivative of any portion of the Library, but is designed to work with the Library by being compiled or linked with it, is called a "work that uses the Library". Such a work, in isolation, is not a derivative work of the Library, and therefore falls outside the scope of this License.

That means your open source project can link to a LGPL library without triggering the viral clause of the GPL, making it safe to use in business.

However, most of the code I deal with is not compiled. JavaScript, Python, PHP, CSS, etc., are a significant gray area because there is no distinction between the source code and the distributed artifact - they are one in the same. If I use a GPL or LGPL JavaScript library that is sent to the browser as part of my application, does that count as distribution? I've asked a couple of lawyers about this and the general response I've received is, "this is definitely a gray area that hasn't been decided by the courts." Perhaps someday someone will bring such a case to the courts and we can know for sure, but in the meantime, I just don't use GPL or LGPL projects.

**Takeaway:** If you can choose a more permissive license for your project than GPL or LGPL, please do.

## You aren't maintaining the code

It seems that a lot of people see open sourcing something as the pot of gold at the end of the rainbow. They worked hard on some code and the payoff is fame and appreciation from an adoring crowd. But how many of those projects will be around in six months? A year? Is the project something you're committed to maintaining, or was it just a passing fancy? Why would I want to use that project? It was interesting to you this weekend, but if I come to rely on it, can I count on you continuing to update it?

When evaluating a project, I typically look at:

1. When was the last commit?
1. Are there responses to the most recent issues?
1. When was the version released?
1. Are pull requests being merged at all?

These all tell me how well the project is being maintained. If the most recent commit is a year ago, then I'm pretty sure no one is maintaining it. The larger the project, the more this means the project is likely abandoned. Further, it likely means the author hasn't really thought about the project in a while and might not even remember all of how it works (both bad signs). The smaller the project, the shorter the timeframe I consider (a project with one author and zero commits in three months is likely abandoned).

Similarly, the activity in issues and pull requests says a lot. Is the author engaging with people at all? Open to accepting feedback and patches? And are those turned around into new versions? If I'm going to rely on something, I need to know that either the author will fix problems or my patches will be accepted when I find problems.

Periodically I'll get people telling me that they'll maintain something if I use it. That's a nice though, but saying you'll maintain something is very different from actually doing it. I prefer to see a track record of maintenance happening regardless of my involvement.

**Takeaway:** If you're unsure that you want to work on this project for more than a year, think twice before encouraging people to adopt it. Don't lead them down a dead end. Build up a pattern of maintaining your code and let that speak for itself.

## You don't have documentation or tests

I group documentation and tests together because they are similar: documentation describes how the end user should use the project and tests describe how the project should technically work. If a project is missing either of these or both, then I don't consider it worth my time to investigate. A lack of documentation means I need to dig through the code to figure out how to use it and a lack of tests means there's no way to tell when something breaks. Both situations are dire if you intend to rely on the functionality in a product.

**Takeaway:** Make sure you have documentation and tests for at least the core parts of the project.

## You aren't using the project

This is an interesting occurrence in the world of open source: people who don't use the projects they create. Sometimes, this the result of an open source project that began as a weekend hobby project and the author doesn't want to leave the source code to die on their computer. Instead, they open source it with the hope of "letting it live," like releasing an animal into the wild. I frequently see people announcing such projects on their Twitter stream, proudly proclaiming that this project they spent 48 hours on is now ready for use. They themselves aren't using it in any product or in any way that could be considered "production," but they would like you to do so.

Weekend projects might be fun to play with, but relying on them for something important is placing a huge bet on an unknown quantity. I generally prefer to use projects that others are already using. The reason is simple: the more production-like places the project is used, the more someone is interested in maintaining it.

If you yourself, the author, aren't using the project in some production environment then you are essentially asking me to take a risk that you've been unwilling to take. I didn't even attempt to use ESLint at Box until it had been in existence and use on my own personal projects for eight months. Even then, I ended up spending a lot of time chasing down bugs and fixing compatibility issues. ESLint got better not just because it was open source, but because I was putting it through a lot in my day-to-day work.

**Takeaway:** You should always be your project's first user. Make sure you've created something that's useful for yourself first, then ask friends to try it out.

## In closing

I think open source is wonderful for many reasons, but not all open source projects are created the same. "Free" isn't the same as "good," and projects that don't measure up (based on the criteria) in this article should be handled with care. As I said in the introduction, the majority of open source projects are crap, so picking out the good ones is a tough job. When you succeed, you're able to accelerate and stabilize your code base; when you fail, you can cause immeasurable harm to that same code base.

This isn't to dissuade anyone from open sourcing their work - please continue to do so. Just realize that there is a significant bar for open source projects that are reliable enough to use in a product. If you want your project to succeed, you should be aiming for that bar. If you're just sharing so your code can live on, be sure to say so in your README. There's plenty of room in the open source ecosystem for both categories of projects, we just really need people to be better about pointing out which is which.

**Update(2015-Dec-15):** Clarified language around GPL and LGPL license. Also added note that "use" means including in your application to further clarify the concerns.



1. [ESLint](https://github.com/eslint/eslint) (github.com)
1. [Copyright is Automatic](http://www.nolo.com/legal-encyclopedia/copyright-automatic.html) (nolo.com)
1. [GPL 2.0](https://opensource.org/licenses/GPL-2.0) (opensource.org)
