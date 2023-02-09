---
title: Is the web platform getting too big?
date: 2015-09-08 00:49:57
categories:
- Professional
tags:
- Web
- Internet
- API
- Platform
---

Peter-Paul Koch recently wrote a blog post entitled, "Stop pushing the web forward" [1], in which he argued for a one-year moratorium on adding new features to the web platform. By new features, he means new APIs and capabilities in HTML, CSS, and JavaScript, arguing:

> We're pushing the web forward to emulate native more and more, but we can't out-native native. We are weighed down by the millstone of an ever-expanding set of tools that polyfill everything we don't understand - and that's most of a browser's features nowadays. This is not the future that I want to push the web forward to.

The one-year moratorium, he argued, would give us all time to catch up on all the new features that have already been added. This, he continued, is really important because the pace at which new features are added is difficult for developers to deal with.

A lot of the responses to his post were disappointingly dismissive to the point of being rude (he was frequently publicly called a "grumpy old man" to rationalize his perceives wrongness), and I thought that was a shame because I think PPK hit on an issue that we're all facing: innovation fatigue.

## Innovation fatigue

When I speak with more junior engineers, one of the most frequent questions I am asked looks like this:

> How do you keep up with everything? Things are changing so fast, I feel like I'm always missing something, and then I get frustrated and think I should quit because everyone else seems to be on top of all the new stuff.

My response is usually something along the lines of this:

> I don't. It's impossible to keep up with everything new that's coming out. Your goal should be only to be aware of things at a high-level until you need them. Skim over headlines or links shared by people on Twitter so you're aware of what's going on, but don't waste time trying to master everything. Wait until you need it.

Truth be told, I hate giving this advice. I remember a time when I felt like I knew everything about every browser (there were only two!). My first book, *Professional JavaScript* [2], I intended to contain everything you'd need to know about JavaScript and browser-based APIs. For the most part, I succeeded...until the third edition. That's when I realized that there was no way I could include everything anymore. And that made me sad.

So I think PPK was also channeling a bit of this sentiment in his post. As someone who spent an enormous amount of his personal time testing and documenting browser features and bugs, he must share my frustrations that the web isn't completely knowable by one person anymore. In fact, he said as much in his followup post [3]:

> ...part of my resistance to this idea is that I remember the old days when I could actually enumerate the features of each of the three browsers. (OLD days, I said.)

I'll admit it was nice to know everything for a while, though we were probably all too naive to realize that this wasn't a sustainable model. All occupations have an associated body of knowledge that practitioners dip into when they need to complete certain tasks. Visit any lawyer's or accountant's office and you'll find shelves filled with books that they use for reference. In the tech world, talk to any Java developer about how to deal with an exploding number of options for completing the same task, and you'll see that web developers have had it easy for a long time.

## A moratorium?

I'm willing to bet that PPK didn't think his blog post would result in an actual moratorium, but it is worth looking at what happened during the forced moratorium that occurred when Internet Explorer 6 ruled the web. Once IE6 had effectively crushed Netscape, the Internet Explorer team was disbanded. Microsoft had won the web and there was no more work to do. At that point in time, IE6 was all the web there was and that meant no more new features.

The period of 2001-2006, five years of stagnation, actually turned out to be a good thing. As Douglas Crockford has mentioned in several of his talks, the stagnation gave developers some time to catch up to what already existed. To that point, the innovation had been rapid and the incompatible changes in Internet Explorer and Netscape meant you always had to learn two different ways of doing the same thing. It was exhausting and frustrating to make pages and applications that worked across both browsers because there just wasn't enough information about what to use in which situations. When all of a sudden there were no more features being added, we all could take a breather.

You'll note that the first edition of *Professional JavaScript* came out in 2005, towards the end of the stagnation period. I spent most of 2003 and 2004 writing that book, and felt like it encapsulated every important piece of JavaScript information that existed in the world. I wasn't alone, either, as blogs began to pop up and people started publishing their experiments with JavaScript and their understanding of how it worked.

