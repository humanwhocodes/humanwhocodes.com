---
title: The problem with tech conference talks lately
author: Nicholas C. Zakas
permalink: /blog/2013/10/29/the-problem-with-tech-conference-talks-lately/
categories:
  - Web Development
tags:
  - Conferences
  - Speaking
---
I&#8217;ve spoken at my fair share of conferences over the years, and I used to get very excited about attending them. Lately, though, I&#8217;ve found myself more disappointed in conferences on a more frequent basis. Leaving aside the social aspects that have been increasingly under fire, I&#8217;d like to focus my attention squarely on the very thing that attracts people to conferences in the first place: the talks.

In my opinion, the quality of talks at many conferences has been dropping precipitously. This has little to do with the quality of speakers. There are some fantastic speakers who give incredibly mundane talks. There are some lousy speakers who give talks that are full of high-quality information. There are experienced speakers who end up speaking based on past excellent talks and fail to deliver. There are inexperienced speakers who knock it out of the park on the first try. The speakers aren&#8217;t actually the problem, it&#8217;s the content they produce.

## Balancing conference schedules

Not all conference talks are of the same type. In general, I break down conference talks into several categories:

  * **Instructional** &#8211; teaches a topic
  * **Case Study** &#8211; explains a real-life implementation and its outcome
  * **Inspirational** &#8211; makes you think about something differently
  * **Advertisement** &#8211; introduces a product/library/framework/etc.

My preference is for conferences to be composed primarily of instructional and case study talks, roughly in equal portions (though I would love there to be slightly more case studies). The inspirational talks are usually reserved for opening and closing keynotes. The three other types of talks can form a really nice conference schedule when used appropriately. It&#8217;s the last one, advertisements, that are the problem.

## Advertisement talks

Advertisement talks aren&#8217;t necessarily given by conference sponsors, though that is not uncommon. The purpose of an advertisement talk is to introduce you to a product in which the speaker has a vested interest. That means you could be introducing a new open source project you created, or a company could be introducing a new enterprise-grade storage solution, or an evangelist is going over a company&#8217;s API. All of these fall into the category of advertisement because the value to you is secondary to getting the message out about the product.

Don&#8217;t get me wrong, I don&#8217;t think all advertisement talks are bad and should be eliminated. My problem is that they now seem to represent the overwhelming majority of conference talks. The tech community has somewhat brought this on ourselves with our ravenous appetite for all things new and shiny. We&#8217;ve made celebrities out of John Resig and Jeremy Ashkenas for creating jQuery and Backbone, respectively. These are two very smart guys who have done amazing things for the web development community, and now everyone with an open source project and an idea is shooting for that level of popularity.

I see conference talks filled up with people who are presenting their new &#8220;awesome&#8221; project that will &#8220;totally blow your mind.&#8221; Only problem is that no one is using it yet, or it&#8217;s not even finished, or it&#8217;s version 0.0.1 so it would be foolish for you to even attempt to use it at this point. Here&#8217;s the thing: there is no value to me, as an audience member, if you&#8217;re talking about an unproven tool, framework, or library. I&#8217;m not going to risk my product on your unproven technology, I&#8217;m going to wait for someone else to do it.

Once again, I&#8217;m not proposing that conferences ban all advertisement talks. What I am proposing is that they be severely limited in their number. Keep the sponsored talks that you must, but let&#8217;s put a lid on the number of people talking about fledgling projects without any real world use cases. 

## Case study talks

These types of talks are, by far, the best to have at a conference. A case study talk takes you through an actual real world implementation of something. Case study talks can be a mixture of instructional and advertisement, but the value is that you get actual data and insights. What turns an advertisement talk into a case study talk? Compare:

&#8220;Introducing AbdominalRegion for Backbone.js&#8221;

vs.

&#8220;How we used AbdominalRegion for Backbone.js to decrease page load time by 50%&#8221;

The first talk title is a talk I will likely skip. Why would I care about this new tool you wrote? In the second talk title, I&#8217;m very interested in decreasing page load time for my Backbone.js application, and I&#8217;m very interested in anything that can help me do it. 

