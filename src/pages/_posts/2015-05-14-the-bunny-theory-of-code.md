---
title: The bunny theory of code
author: Nicholas C. Zakas
permalink: /blog/2015/05/14/the-bunny-theory-of-code/
categories:
  - Software Development
tags:
  - Software Engineering
  - Source Code
  - Source Control
---
Anyone who&#8217;s ever worked with me knows that I place a very high value on what ends up checked-in to a source code repository. The reason for this is very simple: once code gets checked-in, it takes on a life of its own. Checking in is akin to sharing your code with others, and once out in the world, it&#8217;s hard to predict what that code will do. Hard, but not impossible, as there is one thing I can virtually guarantee will happen.

For years, I&#8217;ve shared with friends and clients what I call the bunny theory of code. The theory is that code multiplies when you&#8217;re not looking, not unlike bunnies that tend to multiply when you&#8217;re not looking. This isn&#8217;t to say that multiplying code is good or bad &#8211; it&#8217;s a characteristic of all code regardless of quality. What makes it good or bad is the quality of the code being multiplied.

The reason the bunny theory of code has held up is because of the way software engineers work. We rarely, if ever, start with a completely blank file and start writing code. More often that not we start by copying an existing file and then modifying it to get our result. Once again, this isn&#8217;t good or bad, it&#8217;s just the most efficient way to create something that is similar to something else. 

And where do you look for existing files to copy? In the same source code repository. The false promise of your source code repository is that everything it contains is &#8220;good.&#8221; To complete your task, just find something that does something similar, copy, modify, and you&#8217;re done. Looking inside the same repository seems like a safety mechanism for quality but, in fact, there is no such guarantee.

When you check in a file it&#8217;s not long before another similar file appears. Once there are two examples of the same thing, the chances increase that a third will be introduced. Once a third appears, the code has established a base in your repository and is now considered an approved pattern. After all, if we&#8217;re doing the same thing in a bunch of places, it must be the correct way to do things&#8230;right?

Back in 2005, I found some code at work that seemed to fit my task. As I highlighted the code to copy into my own file, I noticed I had skipped the long comment in front of it. While I can&#8217;t remember the exact wording, the comment basically said this:

> Do not copy this code! I couldn&#8217;t figure out any other way to do this, and we are only doing it in one place, so this seems okay. If you think you need to do this somewhere else, then you should figure out the right way to do it. You should under no circumstances copy this code to somewhere else.

I laughed&#8230;then panicked. You mean I have to figure out how to do this exact thing in some other way? That seems unfair. The original engineer knew that they hadn&#8217;t properly solved the problem and left it as a landmine for someone else. It just so happened that I stepped on it and now couldn&#8217;t remove my foot until it was properly disarmed.

This is the problem when bad code gets into source control: it increases the likelihood that someone will find it and copy it. Once it&#8217;s been copied one time, that increases the likelihood it will be copied again, and so on. Before you know it, the bad code has infiltrated all parts of the repository and is hard to extract.

The problem grows as the number of people committing code to the same repository grows. When you have a team of a significant size, managing what ends up in source control becomes incredibly important because it will multiply quickly. As such, you want to make sure the code that gets checked in is as high quality as possible and represents what you want others to do.

To keep a sane codebase, your focus should first be on how to prevent that first piece of bad code from getting into source control. Enforcing or disallowing patterns through automation is important to that end. The more you can automate and physically block code from entering the repository, the safer everyone will be. Of course, there are some patterns that are hard to block, especially if they&#8217;ve never been encountered before. That&#8217;s where code reviews come in. There&#8217;s no better detector of the strange than the human eye.

Of course, some patterns aren&#8217;t demonstrably &#8220;bad,&#8221; they are just not what you want everyone doing. Consider the case of a third-party library like jQuery. Suppose you don&#8217;t want team members using jQuery because you have established patterns to accomplish the same tasks that jQuery can do. At some point, someone decides that using jQuery would be better and so adds it in. This might be hard to detect automatically, however, a human code review would catch this easily. This is the critical point: if jQuery makes it into the repository, it&#8217;s a virtual certainty that others will start using it, too. At that point, you&#8217;ll need to either work to pull it back out or accept it and let others use it, too. In either case, you&#8217;re doing work that you didn&#8217;t plan on and that&#8217;s almost always a bad thing, especially on a large team. Introducing a new library means needing to learn all about its quirks, its bugs, its best practices, and there&#8217;s not always time to do that.

In my current role at Box, I&#8217;m famous for repeating the phrase, &#8220;no accidental standards.&#8221; We don&#8217;t accept that things are &#8220;the way&#8221; just because they pop up in a couple of places. When we see this happening, we stop, discuss it, and either codify it as &#8220;the way&#8221; or disallow it. We then update code appropriately before it gets too far. Through automation, code reviews, and code workshops[1], we are able to keep an eye on the code and make sure we&#8217;re all on the same page. 

While it may seem like a lot of work to manage a source code repository in this way, it&#8217;s actually more work to not manage it. Letting code grow unencumbered by human intervention is a great way to end up with a big mess. Engineers try to do the right thing, and they do that by copying what&#8217;s already in source control. It&#8217;s completely natural and expected to do that. That&#8217;s why you want to ensure that the code being copied represents what you want them to do and you&#8217;re prepared for more copies of that code to appear.

Just like bunnies, if you&#8217;re prepared for the multiplication, there&#8217;s not a big problem. It&#8217;s when multiplication happens without anyone noticing that trouble begins. 

## References

  1. [Effective learning through code workshops][1] by me (Box Tech Blog)

 [1]: https://www.box.com/blog/effective-learning-through-code-workshops/
