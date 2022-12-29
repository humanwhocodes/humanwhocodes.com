---
title: "Two approaches to win an argument as a software engineer"
teaser: "Software engineers are identified with strong opinions. Here's how to get your point across effectively."
author: Nicholas C. Zakas
categories:
  - Career
tags:
  - Communication
  - Work
  - Skills
---

If you've spent any time developing software professionally and then you are probably used to the spirited debates that take place between software engineers as well as between software engineers and management, design, and product. Software engineers are not known for being shy about their opinions on any particular subject, and especially when it comes to the company they work for or the software they work on. However, many software engineers are not good at convincing others of their position. The fundamental problem is in the approach.

When trying to convince someone that their position is correct, software engineers tend to default to a data transfer methodology: I have arrived at my position due to the state of data in my brain and so to convince you I will now attempt to transfer that state to your brain. The problem is, not everyone's brain works the same way, so attempting to transfer that state is inefficient and can result in duplicating errors. Unfortunately, there are no checksums to fall back on.

Another approach software engineers try is an approach based on trust. If you trust me, then you should trust that what I say is true and should therefore agree with my recommendation. This approach is actually a power play where you believe that your clout is enough that people should have blind faith in you. This only works some of the time for some people and generally leaves everyone feeling resentful. You don't want to steamroll your team members, you want collaboration. 

So if data transfer and trust won't work, what is left? The simple answer is to create a separate pool of data that exists outside of your brain. This "outside data" needs to be presented in a way that others can understand, so you are meeting together in the middle rather than trying to project your internal state to someone else.

That probably sounds very wordy, so let me break it down to two approaches: *argue with data* and *argue with code*.

## Approach 1: Prove something is *true* with data

If you want to prove that something is *true*, which is to say that the thing you're promoting is both factual and accurate, then the only way to win this argument is to gather data to illustrate the fact. For example, each of these statements may or may not be true on a project:

1. Switching to another framework will improve performance
1. Our algorithm is more error prone than others so we should change it
1. We waste a lot of time on repetitive tasks

Statements like these tend to start out as opinion and often don't go any further, which leads to arguments of opinion. Opinion arguments can't be won because, by definition, an opinion cannot be wrong. The only way to resolve this type of dispute is with data.

First, get specific and define all of your terms. What is it you are actually claiming? Taking the first statement, what does it mean to "improve performance?" Are you talking about reducing page load time? Or maybe reducing CPU utilization on a virtual machine? Or maybe using less memory? Be as specific as possible about what you are proposing as a fact.

Second, ask yourself what kind of data would prove your point? Have other companies published data showing the performance improvement between the framework you're using and the one you're proposing? Again, are you looking for page load time, CPU utilization, memory utilization, or something else? What numbers would make your point?

Third, do you already have the data you need or do you need to collect it? Some companies collect a lot of data about their software and operations; some do not. To get the data you need, you may need to add some instrumentation, or dive into your analytics system, or find tech talks or research papers. You need to find a source of data that is separate from you to make your point.

Keep in mind that data can be quantitative (measured values) or qualitative (opinions). While quantitative data is always preferable, it's not always possible. In those moments, qualitative data can still win the argument. If you're trying to prove that the team is wasting a lot of time on repetitive tasks, your best bet may be to have everyone on the team fill out a survey asking questions about the tasks they're doing and if they are frustrated by them.

Last, present the data in a format that anyone can understand. Oftentimes, putting together a simple slide deck is still the easiest way to convince others (especially in management) that something is true. Just make sure you give people the time and space to consume the data you've presented before pushing for a decision.

The most important thing about this approach is that you are gathering data that exists outside of your brain and can easily be shared with others. 

## Approach 2: Prove something is *possible* with code

If you want to prove that something is *possible*, then the only way to win this argument is with code. It always surprises me when I find two software engineers arguing with each other over whether something is possible when it might take an hour to write some code and settle the issue permanently. It doesn't make sense to argue over something that can be proven, beyond all doubt, by writing code. Here are some example statements that can probably be proved with code:

1. We can make the list scroll infinitely
1. It's possible to write a complex query with one request
1. Switching to another framework will improve performance

Back when I was a young web developer, when people proposed an infinitely-scrolling list I thought they were crazy. It would never be smooth, it would never be fast enough, it would crash the browser due to memory limits. But then I saw the first demo of an infinitely-scrolling list that was smooth and didn't crash the browser, and that was it. No more argument from my side. Just because I couldn't figure out how to do it didn't mean it wasn't possible. If you're in a position where you are arguing something is possible, go ahead and create it (or a reasonable prototype); if you are unwilling or unable to write the code, then it's time to drop the argument.

One last point: that last statement looks familiar, doesn't it? Yes, sometimes the same statement needs both data and code to win the argument. In this case, you might need to gather data to prove that performance is a problem and then also write some code to show that switching to the new framework will improve those numbers. You are actually trying to prove two things: 1) the performance is a problem and 2) switching to the new framework addresses the problem. The combination approach works exceedingly well in software engineering because so much of the work is about making changes and measuring the effect of those changes.

## Conclusion

Arguing your point is an expected part of being a software engineer. It is fine to have opinions about everything, but if you are attempting to convince someone that your position is correct in order to make some change, then you owe it to them and to yourself to make sure you are correct. You shouldn't expect people to blindly follow your opinions; you should expect to need to produce data, code, or some combination of the two to convince others. The willingness to do the research, data crunch, write code, or otherwise dig into the problem is what will ultimately convince others of your position.

No matter what kind of work-related argument you are trying to win, remember to argue with data and argue with code.