Just like that, an advertisement talk that does nothing but promote your own project turns into a useful talk that also happens to talk about your own project. It&#8217;s the real world implications and uses of the project that make it compelling to an audience that is hungry to improve their products. I really don&#8217;t care if you have an MVC framework that you think is better than anything out there; I do care if your MVC framework can solve a problem I&#8217;m actually dealing with.

Most of my talks over the years have been case studies, and I like to think that&#8217;s part of why they&#8217;ve been well-received. I take my experience building large-scale applications (and last year, consulting for large companies) and put that experience into my talks. I want to help people solve problems they&#8217;re actually facing.

Tutorial talks also benefit from a case study treatment. Instead of telling me about how prototypes work in JavaScript, show me how using prototypes will make something I&#8217;m doing easier. Instead of walking through APIs for WebRTC, show me how to embed video chat into my product. All talks are instantly made better by applying the topic to a real-world situation that the audience may be dealing with. 

And don&#8217;t forget to include the downsides in your case studies: the things you messed up, the problems you ran into, and what you learned from the whole process. Everyone improves when we share our experiences honestly.

If I were a conference organizer, I would be sure upwards of 80% of the talks were case studies. These types of talks provide the highest value to the audience and should be the focal point of any good conference.

## A note for new project authors

At this point you may be thinking, &#8220;but if I can&#8217;t submit talks about my awesome project, how will people know how awesome it is?&#8221; The reason jQuery and Backbone.js became popular had nothing to do with John and Jeremy plastering the conference scene with talks. They became popular because they are good tools that helped people solve real problems. The popularity grew organically as more people found them useful. There was no grand marketing campaign.

The best thing you can do for your project is to use it in a real world situation and try it out. You probably started the project to solve some problem &#8211; now use it to see if the problem was solved. Next, show it to a few friends you trust. Ask them to try it out. See if they have any feedback.

For example, I started [ESLint][1] because I needed a JavaScript linter that had pluggable rules. I hacked something together one weekend and then started showing it to a few friends. I&#8217;ve yet to give a talk about it but people are finding it useful and contributing code.

After you get some good feedback, start attending local meetups. Those are good places to share what you&#8217;ve been working on and gather even more feedback from people who are thinking about similar problems. See if you can get a few more people to look at your project and try it out.

Once a few people have been using it and you&#8217;ve been incorporating feedback, you&#8217;ll have a good amount of real-world information about it&#8217;s use and what problems it can solve. At that point, by all means, start going to conferences and sharing what you know.

## It&#8217;s about the content

All conferences begin and end with the content they provide in the form of talks. We need less pure instructional and advertisement talks and more case studies. As you&#8217;re filling out your talk proposals for 2014, think long and hard about what type of talk you&#8217;re proposing. Almost any talk can be augmented with real-world information to make it a case study. We all have interesting work experiences, think about sharing more of those and less about the open source project you&#8217;re hacking on during the weekends. Let&#8217;s flood conferences with so many high quality case studies that there are no &#8220;filler&#8221; talks.

If you&#8217;re a conference organizer, raise your bar in 2014. Limit the number of talks that &#8220;introduce&#8221; a new tool. Encourage those presenters to submit a case study showing how their new tool helped solve an actual problem. Ask those who submit tutorial talks to include a real-world use case or explain how the tips and techniques affect developers every day.

If you&#8217;re a conference attendee, tells the organizers what you want. You don&#8217;t want to be fed talk after talk about weekend side projects. You want quality. You want something that helps you do your job better. You want fewer talks that are thinly veiled advertisements for a company or product. You want quality, useful information.

Together, we can create conferences that aren&#8217;t just great social events, but also great learning events. The technical community has faced such a wide array of challenges and solved problems in interesting ways &#8211; we can all benefit from those experiences if we talk about them. Not all that is shiny is good, sometimes you just need a novel approach to using the tools you&#8217;re familiar with to make a big difference.

Let&#8217;s all agree to make a difference by sharing our experiences.

 [1]: https://github.com/nzakas/eslint
