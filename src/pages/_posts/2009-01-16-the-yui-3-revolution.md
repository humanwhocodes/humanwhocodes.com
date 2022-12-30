---
title: The YUI 3 revolution
author: Nicholas C. Zakas
permalink: /blog/2009/01/16/the-yui-3-revolution/
categories:
  - Web Development
tags:
  - JavaScript
  - YUI
---
In the world of software engineering, the emphasis is typically on evolution. You build a good small thing and layer more functionality on top, slowly evolving the framework into something bigger and better than it was originally. This takes a lot of upfront planning, to make sure that the framework has enough hooks to allow easy extension. That's how most JavaScript libraries began as well, and [YUI][1] is no different.

Now that [YUI 3][2] has been previewed, there's been a lot of discussion around the direction of the library. I'm an adjunct member of the team, but certainly not responsible for the direction of YUI as a whole; there are some very capable engineers already in that slot. When I first heard about the YUI 3 approach, I was at once excited and scared. Excited because I saw the possibilities that the new library had baked-in, but scared that I'd not get to use it because the upgrade path was non-linear.

The new Yahoo! homepage adopted YUI 3 as its core library (and I [wrote about it][3]) last year. Over the course of developing the page, we went through a lot of trials and tribulations, from a lack of documentation to learning new paradigms. These were not unexpected as we were adopting a pre-release version of YUI 3 that wasn't really intended for production use. Once we got past the initial wave of development, however, our engineers really started to enjoy using YUI 3. We found it to be more expressive, succinct, and easier to use than the 2.x version of the library.

I've heard some people complain that YUI 3 is too different from YUI 2, and that making such a different library is a mistake. I actually believe that this was exactly the right move at exactly the right time and give the YUI team a lot of credit for having the guts to do it. In a world where evolutionary programming is the preferred approach, YUI decided for a revolutionary approach.

Web development has grown by leaps and bounds in the past four years. The discipline had really stagnated before the term &#8220;Ajax&#8221; got everyone excited about web development again. In that time, the needs of developers have changed and grown. New best practices have emerged and preferred development patterns have been formalized and documented. We've all learned a lot about what works and what doesn't, which makes this the perfect time to revisit JavaScript libraries.

As with other libraries, YUI started out based on web developer needs. The needs have changed, so why shouldn't the library? Why wouldn't you look back at the past four years, see all the mistakes and lessons learned , and make a library that addresses it all? That's precisely what the YUI team did. They looked at all the things YUI 2 couldn't do and all the things they wanted the next version to be capable of. The result is something that takes the best parts of YUI 2, plus some helpful tactics like method chaining (a la jQuery), and adds in some great forward-thinking ideas to create a new library that still feels very much like YUI.

Is there some pain involved in upgrading to YUI 3? Yes. But major steps forward typically involve some pain; revolution is never easy. The question isn't about the pain involved, it's about the utility you get in return for the pain and if that's worth it. Only you can answer that question for your web application. It's the same process if you're going to change from one JavaScript library to another.

The YUI team's decision was a tough one, but again, one that I whole-heartedly support. Evolution is much less painful, but it typically ends up with bloat. It's the responsibility of framework developers to honor past APIs, so a wrong choice in method naming, argument order, or data structure becomes written in stone (see [Crockford's latest post][4] for more). You cannot undo a bad decision in an API that's already been deployed, you can only add new functionality that (you hope) will one day get used more than the old functionality. In the end, you the library ends up with vestigial functionality that can't be removed. By adopting a revolutionary approach, YUI is able to change everything, rebuild from the ground up without any expectation of old functionality being in the place that it was or working in the same way. It's a clean slate where the team can design the solutions of the future without needing to worry about breaking the mistakes of the past.

And keep in mind, if you're using YUI 2, you can go right on using it; no one is going to take away your YUI 2. It will continue to live on and be available at [GitHub][5] for you to download, use, and even submit changes to. There's still a large community of experts on YUI 2, its implementation, and extension; that won't go away either. No one is forcing you to upgrade to YUI 3, but if you do, I think you'll be pleasantly surprised.

 [1]: http://developer.yahoo.com/yui
 [2]: http://developer.yahoo.com/yui/3/
 [3]: http://yuiblog.com/blog/2008/11/11/frontpage-and-yui3/ "The New Yahoo! Front Page and YUI 3"
 [4]: http://blog.360.yahoo.com/blog-TBPekxc1dLNy5DOloPfzVvFIVOWMB0li?p=954 "Dare to compare"
 [5]: http://github.com/yui/