That stagnation period is what gave Mozilla time to catch up with Firefox, it's what led to the Ajax revolution, and it's what ultimately unseated Microsoft as king of the web. So it's not a big jump to say that stagnation alone isn't a bad thing for the web. Maybe this stagnation period was an exception, but we can't know that for sure.

## Is the web losing?

So what if we started a moratorium now? The main opponents to PPK's suggestion predict dire consequences in the form of lament that is now all too familiar to me: if we stop innovating, the web will lose. I've heard this refrain in many different forms over the years, "we need the web to win" or "we don't want the web to lose." What game are we playing? Who are the opponents? What are we doing that they aren't doing?

When you ask these questions enough, inevitably someone answers: native will destroy the web if we stop innovating. Now, I have no data suggesting that this isn't true, but I also have no data suggesting that it is. I'm also not convinced that this is really a native vs. web battle where there can only be one winner. However, if you hold this position, then I can understand why you'd fear a moratorium: stopping means falling behind while the opponent continues to innovate.

I'm not sure if such battle is ongoing, or if some are imagining a foe and a battle in order to push for new features. To me, the thought that native will overtake the web seems like a theoretical impossibility, especially as we see more native capabilities that are mirroring what's found in the web (i.e., React Native) and how hybrid mobile apps don't seem to be going away anytime soon.

Is native doing some cool stuff that would be great to have in web applications? Absolutely. But I hardly see this as a one-way street. More and more, it seems like native is trying to emulate the web development experience because it's faster, there's a built-in set of people with HTML, CSS, and JavaScript knowledge, and there are some great tools.

So, I'm not convinced the web is losing to anything, and I'm not convinced that between native and the web that there can be only one. I harken back to what Steve Jobs said when he returned to Apple in 1997:

> If we want to move forward and see Apple healthy and prospering again, we have to let go of this notion that for Apple to win, Microsoft has to lose.

I feel the same about the web and native.

(If you have any research related to this topic, please post a link in the comments. I haven't been able to find any numbers to back up either that there's a war between the web and native or that one or the other is winning.)

## Conclusion

I really appreciated PPK's willingness to stick his neck out and say something controversial to get people thinking and talking. In my heart, I'd love to see a moratorium, but that's mostly a selfish desire to stop trying to keep up with every new thing as it comes out. That's a path I've paved for myself and asking the world to change so I can stop walking that path isn't rational or realistic. Yet, I understand where PPK is coming from, as it's a sentiment that many developers share.

The rapid pace of web platform development is dizzying and it can, at times, be overwhelming. Imagine just starting out in the industry and discovering that you can never get ahead of the learning. Every six weeks (when new browsers are released), we need to augment how we do our work in some way. That's a pretty crazy roller coaster that I'm sure we'd all like a break from.

Yet at the same time, the innovation that we're experiencing means that solutions to our complex problems are more close than they are far away. We no longer have to go through years of experimentation, trying to find ways to work around the limitations of the browser. In some cases, if we can just wait a few months, the solution will be there.

In the meantime, I'll echo a point PPK made in his second article: what we really need is a single source of truth for the ongoing development of the web platform. I had hoped that webplatform.org [4] would fill this role, but it's not even close. What we really need is a home for the status of all web platform features, including standards work, browser implementations, and progress. If we could achieve this as a community, we could help the next generation of web developers tremendously. Instead of going to Edge's status page, Chrome's status page, searching GitHub, etc., we could go to one place and get all the information we need. That is a future worth fighting for.


1. [Stop pushing the web forward](http://www.quirksmode.org/blog/archives/2015/07/stop_pushing_th.html) by Peter-Paul Koch (quirksmode.org)
1. [Professional JavaScript for Web Developers](http://www.amazon.com/Professional-JavaScript-Developers-Nicholas-Zakas/dp/1118026691/ref=sr_1_13?tag=nczonline-20) by me (amazon.com)
1. [Stop pushing redux](http://www.quirksmode.org/blog/archives/2015/08/stop_pushing_re.html) by Peter-Paul Koch (quirksmode.org)
1. [WebPlatform.org](https://www.webplatform.org/)
