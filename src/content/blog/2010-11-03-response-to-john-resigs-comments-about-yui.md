---
title: "Response to John Resig's comments about YUI"
author: Nicholas C. Zakas
permalink: /blog/2010/11/03/response-to-john-resigs-comments-about-yui/
categories:
  - Rants
tags:
  - jQuery
  - Yahoo
  - YUI
---
Earlier today, someone posted the following question on [Quora][1]: [How could YUI improve its image compared to jQuery, MooTools, etc.?][2] It's an interesting question that got some interesting responses. The most [interesting response][3], as many now have seen, came from jQuery creator John Resig. He wrote a very thoughtful piece that gives some great insights into how jQuery created such a large and vibrant community. However, there were a few points that are factually wrong and others on which I strenuously disagree.

Before diving into this topic, I want to be upfront: I work for Yahoo! and I'm a YUI contributor though not a core team member. Therefore, my opinion here does not represent the opinion of Yahoo! or YUI; this is simply my points of view on John's feedback. I should also mention that I have a lot of respect for John, the jQuery core team, and the entire jQuery community, so please don't take any of my comments to mean anything different.

First, I completely agree that the documentation fragmentation is a problem. More than one person has been confused about whether to go to the [Yahoo! Developer Network][4] or [YUILibrary.com][5], that's a definite problem that needs addressing. John also has a great suggestion on narrowing the focus of the YUI landing page to sell using the library over other messaging. Excellent idea.

John's next section goes into ways that YUI can compete directly against jQuery. I've been [saying][6] for a while that I don't see these two as competitors. Making YUI more like jQuery isn't something I want in any way. Both libraries have their strengths and the overlap is minimal. jQuery is great for smaller sites and it's easy for anyone to pick and use, which is why there is such a strong designer community&#8230;but I wouldn't want to use it to create the Yahoo! homepage. For scalable web applications, YUI really excels. I don't believe you can serve both audiences effectively with the same product, and since jQuery does such a fantastic job at its focus, I would much rather have YUI focused on the web application problem.

My main disagreement with John's post is around this statement:

> The YUI project has always had the advantage of having a large number of paid, full-time, contributors to the project. As far as I can tell it's always had more paid, full-time, contributors than any other JavaScript library. This is awesome and it's benefited the library as a whole. However it can also be crippling. Yahoo completely controls the direction and destiny of YUI. This should not be the case &#8211; YUI should be split off from Yahoo and become its own, separate, Open Source project.

This is a sentiment I've heard from time to time while giving talks, and it's something that I don't understand and seriously disagree with. There seems to be a notion amongst the open source community that nothing can truly be &#8220;open source&#8221; unless it is purely autonomous and not tied to any particular company. This is a conversation I had with someone after one of my talks about YUI:

**Him:** You know, I really like YUI and want to use it, but it's the &#8220;Y&#8221; in YUI that makes me uncomfortable.  
**Me:** What makes you more uncomfortable, is it that there are people paid full time to develop and support it or that it's been battle tested on some of the world's most highly-trafficked web sites?

To me, *what makes YUI valuable has been and will continue to be the affiliation with Yahoo!*. It's through the experience of working with teams within Yahoo! that the YUI library has grown into the rock-solid product that it is today. I say this having worked closely with the YUI team during the early days of YUI 3 as we used the [new Yahoo! homepage as a testing ground][7]. How many other libraries can say that they were testing on a top-5 web site? And how many can say that they are constantly getting feedback from some of the world's most popular web destinations that handle millions upon millions of requests per day?

Removing YUI from Yahoo! cuts off the library's main strategic advantage. When working on top-secret projects, it's impossible to involve a public community in that process. At Yahoo!, we can get in touch with the YUI team, explain what we're doing and the help we need, work to come up with solutions to these problems, and then *all YUI users benefit from that interaction*. All of the hard work of Yahoo! engineers gets poured back into YUI as a whole.

As for the belief that Yahoo! controlling the library's destiny is a bad thing, I can't disagree more. Once again, this is what makes YUI valuable. Every open source project has a core team whose job is to maintain the original vision of the project as well as guide its development and roadmap. The fact that the YUI core team is paid by Yahoo! doesn't change the basic structure of any project. You can only look to the next city over and the Mozilla Foundation as a great example of a similar system. The core Mozilla team decides how Firefox evolves, and the fact that Mozilla writes their paychecks doesn't mean that an inferior product is being created. There's a reason that Firefox is the #2 browser, and that's because of dedicated individuals who are passionate about their work and who want to create the best possible product. When the product is your full time job, it's much easier to do. Believing that a community can't form around an open source library that's funded by a large company is silly; communities are formed through outreach, communication, and collaboration, not by non-profit status.

The YUI team worked very hard to develop a third-party contribution model. Yes, it's had some growing pains, but the results have been fantastic thusfar. Certainly, YUI hasn't had anywhere near the number of outside contributions as jQuery, but YUI is trying. Matt Snider, formerly of Mint.com, [has a full-fledged component shipping as part of YUI 2][8], a component on which he gave a talk at last year's YUIConf. To me, that's a great thing. It's a sign to others that if you're willing to approach the YUI team with an idea, you absolutely can get support and get your component into the library. Matt put a lot of work into that component, and hopefully YUI can find more people like him who are willing to take the time to collaborate and make meaningful contributions to the library. Also, the [YUI Gallery][9] is quite possibly the most awesomest thing I've seen: a way for everyone to easily publish their YUI additions into a listing *and* have those made available on Yahoo!'s content delivery network. Right now there are 227 gallery modules, all benefiting from Yahoo!'s edge.

Can the YUI team improve it's community outreach and contribution model? Absolutely. Does YUI have to split from Yahoo! to do that? No. YUI 3 is a great product, supported by great people and a growing community. If the team can be accused of anything, it's ignoring marketing and public relations in favor of developing new features. That's an area in which jQuery excels, and there's a lot that the team can learn.

YUI is not jQuery, and I think trying to be like jQuery would be a mistake. Does that mean YUI can't learn from jQuery? Absolutely not. The jQuery community is absolutely amazing and there isn't an open source project in the world that wouldn't love to have the same type of community. YUI doesn't have to become jQuery for that to happen, nor does it have to cut ties with Yahoo! to that end. jQuery is but one example of how to build a community, and as I'm rather famous for saying to my colleagues, there's always more than one solution to a problem &#8211; it's choosing the right solution that's the real challenge. I believe that following jQuery step-by-step would be a mistake for YUI because the two libraries have different origins, different strengths, and different target audiences. YUI needs to find its own way, one that embraces the company from which its insights and experience are gathered. And I believe YUI can do this.

 [1]: http://www.quora.com
 [2]: http://www.quora.com/How-could-YUI3-improve-its-image-compared-to-jQuery-MooTools-etc/
 [3]: http://www.quora.com/How-could-YUI3-improve-its-image-compared-to-jQuery-MooTools-etc/answer/John-Resig?srid=5i2
 [4]: http://developer.yahoo.com/yui/
 [5]: http://yuilibrary.com
 [6]: http://twitter.com/slicknet/status/29582065891
 [7]: http://yuiblog.com/blog/2008/11/11/frontpage-and-yui3/
 [8]: http://www.yuiblog.com/blog/2009/11/05/video-snider-yuiconf2009/
 [9]: http://yuilibrary.com/gallery/
